import { useState, useEffect, useMemo } from 'react';
import type { DialogueResponseExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: DialogueResponseExercise;
  onAnswer: (correct: boolean) => void;
}

export function DialogueResponse({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const { shuffledOptions, correctShuffledIndex } = useMemo(() => {
    const indices = exercise.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      shuffledOptions: indices.map((i) => exercise.options[i]),
      correctShuffledIndex: indices.indexOf(exercise.correctIndex),
    };
  }, [exercise.id]);

  useEffect(() => {
    if (getReading(exercise.speakerLine)) {
      speakJapanese(exercise.speakerLine);
    }
  }, [exercise.id]);

  const handleSelect = (index: number) => {
    if (answered) return;
    playTap();
    setSelected(index);
    const option = shuffledOptions[index];
    if (getReading(option)) speakJapanese(option);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === correctShuffledIndex;
    setAnswered(true);
    setWasCorrect(isCorrect);
    if (isCorrect) {
      playCorrect();
      const correctOption = shuffledOptions[correctShuffledIndex];
      setTimeout(async () => {
        if (getReading(correctOption)) {
          await speakJapanese(correctOption);
        }
        onAnswer(true);
      }, 300);
    } else {
      playIncorrect();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="flex flex-col justify-center min-h-full py-4">
        {/* Speaker bubble */}
        <div className="max-w-sm mx-auto w-full mb-6">
          <p className="text-xs font-bold text-gray-400 mb-1 ml-3">{exercise.speaker}</p>
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
            <p className="font-jp text-lg">
              <JpText text={exercise.speakerLine} reading={getReading(exercise.speakerLine)} />
            </p>
          </div>
        </div>

        {/* Prompt */}
        <p className="text-center text-sm text-gray-500 mb-6">
          {exercise.prompt ?? 'You reply:'}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
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
              borderColor = 'border-accent-blue';
              bgColor = 'bg-accent-blue/5';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  'font-jp p-4 rounded-2xl border-2 text-base font-medium text-left transition-all',
                  borderColor, bgColor, textColor,
                  answered && isSelected && !isCorrect && 'animate-shake',
                  !answered && 'active:scale-[0.98]'
                )}
              >
                <JpText text={option} reading={getReading(option)} />
              </button>
            );
          })}
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
