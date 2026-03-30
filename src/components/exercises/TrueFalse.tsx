import { useState, useEffect } from 'react';
import type { TrueFalseExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: TrueFalseExercise;
  onAnswer: (correct: boolean) => void;
}

export function TrueFalse({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  useEffect(() => {
    speakJapanese(exercise.japanese);
  }, [exercise.id]);

  const handleSelect = (answer: boolean) => {
    if (answered) return;
    playTap();
    setSelected(answer);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === exercise.isCorrect;
    setAnswered(true);
    setWasCorrect(isCorrect);
    if (isCorrect) {
      playCorrect();
      setTimeout(() => onAnswer(true), 800);
    } else {
      playIncorrect();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="flex flex-col justify-center min-h-full py-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">
          Is this translation correct?
        </h2>

        {/* Japanese sentence */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-4 text-center">
          <p className="font-jp text-2xl mb-1">
            <JpText text={exercise.japanese} reading={getReading(exercise.japanese)} />
          </p>
        </div>

        {/* English translation */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-8 text-center">
          <p className="text-lg text-gray-700">= "{exercise.english}"</p>
        </div>

        {/* Correct / Wrong answer display */}
        {answered && (
          <div className={cn(
            'text-center text-sm mb-4 font-medium',
            wasCorrect ? 'text-correct' : 'text-incorrect'
          )}>
            {wasCorrect
              ? exercise.isCorrect
                ? 'Yes, that\'s correct!'
                : `No, the correct translation is: "${exercise.correctEnglish}"`
              : exercise.isCorrect
                ? 'Actually, the translation was correct!'
                : `The correct translation is: "${exercise.correctEnglish}"`
            }
          </div>
        )}

        {/* True / False buttons */}
        <div className="flex gap-4 max-w-md mx-auto w-full">
          <button
            onClick={() => handleSelect(true)}
            className={cn(
              'flex-1 py-4 rounded-2xl border-2 text-lg font-bold transition-all',
              answered && exercise.isCorrect
                ? 'border-correct bg-correct/10 text-correct'
                : answered && selected === true && !exercise.isCorrect
                  ? 'border-incorrect bg-incorrect/10 text-incorrect animate-shake'
                  : selected === true
                    ? 'border-correct bg-correct/5 text-correct'
                    : 'border-gray-200 bg-white text-gray-600',
              !answered && 'active:scale-[0.98]'
            )}
          >
            Correct
          </button>
          <button
            onClick={() => handleSelect(false)}
            className={cn(
              'flex-1 py-4 rounded-2xl border-2 text-lg font-bold transition-all',
              answered && !exercise.isCorrect
                ? 'border-correct bg-correct/10 text-correct'
                : answered && selected === false && exercise.isCorrect
                  ? 'border-incorrect bg-incorrect/10 text-incorrect animate-shake'
                  : selected === false
                    ? 'border-incorrect bg-incorrect/5 text-incorrect'
                    : 'border-gray-200 bg-white text-gray-600',
              !answered && 'active:scale-[0.98]'
            )}
          >
            Wrong
          </button>
        </div>
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
