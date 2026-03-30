import { useState, useMemo } from 'react';
import type { ReadingExercise } from '../../data/types';
import { cn } from '../../lib/utils';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: ReadingExercise;
  onAnswer: (correct: boolean) => void;
}

export function Reading({ exercise, onAnswer }: Props) {
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

  const handlePlay = () => {
    speakJapanese(exercise.passage);
  };

  const handleSelect = (index: number) => {
    if (answered) return;
    playTap();
    setSelected(index);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === correctShuffledIndex;
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
        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
          Read and answer
        </h2>

        {/* Passage card */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-2 relative">
          <p className="font-jp text-lg leading-relaxed text-gray-900 whitespace-pre-line">
            {exercise.passage}
          </p>
          {/* Play button */}
          <button
            onClick={handlePlay}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center
                       hover:bg-amber-200 active:scale-90 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
          </button>
        </div>

        {/* Question */}
        <p className="text-center text-gray-600 font-medium mb-5 mt-3">
          {exercise.question}
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
              borderColor = 'border-amber-400';
              bgColor = 'bg-amber-50';
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
                {option}
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
