import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ScriptMode = 'kana' | 'kanji_furigana' | 'kanji';

interface UserState {
  name: string;
  hasCompletedOnboarding: boolean;
  showRomaji: boolean;
  scriptMode: ScriptMode;
  createdAt: string | null;
  setName: (name: string) => void;
  completeOnboarding: () => void;
  toggleRomaji: () => void;
  setScriptMode: (mode: ScriptMode) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      hasCompletedOnboarding: false,
      showRomaji: false,
      scriptMode: 'kanji_furigana' as ScriptMode,
      createdAt: null,
      setName: (name) => set({ name }),
      completeOnboarding: () =>
        set({ hasCompletedOnboarding: true, createdAt: new Date().toISOString() }),
      toggleRomaji: () => set((s) => ({ showRomaji: !s.showRomaji })),
      setScriptMode: (mode) => set({ scriptMode: mode }),
      reset: () =>
        set({
          name: '',
          hasCompletedOnboarding: false,
          showRomaji: false,
          scriptMode: 'kanji_furigana',
          createdAt: null,
        }),
    }),
    { name: 'yappari-user' }
  )
);
