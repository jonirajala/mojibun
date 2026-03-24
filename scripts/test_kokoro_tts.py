#!/usr/bin/env python3
"""
Test script for Kokoro TTS with Japanese text-to-speech.
Tests ALL available Japanese voices with all phrases.

Installation (run these before executing the script):
    pip install kokoro>=0.9.4 soundfile numpy
    pip install "misaki[ja]"

System dependency:
    macOS:   brew install espeak-ng
"""

import os
import time
import numpy as np
import soundfile as sf
from kokoro import KPipeline

LANG_CODE = "j"
SAMPLE_RATE = 24000
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio_test")

VOICES = [
    "jf_alpha",
    "jf_gongitsune",
    "jf_nezumi",
    "jf_tebukuro",
    "jm_kumo",
]

PHRASES = [
    ("こんにちは", "hello"),
    ("おはようございます", "good_morning"),
    ("さようなら", "goodbye"),
    ("ありがとうございます", "thank_you"),
    ("すみません", "excuse_me"),
    ("わたしはがくせいです", "i_am_a_student"),
    ("にほんからきました", "i_came_from_japan"),
    ("これはほんです", "this_is_a_book"),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Loading Kokoro pipeline...")
    t0 = time.perf_counter()
    pipeline = KPipeline(lang_code=LANG_CODE)
    print(f"Pipeline loaded in {time.perf_counter() - t0:.2f}s")
    print("=" * 60)

    for voice in VOICES:
        voice_dir = os.path.join(OUTPUT_DIR, voice)
        os.makedirs(voice_dir, exist_ok=True)
        print(f"\n{'='*60}")
        print(f"VOICE: {voice}")
        print(f"{'='*60}")

        voice_start = time.perf_counter()

        for japanese_text, label in PHRASES:
            print(f"\n  {japanese_text} ({label})")
            start = time.perf_counter()

            try:
                generator = pipeline(japanese_text, voice=voice)
                audio_chunks = []
                for graphemes, phonemes, audio in generator:
                    audio_chunks.append(audio)

                if not audio_chunks:
                    print(f"    WARNING: No audio generated")
                    continue

                full_audio = np.concatenate(audio_chunks) if len(audio_chunks) > 1 else audio_chunks[0]
                filepath = os.path.join(voice_dir, f"{label}.wav")
                sf.write(filepath, full_audio, SAMPLE_RATE)

                elapsed = time.perf_counter() - start
                duration = len(full_audio) / SAMPLE_RATE
                print(f"    Duration: {duration:.2f}s | Generated in: {elapsed:.2f}s | {filepath}")

            except Exception as e:
                print(f"    ERROR: {e}")

        voice_elapsed = time.perf_counter() - voice_start
        print(f"\n  Voice {voice} total: {voice_elapsed:.2f}s")

    print(f"\n{'='*60}")
    print(f"Done! Files in: {OUTPUT_DIR}")
    print(f"Voices tested: {', '.join(VOICES)}")
    print(f"\nListen and compare the voices to pick the best one!")


if __name__ == "__main__":
    main()
