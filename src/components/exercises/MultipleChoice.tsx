import { useState, useEffect } from 'react';
import type { MultipleChoiceExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { VisualIcon } from '../common/VisualIcon';
import { getReading } from '../../data/readings';
import { getEmoji, hasVisual } from '../../data/emoji';
import { SpeakButton } from '../common/SpeakButton';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (correct: boolean) => void;
}

export function MultipleChoice({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const hasJapaneseOptions = exercise.options.some((o) => hasVisual(o));
  const isListening = exercise.prompt.toLowerCase().includes('what do you hear');

  useEffect(() => {
    if (isListening) {
      speakJapanese(exercise.options[exercise.correctIndex]);
    }
  }, []);

  const handleSelect = (index: number) => {
    if (answered) return;
    playTap();
    setSelected(index);
    const option = exercise.options[index];
    if (getReading(option)) {
      speakJapanese(option);
    }
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === exercise.correctIndex;
    setAnswered(true);
    setWasCorrect(isCorrect);

    if (isCorrect) {
      playCorrect();
      setTimeout(() => onAnswer(true), 800);
    } else {
      playIncorrect();
      const correctOption = exercise.options[exercise.correctIndex];
      if (getReading(correctOption)) {
        setTimeout(() => speakJapanese(correctOption), 300);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-4">
        {isListening ? (
          <div className="flex flex-col items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-gray-800">What do you hear?</h2>
            <SpeakButton text={exercise.options[exercise.correctIndex]} size="lg" />
          </div>
        ) : (
          <h2 className="text-xl font-bold text-gray-800 text-center mb-8">
            {exercise.prompt}
          </h2>
        )}

        <div className={cn(
          'gap-3 max-w-md mx-auto w-full',
          hasJapaneseOptions ? 'grid grid-cols-2' : 'grid grid-cols-1'
        )}>
          {exercise.options.map((option, i) => {
            const isCorrect = i === exercise.correctIndex;
            const isSelected = i === selected;
            const emoji = getEmoji(option);

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
                  'rounded-2xl border-2 font-medium text-center transition-all',
                  hasJapaneseOptions ? 'p-3 flex flex-col items-center gap-1' : 'p-4 text-lg font-jp',
                  borderColor, bgColor, textColor,
                  answered && isSelected && !isCorrect && 'animate-shake',
                  answered && isCorrect && 'animate-bounce-in',
                  !answered && 'active:scale-[0.98]'
                )}
              >
                {emoji && <VisualIcon text={option} sizeClass="w-14 h-14" />}
                <JpText text={option} reading={getReading(option)} className={hasJapaneseOptions ? 'text-base' : ''} />
              </button>
            );
          })}
        </div>

        {answered && getReading(exercise.options[exercise.correctIndex]) && (
          <div className="flex justify-center mt-4">
            <SpeakButton text={exercise.options[exercise.correctIndex]} size="md" />
          </div>
        )}
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
