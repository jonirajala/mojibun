import { useState, useEffect, useMemo } from 'react';
import type { ListeningExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: ListeningExercise;
  onAnswer: (correct: boolean) => void;
}

export function Listening({ exercise, onAnswer }: Props) {
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
    speakJapanese(exercise.audio);
  }, [exercise.id]);

  const handlePlay = () => {
    speakJapanese(exercise.audio);
  };

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
      setTimeout(async () => {
        await speakJapanese(exercise.audio);
        onAnswer(true);
      }, 300);
    } else {
      playIncorrect();
      setTimeout(() => speakJapanese(exercise.audio), 300);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">
          What do you hear?
        </h2>

        {/* Speaker button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handlePlay}
            className="w-24 h-24 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center
                       hover:bg-indigo-100 active:scale-95 transition-all"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
          </button>
        </div>

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
              borderColor = 'border-indigo-400';
              bgColor = 'bg-indigo-50';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  'p-4 rounded-2xl border-2 text-lg font-medium text-center transition-all',
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
                ? 'bg-indigo-500 text-white shadow-[0_4px_0_0_#4338CA] active:shadow-none active:translate-y-1'
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
