export interface ClipVariant {
  path: string;
  generatedAt?: string;
  uploadedAt?: string;
  checksumSha1?: string;
}

export interface AudioClip {
  id: string;
  text: string;
  lessons: string[];
  orphaned?: boolean;
  variants?: Record<string, ClipVariant>;
}

export interface AudioManifest {
  schemaVersion: number;
  updatedAt: string;
  defaultVoice: string;
  storageBucket: string;
  lessons: Record<string, string[]>;
  textIndex: Record<string, string>;
  clips: Record<string, AudioClip>;
}

let manifestPromise: Promise<AudioManifest | null> | null = null;

export async function getAudioManifest(): Promise<AudioManifest | null> {
  if (!manifestPromise) {
    manifestPromise = fetch('/audio/manifest.json')
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<AudioManifest>;
      })
      .catch(() => null);
  }

  return manifestPromise;
}
