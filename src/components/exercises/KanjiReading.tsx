import { useState, useEffect, useMemo } from 'react';
import type { KanjiReadingExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: KanjiReadingExercise;
  onAnswer: (correct: boolean) => void;
}

export function KanjiReading({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const { shuffledOptions, correctShuffledIndex } = useMemo(() => {
    const originalCorrectIndex = exercise.options.indexOf(exercise.correctReading);
    const indices = exercise.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      shuffledOptions: indices.map((i) => exercise.options[i]),
      correctShuffledIndex: indices.indexOf(originalCorrectIndex),
    };
  }, [exercise.id]);

  useEffect(() => {
    speakJapanese(exercise.correctReading);
  }, [exercise.id]);

  const handleSelect = (index: number) => {
    if (answered) return;
    playTap();
    setSelected(index);
    speakJapanese(shuffledOptions[index]);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === correctShuffledIndex;
    setAnswered(true);
    setWasCorrect(isCorrect);
    if (isCorrect) {
      playCorrect();
      setTimeout(async () => {
        await speakJapanese(exercise.correctReading);
        onAnswer(true);
      }, 300);
    } else {
      playIncorrect();
      setTimeout(() => speakJapanese(exercise.correctReading), 300);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
          How do you read this kanji?
        </h2>

        {/* Kanji display */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-3 text-center">
          <p className="font-jp text-5xl font-bold text-gray-900">
            {exercise.kanji}
          </p>
        </div>

        {/* English hint */}
        {exercise.english && (
          <p className="text-center text-sm text-gray-400 mb-6">
            {exercise.english}
          </p>
        )}

        {/* Reading options */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
          {shuffledOptions.map((option, i) => {
            const isCorrect = i === correctShuffledIndex;
            const isSelected = i === selected;

            let borderColor = 'border-gray-200';
            let bgColor = 'bg-white';
            let textColor = 'text-gray-800';

            if (answered && isCorrect) {
              borderColor = 'border-correct';
              bgColor = 'bg-correct/10';
              textColor = 'text-correct';
            } else if (answered && isSelected && !isCorrect) {
              borderColor = 'border-incorrect';
              bgColor = 'bg-incorrect/10';
              textColor = 'text-incorrect';
            } else if (isSelected) {
              borderColor = 'border-primary';
              bgColor = 'bg-primary/5';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  'font-jp p-4 rounded-2xl border-2 text-xl font-medium text-center transition-all',
                  borderColor, bgColor, textColor,
                  answered && isSelected && !isCorrect && 'animate-shake',
                  !answered && 'active:scale-[0.98]'
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-8">
        {answered && !wasCorrect ? (
          <button
            onClick={() => onAnswer(false)}
            className="w-full py-4 rounded-2xl text-lg font-bold bg-incorrect text-white
                       shadow-[0_4px_0_0_#dc2626] active:shadow-none active:translate-y-1 transition-all"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={selected === null || answered}
            className={cn(
              'w-full py-4 rounded-2xl text-lg font-bold transition-all',
              selected !== null && !answered
                ? 'bg-primary text-white shadow-[0_4px_0_0_#B83A2A] active:shadow-none active:translate-y-1'
                : 'bg-gray-200 text-gray-400'
            )}
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
}
