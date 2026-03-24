#!/usr/bin/env python3
"""
Generate missing Kokoro lesson audio and upload it to Supabase Storage.

Usage:
  scripts/.venv/bin/python3 scripts/generate_course_audio.py
  scripts/.venv/bin/python3 scripts/generate_course_audio.py --dry-run
  scripts/.venv/bin/python3 scripts/generate_course_audio.py --lesson u1-l1

Required env for upload:
  SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY

Optional env:
  SUPABASE_TTS_BUCKET=tts-audio

Local env files loaded automatically if present:
  .env.local
  .env
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline

LANG_CODE = "j"
SAMPLE_RATE = 24000
DEFAULT_VOICE = "jf_alpha"
REPO_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = REPO_ROOT / "public" / "audio" / "manifest.json"


def load_dotenv_file(file_path: Path) -> None:
    if not file_path.exists():
        return

    for raw_line in file_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()

        if value.startswith(("\"", "'")) and value.endswith(("\"", "'")) and len(value) >= 2:
            value = value[1:-1]

        os.environ.setdefault(key, value)


def load_local_env() -> None:
    load_dotenv_file(REPO_ROOT / ".env.local")
    load_dotenv_file(REPO_ROOT / ".env")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--lesson", action="append", dest="lessons")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--bucket", default=os.environ.get("SUPABASE_TTS_BUCKET", "tts-audio"))
    return parser.parse_args()


def run_manifest_builder(voice: str, bucket: str) -> None:
    cmd = [
        "node",
        "--experimental-strip-types",
        str(REPO_ROOT / "scripts" / "build-audio-manifest.ts"),
        f"--voice={voice}",
        f"--bucket={bucket}",
    ]
    subprocess.run(cmd, cwd=REPO_ROOT, check=True)


def load_manifest() -> dict:
    with MANIFEST_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_manifest(manifest: dict) -> None:
    MANIFEST_PATH.write_text(f"{json.dumps(manifest, indent=2, ensure_ascii=False)}\n", encoding="utf-8")


def upload_file(file_path: Path, bucket: str, storage_path: str) -> None:
    supabase_url = os.environ.get("SUPABASE_URL")
    service_role_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
      raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for upload")

    with file_path.open("rb") as handle:
        payload = handle.read()

    request = urllib.request.Request(
        url=f"{supabase_url.rstrip('/')}/storage/v1/object/{bucket}/{storage_path}",
        data=payload,
        method="POST",
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
            "Content-Type": "audio/wav",
            "x-upsert": "true",
        },
    )

    try:
        with urllib.request.urlopen(request) as response:
            response.read()
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Upload failed for {storage_path}: {exc.code} {body}") from exc


def generate_audio_file(pipeline: KPipeline, text: str, voice: str, output_path: Path) -> str:
    generator = pipeline(text, voice=voice)
    chunks = [audio for _, _, audio in generator]
    if not chunks:
        raise RuntimeError(f"No audio produced for text: {text}")

    full_audio = np.concatenate(chunks) if len(chunks) > 1 else chunks[0]
    sf.write(str(output_path), full_audio, SAMPLE_RATE)

    digest = hashlib.sha1(output_path.read_bytes()).hexdigest()
    return digest


def collect_target_clip_ids(manifest: dict, lessons: list[str] | None) -> list[str]:
    if not lessons:
        return sorted(manifest["clips"].keys())

    target_ids: set[str] = set()
    unknown_lessons: list[str] = []
    for lesson_id in lessons:
        lesson_clip_ids = manifest["lessons"].get(lesson_id)
        if lesson_clip_ids is None:
            unknown_lessons.append(lesson_id)
            continue
        target_ids.update(lesson_clip_ids)

    if unknown_lessons:
        known = ", ".join(sorted(manifest["lessons"].keys())[:5])
        raise RuntimeError(
            f"Unknown lesson id(s): {', '.join(unknown_lessons)}. Example ids: {known}"
        )

    return sorted(target_ids)


def main() -> int:
    load_local_env()
    args = parse_args()
    run_manifest_builder(args.voice, args.bucket)
    manifest = load_manifest()
    target_clip_ids = collect_target_clip_ids(manifest, args.lessons)

    pending_ids = [
        clip_id
        for clip_id in target_clip_ids
        if args.force or args.voice not in manifest["clips"][clip_id].get("variants", {})
    ]

    print(f"Voice: {args.voice}")
    print(f"Target clips: {len(target_clip_ids)}")
    print(f"Pending clips: {len(pending_ids)}")

    if args.dry_run:
        for clip_id in pending_ids:
            print(f"  MISSING {clip_id} {manifest['clips'][clip_id]['text']}")
        return 0

    if not pending_ids:
        print("Nothing to generate.")
        return 0

    print("Loading Kokoro pipeline...")
    t0 = time.perf_counter()
    pipeline = KPipeline(lang_code=LANG_CODE)
    print(f"Pipeline loaded in {time.perf_counter() - t0:.2f}s")

    with tempfile.TemporaryDirectory(prefix="moshimoshi-tts-") as temp_dir:
        temp_root = Path(temp_dir)

        for index, clip_id in enumerate(pending_ids, start=1):
            clip = manifest["clips"][clip_id]
            text = clip["text"]
            local_path = temp_root / f"{clip_id}.wav"
            storage_path = f"{args.voice}/{clip_id}.wav"

            print(f"[{index}/{len(pending_ids)}] {text}")
            started = time.perf_counter()
            checksum = generate_audio_file(pipeline, text, args.voice, local_path)
            upload_file(local_path, args.bucket, storage_path)

            clip.setdefault("variants", {})
            clip["variants"][args.voice] = {
                "path": storage_path,
                "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "uploadedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "checksumSha1": checksum,
            }
            save_manifest(manifest)

            elapsed = time.perf_counter() - started
            print(f"    uploaded in {elapsed:.2f}s -> {storage_path}")

    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
