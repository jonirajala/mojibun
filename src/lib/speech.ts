import { getAudioManifest } from './audioManifest';
import { normalizeTtsText } from './ttsText';

const DEFAULT_RATE = 1;
const SLOW_RATE = 0.78;
const AUDIO_CACHE_NAME = 'moshimoshi-audio-v1';

let japaneseVoice: SpeechSynthesisVoice | null = null;
let activeLessonId: string | null = null;
let currentAudio: HTMLAudioElement | null = null;
const objectUrlCache = new Map<string, string>();

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

function fallbackSpeak(text: string, rate: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof speechSynthesis === 'undefined') { resolve(); return; }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = 1;
    const voice = getJapaneseVoice();
    if (voice) utterance.voice = voice;
    let resolved = false;
    const done = () => { if (!resolved) { resolved = true; resolve(); } };
    utterance.onend = done;
    utterance.onerror = done;
    setTimeout(done, 5000);
    speechSynthesis.speak(utterance);
  });
}

async function getAudioCache(): Promise<Cache | null> {
  if (typeof caches === 'undefined') return null;
  try {
    return await caches.open(AUDIO_CACHE_NAME);
  } catch {
    return null;
  }
}

async function responseToObjectUrl(cacheKey: string, response: Response): Promise<string> {
  const existing = objectUrlCache.get(cacheKey);
  if (existing) return existing;

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  objectUrlCache.set(cacheKey, objectUrl);
  return objectUrl;
}

async function getCachedOrFetchAudioUrl(cacheKey: string, publicUrl: string): Promise<string | null> {
  const cachedObjectUrl = objectUrlCache.get(cacheKey);
  if (cachedObjectUrl) return cachedObjectUrl;

  const cache = await getAudioCache();
  if (cache) {
    const cachedResponse = await cache.match(publicUrl);
    if (cachedResponse) {
      return responseToObjectUrl(cacheKey, cachedResponse);
    }
  }

  const response = await fetch(publicUrl);
  if (!response.ok) return null;

  if (cache) {
    try {
      await cache.put(publicUrl, response.clone());
    } catch {
      // Ignore cache write failures and still use the fetched audio.
    }
  }

  return responseToObjectUrl(cacheKey, response);
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

  const resolvedUrl = await getCachedOrFetchAudioUrl(cacheKey, publicUrl);
  if (!resolvedUrl) return null;

  clipUrlCache.set(cacheKey, resolvedUrl);
  return resolvedUrl;
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
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      audio.addEventListener('ended', done, { once: true });
      audio.addEventListener('pause', done, { once: true });
      audio.addEventListener('error', done, { once: true });
    });
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

    const resolvedUrl = await getCachedOrFetchAudioUrl(cacheKey, publicUrl);
    if (!resolvedUrl) return;
    clipUrlCache.set(cacheKey, resolvedUrl);
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
  const highPriority = clipIds.slice(0, 4);
  const background = clipIds.slice(4);

  await Promise.all(highPriority.map((clipId) => preloadClip(clipId, voice)));
  void Promise.all(background.map((clipId) => preloadClip(clipId, voice)));
}

export async function preloadLessonAudioInBackground(lessonId: string, voiceOverride?: string) {
  const manifest = await getAudioManifest();
  if (!manifest) return;

  const voice = voiceOverride ?? manifest.defaultVoice;
  const clipIds = manifest.lessons[lessonId] ?? [];
  void Promise.all(clipIds.map((clipId) => preloadClip(clipId, voice)));
}

export function speakJapanese(text: string, rate: number = DEFAULT_RATE): Promise<void> {
  const normalized = normalizeTtsText(text);
  return (async () => {
    const played = await playGeneratedClip(normalized, rate);
    if (!played) await fallbackSpeak(normalized, rate);
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
