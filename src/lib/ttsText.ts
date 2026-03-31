import type { Exercise, Lesson, MilestoneReview, VocabWord } from '../data/types.ts';

const JAPANESE_TEXT_RE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々]/u;

export interface LessonSpeechCatalog {
  lessonId: string;
  texts: string[];
}

export function normalizeTtsText(text: string): string {
  return text.replace(/\s+/g, '').trim();
}

export function containsJapaneseText(text: string): boolean {
  return JAPANESE_TEXT_RE.test(text);
}

function collectSpeechTexts(id: string, exercises: Exercise[], vocabulary: VocabWord[] = []): LessonSpeechCatalog {
  const texts = new Set<string>();

  const addText = (value: string) => {
    const normalized = normalizeTtsText(value);
    if (!normalized || !containsJapaneseText(normalized)) return;
    texts.add(normalized);
  };

  vocabulary.forEach((word) => addText(word.japanese));
  exercises.forEach((exercise) => collectExerciseSpeechTexts(exercise).forEach(addText));

  return {
    lessonId: id,
    texts: Array.from(texts).sort((a, b) => a.localeCompare(b, 'ja')),
  };
}

export function collectLessonSpeechTexts(lesson: Lesson): LessonSpeechCatalog {
  return collectSpeechTexts(lesson.id, lesson.exercises, lesson.vocabulary);
}

export function collectMilestoneSpeechTexts(milestone: MilestoneReview): LessonSpeechCatalog {
  return collectSpeechTexts(milestone.id, milestone.exercises);
}

export function collectExerciseSpeechTexts(exercise: Exercise): string[] {
  switch (exercise.type) {
    case 'multiple_choice':
      return exercise.options.filter(containsJapaneseText);
    case 'matching':
      return exercise.pairs.map((pair) => pair.left).filter(containsJapaneseText);
    case 'fill_blank':
      return [
        ...exercise.options.filter(containsJapaneseText),
        exercise.sentence.replace('＿', exercise.answer),
      ];
    case 'word_order':
      return [exercise.correctOrder.join('')];
    case 'translation':
      return [exercise.correctAnswer.join('')];
    case 'kana_build':
      return [exercise.correctChars.join('')];
    case 'grammar_intro':
      return exercise.examples.map((example) => example.japanese);
    case 'vocab_intro':
      return exercise.words.map((word) => word.japanese);
    case 'listening':
      return exercise.options.filter(containsJapaneseText);
    case 'true_false':
      return [exercise.japanese];
    case 'dialogue_response':
      return [
        exercise.speakerLine,
        ...exercise.options.filter(containsJapaneseText),
      ];
    case 'kanji_reading':
      return [exercise.kanji];
    case 'reading':
      return [exercise.passage];
  }
}
