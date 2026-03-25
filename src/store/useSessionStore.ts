import { create } from 'zustand';
import type { Exercise } from '../data/types';

interface AnswerRecord {
  exerciseId: string;
  wasCorrect: boolean;
}

interface SessionState {
  lessonId: string | null;
  exercises: Exercise[];
  currentIndex: number;
  answers: AnswerRecord[];
  mistakes: number;
  /** Whether retry exercises have been appended */
  retriesAdded: boolean;
  /** Original exercise count before retries were added */
  originalCount: number;
  startLesson: (lessonId: string, exercises: Exercise[]) => void;
  submitAnswer: (exerciseId: string, wasCorrect: boolean) => void;
  nextExercise: () => void;
  getCurrentExercise: () => Exercise | null;
  isComplete: () => boolean;
  getScore: () => number;
  getStars: () => number;
  isFailed: () => boolean;
  isRetryPhase: () => boolean;
  getRetryProgress: () => { current: number; total: number };
  reset: () => void;
}

// Exercise types that are scored (not intros)
const SCORED_TYPES = ['multiple_choice', 'matching', 'fill_blank', 'word_order', 'translation', 'kana_build'];

export const useSessionStore = create<SessionState>()((set, get) => ({
  lessonId: null,
  exercises: [],
  currentIndex: 0,
  answers: [],
  mistakes: 0,
  retriesAdded: false,
  originalCount: 0,

  startLesson: (lessonId, exercises) =>
    set({ lessonId, exercises, currentIndex: 0, answers: [], mistakes: 0, retriesAdded: false, originalCount: exercises.length }),

  submitAnswer: (exerciseId, wasCorrect) =>
    set((state) => {
      const newAnswers = [...state.answers, { exerciseId, wasCorrect }];
      const newMistakes = wasCorrect ? state.mistakes : state.mistakes + 1;

      // Check if we've reached the end of the original exercises
      // and need to add retry exercises for wrong answers
      const nextIndex = state.currentIndex + 1;
      if (!state.retriesAdded && nextIndex >= state.exercises.length) {
        // Find exercises that were answered wrong (only scored types)
        const wrongExerciseIds = new Set(
          newAnswers
            .filter((a) => !a.wasCorrect)
            .map((a) => a.exerciseId)
        );

        const retryExercises = state.exercises.filter(
          (ex) => wrongExerciseIds.has(ex.id) && SCORED_TYPES.includes(ex.type)
        );

        if (retryExercises.length > 0) {
          // Append retry exercises with modified IDs
          const retries = retryExercises.map((ex) => ({
            ...ex,
            id: ex.id + '-retry',
          }));
          return {
            answers: newAnswers,
            mistakes: newMistakes,
            exercises: [...state.exercises, ...retries],
            retriesAdded: true,
          };
        }
      }

      return { answers: newAnswers, mistakes: newMistakes };
    }),

  nextExercise: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  getCurrentExercise: () => {
    const { exercises, currentIndex } = get();
    return exercises[currentIndex] ?? null;
  },

  isComplete: () => {
    const { exercises, currentIndex } = get();
    return currentIndex >= exercises.length;
  },

  getScore: () => {
    const { answers } = get();
    // Only count scored exercises (exclude intros and retries)
    const scored = answers.filter(
      (a) => !a.exerciseId.endsWith('-retry') && a.wasCorrect !== undefined
    );
    if (scored.length === 0) return 100;
    const correct = scored.filter((a) => a.wasCorrect).length;
    return Math.round((correct / scored.length) * 100);
  },

  getStars: () => {
    const score = get().getScore();
    if (score >= 95) return 3;
    if (score >= 80) return 2;
    if (score >= 50) return 1;
    return 0; // failed
  },

  isFailed: () => {
    return get().getScore() < 50;
  },

  isRetryPhase: () => {
    const { currentIndex, originalCount, retriesAdded } = get();
    return retriesAdded && currentIndex >= originalCount;
  },

  getRetryProgress: () => {
    const { currentIndex, exercises, originalCount } = get();
    const retryTotal = exercises.length - originalCount;
    const retryCurrent = currentIndex - originalCount;
    return { current: retryCurrent + 1, total: retryTotal };
  },

  reset: () =>
    set({ lessonId: null, exercises: [], currentIndex: 0, answers: [], mistakes: 0, retriesAdded: false, originalCount: 0 }),
}));
