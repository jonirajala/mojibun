import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface ClipVariant {
  path: string;
}

interface AudioClip {
  id: string;
  text: string;
  variants?: Record<string, ClipVariant>;
}

interface AudioManifest {
  defaultVoice: string;
  lessons: Record<string, string[]>;
  clips: Record<string, AudioClip>;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'public', 'audio', 'manifest.json');

function getArg(flag: string): string | null {
  const value = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  return value ? value.slice(flag.length + 1) : null;
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function main() {
  const raw = await readFile(manifestPath, 'utf8');
  const manifest = JSON.parse(raw) as AudioManifest;
  const voice = getArg('--voice') ?? manifest.defaultVoice;
  const lessonFilter = getArg('--lesson');
  const showMissing = hasFlag('--missing');

  const lessonIds = Object.keys(manifest.lessons)
    .filter((lessonId) => !lessonFilter || lessonId === lessonFilter)
    .sort((a, b) => a.localeCompare(b));

  if (lessonIds.length === 0) {
    throw new Error(`No lessons matched${lessonFilter ? `: ${lessonFilter}` : ''}`);
  }

  let completeLessons = 0;
  let totalRequired = 0;
  let totalGenerated = 0;

  for (const lessonId of lessonIds) {
    const clipIds = manifest.lessons[lessonId] ?? [];
    const missingTexts: string[] = [];

    for (const clipId of clipIds) {
      const clip = manifest.clips[clipId];
      totalRequired += 1;
      if (clip?.variants?.[voice]) {
        totalGenerated += 1;
      } else if (clip) {
        missingTexts.push(clip.text);
      }
    }

    const generated = clipIds.length - missingTexts.length;
    if (generated === clipIds.length) completeLessons += 1;

    const summary = `${lessonId.padEnd(8)} ${String(generated).padStart(3)}/${String(clipIds.length).padEnd(3)} ${missingTexts.length === 0 ? 'complete' : `missing ${missingTexts.length}`}`;
    console.log(summary);

    if (showMissing && missingTexts.length > 0) {
      for (const text of missingTexts) {
        console.log(`  - ${text}`);
      }
    }
  }

  console.log('');
  console.log(`Voice: ${voice}`);
  console.log(`Lessons complete: ${completeLessons}/${lessonIds.length}`);
  console.log(`Clips generated: ${totalGenerated}/${totalRequired}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
