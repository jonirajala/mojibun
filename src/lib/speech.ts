import { getAudioManifest } from './audioManifest';
import { normalizeTtsText } from './ttsText';

const DEFAULT_RATE = 1;
const SLOW_RATE = 0.78;

let japaneseVoice: SpeechSynthesisVoice | null = null;
let activeLessonId: string | null = null;
let currentAudio: HTMLAudioElement | null = null;

const clipUrlCache = new Map<string, string>();
const preloadPromiseCache = new Map<string, Promise<void>>();

function getSupabasePublicUrl(bucket: string, objectPath: string): string | null {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
  if (!supabaseUrl) return null;
  return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${objectPath}`;
}

function getJapaneseVoice(): SpeechSynthesisVoice | null {
  if (japaneseVoice) return japaneseVoice;
  const voices = speechSynthesis.getVoices();
  japaneseVoice =
    voices.find((voice) => voice.lang === 'ja-JP' && voice.name.includes('Kyoko')) ??
    voices.find((voice) => voice.lang === 'ja-JP' && voice.name.includes('O-Ren')) ??
    voices.find((voice) => voice.lang === 'ja-JP' && !voice.name.includes('Google')) ??
    voices.find((voice) => voice.lang === 'ja-JP') ??
    voices.find((voice) => voice.lang.startsWith('ja')) ??
    null;
  return japaneseVoice;
}

function fallbackSpeak(text: string, rate: number) {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = 1;
  const voice = getJapaneseVoice();
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}

async function resolveClipUrl(text: string, voiceOverride?: string): Promise<string | null> {
  const manifest = await getAudioManifest();
  if (!manifest) return null;

  const normalized = normalizeTtsText(text);
  const clipId = manifest.textIndex[normalized];
  if (!clipId) return null;

  const voice = voiceOverride ?? manifest.defaultVoice;
  const cacheKey = `${voice}:${clipId}`;
  const cachedUrl = clipUrlCache.get(cacheKey);
  if (cachedUrl) return cachedUrl;

  const variant = manifest.clips[clipId]?.variants?.[voice];
  if (!variant) return null;

  const publicUrl = getSupabasePublicUrl(manifest.storageBucket, variant.path);
  if (!publicUrl) return null;

  clipUrlCache.set(cacheKey, publicUrl);
  return publicUrl;
}

async function playGeneratedClip(text: string, rate: number): Promise<boolean> {
  const clipUrl = await resolveClipUrl(text);
  if (!clipUrl) return false;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(clipUrl);
  audio.preload = 'auto';
  audio.playbackRate = rate;
  currentAudio = audio;

  try {
    await audio.play();
    return true;
  } catch {
    currentAudio = null;
    return false;
  }
}

async function preloadClip(clipId: string, voice: string): Promise<void> {
  const cacheKey = `${voice}:${clipId}`;
  const existing = preloadPromiseCache.get(cacheKey);
  if (existing) return existing;

  const preloadPromise = (async () => {
    const manifest = await getAudioManifest();
    if (!manifest) return;
    const variant = manifest.clips[clipId]?.variants?.[voice];
    if (!variant) return;

    const publicUrl = getSupabasePublicUrl(manifest.storageBucket, variant.path);
    if (!publicUrl) return;

    clipUrlCache.set(cacheKey, publicUrl);
    const audio = new Audio(publicUrl);
    audio.preload = 'auto';
    audio.load();
  })();

  preloadPromiseCache.set(cacheKey, preloadPromise);
  return preloadPromise;
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => {
    japaneseVoice = null;
    getJapaneseVoice();
  };
}

export function setActiveLessonAudio(lessonId: string | null) {
  activeLessonId = lessonId;
}

export async function preloadLessonAudio(lessonId: string, voiceOverride?: string) {
  activeLessonId = lessonId;

  const manifest = await getAudioManifest();
  if (!manifest) return;

  const voice = voiceOverride ?? manifest.defaultVoice;
  const clipIds = manifest.lessons[lessonId] ?? [];
  await Promise.all(clipIds.map((clipId) => preloadClip(clipId, voice)));
}

export function speakJapanese(text: string, rate: number = DEFAULT_RATE) {
  const normalized = normalizeTtsText(text);
  void (async () => {
    const played = await playGeneratedClip(normalized, rate);
    if (!played) fallbackSpeak(normalized, rate);
  })();
}

export function speakSlow(text: string) {
  speakJapanese(text, SLOW_RATE);
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel();
  }
}

export function getActiveLessonAudio(): string | null {
  return activeLessonId;
}
