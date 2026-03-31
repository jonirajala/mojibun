import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllLessons, milestones } from '../src/data/course.ts';
import { collectLessonSpeechTexts, collectMilestoneSpeechTexts, normalizeTtsText } from '../src/lib/ttsText.ts';

interface ClipVariant {
  path: string;
  generatedAt?: string;
  uploadedAt?: string;
  checksumSha1?: string;
}

interface AudioClip {
  id: string;
  text: string;
  lessons: string[];
  orphaned?: boolean;
  variants?: Record<string, ClipVariant>;
}

interface AudioManifest {
  schemaVersion: number;
  updatedAt: string;
  defaultVoice: string;
  storageBucket: string;
  lessons: Record<string, string[]>;
  textIndex: Record<string, string>;
  clips: Record<string, AudioClip>;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'public', 'audio', 'manifest.json');

function getArg(flag: string, fallback: string): string {
  const value = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  return value ? value.slice(flag.length + 1) : fallback;
}

function createClipId(text: string): string {
  return createHash('sha1').update(text).digest('hex').slice(0, 16);
}

async function readExistingManifest(): Promise<AudioManifest | null> {
  try {
    const raw = await readFile(manifestPath, 'utf8');
    return JSON.parse(raw) as AudioManifest;
  } catch {
    return null;
  }
}

async function main() {
  const voice = getArg('--voice', 'jf_alpha');
  const bucket = getArg('--bucket', process.env.SUPABASE_TTS_BUCKET ?? 'tts-audio');
  const existing = await readExistingManifest();
  const nextClips: Record<string, AudioClip> = { ...(existing?.clips ?? {}) };
  const nextLessons: Record<string, string[]> = {};
  const nextTextIndex: Record<string, string> = {};
  const activeClipIds = new Set<string>();

  const allCatalogs = [
    ...getAllLessons().map(collectLessonSpeechTexts),
    ...milestones.map(collectMilestoneSpeechTexts),
  ];

  for (const catalog of allCatalogs) {
    const clipIds: string[] = [];

    for (const text of catalog.texts) {
      const normalized = normalizeTtsText(text);
      const clipId = createClipId(normalized);
      const previous = nextClips[clipId];
      const lessons = new Set(previous?.lessons ?? []);
      lessons.add(catalog.lessonId);

      nextClips[clipId] = {
        id: clipId,
        text: normalized,
        lessons: Array.from(lessons).sort(),
        orphaned: false,
        variants: previous?.variants ?? {},
      };

      nextTextIndex[normalized] = clipId;
      clipIds.push(clipId);
      activeClipIds.add(clipId);
    }

    nextLessons[catalog.lessonId] = Array.from(new Set(clipIds)).sort();
  }

  for (const clip of Object.values(nextClips)) {
    clip.orphaned = !activeClipIds.has(clip.id);
    nextTextIndex[clip.text] = clip.id;
  }

  const manifest: AudioManifest = {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    defaultVoice: voice,
    storageBucket: bucket,
    lessons: nextLessons,
    textIndex: Object.fromEntries(Object.entries(nextTextIndex).sort(([a], [b]) => a.localeCompare(b, 'ja'))),
    clips: Object.fromEntries(
      Object.entries(nextClips).sort(([a], [b]) => a.localeCompare(b))
    ),
  };

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const totalClips = Object.keys(manifest.clips).length;
  const missingForVoice = Object.values(manifest.clips).filter((clip) => !clip.variants?.[voice]).length;

  console.log(`Manifest written to ${manifestPath}`);
  console.log(`Lessons: ${Object.keys(manifest.lessons).length}`);
  console.log(`Clips: ${totalClips}`);
  console.log(`Missing ${voice}: ${missingForVoice}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
