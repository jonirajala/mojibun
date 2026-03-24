import type { Unit } from './types.ts';
import { unit1Lessons } from './v2/unit1.ts';
import { unit2Lessons } from './v2/unit2.ts';
import { unit3Lessons } from './v2/unit3.ts';
import { unit4Lessons } from './v2/unit4.ts';
import { unit5Lessons } from './v2/unit5.ts';
import { unit6Lessons } from './v2/unit6.ts';

export const course: Unit[] = [
  {
    id: 'unit-1',
    title: 'Hello!',
    titleJp: 'こんにちは',
    description: 'Shortest, highest-confidence greetings only',
    color: '#D94F3B',
    lessons: unit1Lessons,
  },
  {
    id: 'unit-2',
    title: 'Please & Thank You',
    titleJp: 'おねがいします',
    description: 'Social survival with short useful phrases',
    color: '#3B82F6',
    lessons: unit2Lessons,
  },
  {
    id: 'unit-3',
    title: 'I Am...',
    titleJp: 'わたしは',
    description: 'は/です pattern, questions, negation, self-intro',
    color: '#E67E22',
    lessons: unit3Lessons,
  },
  {
    id: 'unit-4',
    title: 'What Is This?',
    titleJp: 'これはなに',
    description: 'これ/それ/あれ, identifying objects',
    color: '#8B5CF6',
    lessons: unit4Lessons,
  },
  {
    id: 'unit-5',
    title: 'My Things',
    titleJp: 'わたしのもの',
    description: 'この/その/あの, の possession, more objects',
    color: '#10B981',
    lessons: unit5Lessons,
  },
  {
    id: 'unit-6',
    title: 'Also & Where?',
    titleJp: 'もとどこ',
    description: 'も particle, location words, どれ/どの',
    color: '#D94F3B',
    lessons: unit6Lessons,
  },
  // Future units (content from old Units 3-10, to be expanded similarly)
  {
    id: 'unit-7',
    title: 'People & Family',
    titleJp: 'ひととかぞく',
    description: 'Family words, person words, personal-world vocabulary',
    color: '#3B82F6',
    lessons: [],
  },
  {
    id: 'unit-8',
    title: 'Numbers',
    titleJp: 'すうじ',
    description: '1-10, quantity, age, prices, first counting feel',
    color: '#E67E22',
    lessons: [],
  },
  {
    id: 'unit-9',
    title: 'Time & Days',
    titleJp: 'じかん',
    description: 'Days, time, daily rhythm, routine-ready vocabulary',
    color: '#8B5CF6',
    lessons: [],
  },
  {
    id: 'unit-10',
    title: 'Places',
    titleJp: 'ばしょ',
    description: 'School/home/station/store, existence, first go/come/location sentences',
    color: '#10B981',
    lessons: [],
  },
];

export function getAllLessons() {
  return course.flatMap((unit) => unit.lessons);
}

export function getLessonById(lessonId: string) {
  return getAllLessons().find((l) => l.id === lessonId);
}

export function getUnitByLessonId(lessonId: string) {
  return course.find((u) => u.lessons.some((l) => l.id === lessonId));
}

export function getNextLessonId(currentLessonId: string): string | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx >= allLessons.length - 1) return null;
  return allLessons[idx + 1].id;
}

export function getPreviousLessonId(currentLessonId: string): string | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx <= 0) return null;
  return allLessons[idx - 1].id;
}
