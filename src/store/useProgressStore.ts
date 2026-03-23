import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonResult } from '../data/types';

interface ProgressState {
  completedLessons: Record<string, LessonResult>;
  totalXp: number;
  completeLesson: (result: LessonResult) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonResult: (lessonId: string) => LessonResult | undefined;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      totalXp: 0,
      completeLesson: (result) =>
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [result.lessonId]: result,
          },
          totalXp: state.totalXp + result.score,
        })),
      isLessonCompleted: (lessonId) => !!get().completedLessons[lessonId],
      getLessonResult: (lessonId) => get().completedLessons[lessonId],
      reset: () => set({ completedLessons: {}, totalXp: 0 }),
    }),
    { name: 'yappari-progress' }
  )
);
