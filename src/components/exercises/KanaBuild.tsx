import { useState } from 'react';
import { motion } from 'framer-motion';
import type { KanaBuildExercise } from '../../data/types';
import { cn, shuffleArray } from '../../lib/utils';
import { VisualIcon } from '../common/VisualIcon';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: KanaBuildExercise;
  onAnswer: (correct: boolean) => void;
}

export function KanaBuild({ exercise, onAnswer }: Props) {
  // Build char bank: correct chars + distractors, shuffled
  // For duplicate chars in the answer, we need multiple copies in the bank
  const [charBank] = useState(() =>
    shuffleArray([...exercise.correctChars, ...exercise.distractors])
  );
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectChar = (idx: number) => {
    if (answered) return;
    playTap();
    setSelectedIndices([...selectedIndices, idx]);
    setSelectedChars([...selectedChars, charBank[idx]]);
  };

  const handleRemoveChar = (position: number) => {
    if (answered) return;
    const newChars = [...selectedChars];
    const newIndices = [...selectedIndices];
    newChars.splice(position, 1);
    newIndices.splice(position, 1);
    setSelectedChars(newChars);
    setSelectedIndices(newIndices);
  };

  const handleCheck = () => {
    if (selectedChars.length === 0) return;
    const correct =
      selectedChars.length === exercise.correctChars.length &&
      selectedChars.every((c, i) => c === exercise.correctChars[i]);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      playCorrect();
      setTimeout(() => speakJapanese(exercise.correctChars.join('')), 300);
      setTimeout(() => onAnswer(true), 800);
    } else {
      playIncorrect();
    }
  };

  // Show the target word joined (for display after answer)
  const targetWord = exercise.correctChars.join('');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
          Build this word
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          {exercise.emoji && <VisualIcon text={targetWord} sizeClass="w-10 h-10" />}
          <p className="text-xl text-gray-700 font-medium">"{exercise.prompt}"</p>
        </div>

        {/* Character slots showing expected length */}
        <div className="flex justify-center gap-1.5 mb-8">
          {exercise.correctChars.map((_, i) => {
            const char = selectedChars[i];
            const charCorrect = answered && char === exercise.correctChars[i];

            return (
              <motion.button
                key={i}
                layout
                onClick={() => char ? handleRemoveChar(i) : undefined}
                className={cn(
                  'w-12 h-14 rounded-xl border-2 flex items-center justify-center font-jp text-xl font-bold transition-all',
                  char
                    ? answered
                      ? charCorrect
                        ? 'border-correct bg-correct/10 text-correct'
                        : 'border-incorrect bg-incorrect/10 text-incorrect'
                      : 'border-accent-blue bg-accent-blue/5 text-accent-blue'
                    : 'border-gray-200 border-dashed bg-gray-50 text-gray-300'
                )}
              >
                {char || ''}
              </motion.button>
            );
          })}
        </div>

        {/* Show correct answer when wrong */}
        {answered && !isCorrect && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-jp text-lg text-correct font-medium mb-6"
          >
            Correct: {targetWord}
          </motion.p>
        )}

        {/* Character bank */}
        <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
          {charBank.map((char, idx) => {
            const isUsed = selectedIndices.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleSelectChar(idx)}
                disabled={isUsed || answered}
                className={cn(
                  'w-12 h-12 rounded-xl border-2 font-jp text-xl font-medium transition-all flex items-center justify-center',
                  isUsed
                    ? 'border-gray-100 bg-gray-50 text-gray-200'
                    : 'border-gray-200 bg-white text-gray-800 active:scale-90 shadow-[0_2px_0_0_#e5e5e5] active:shadow-none active:translate-y-0.5'
                )}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-8">
        {answered && !isCorrect ? (
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
            disabled={selectedChars.length === 0 || answered}
            className={cn(
              'w-full py-4 rounded-2xl text-lg font-bold transition-all',
              selectedChars.length > 0 && !answered
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
