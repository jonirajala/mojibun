import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WordOrderExercise } from '../../data/types';
import { cn, shuffleArray } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: WordOrderExercise;
  onAnswer: (correct: boolean) => void;
}

export function WordOrder({ exercise, onAnswer }: Props) {
  const [availableWords] = useState(() =>
    shuffleArray([...exercise.correctOrder, ...(exercise.distractors ?? [])])
  );
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleSelectWord = (idx: number) => {
    if (answered) return;
    playTap();
    setSelectedIndices([...selectedIndices, idx]);
    setSelectedWords([...selectedWords, availableWords[idx]]);
  };

  const handleRemoveWord = (position: number) => {
    if (answered) return;
    const newSelected = [...selectedWords];
    const newIndices = [...selectedIndices];
    newSelected.splice(position, 1);
    newIndices.splice(position, 1);
    setSelectedWords(newSelected);
    setSelectedIndices(newIndices);
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;
    const correct =
      selectedWords.length === exercise.correctOrder.length &&
      selectedWords.every((w, i) => w === exercise.correctOrder[i]);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      playCorrect();
      setTimeout(async () => {
        await speakJapanese(exercise.correctOrder.join(''));
        onAnswer(true);
      }, 300);
    } else {
      playIncorrect();
      setTimeout(() => speakJapanese(exercise.correctOrder.join('')), 300);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="flex flex-col justify-center min-h-full py-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
          Arrange the words
        </h2>
        <p className="text-gray-500 text-center mb-6">{exercise.prompt}</p>

        {/* Answer area */}
        <div
          className={cn(
            'min-h-16 p-3 rounded-2xl border-2 border-dashed mb-8 flex flex-wrap gap-2 justify-center items-center',
            answered
              ? isCorrect
                ? 'border-correct bg-correct/5'
                : 'border-incorrect bg-incorrect/5 animate-shake'
              : selectedWords.length > 0
                ? 'border-accent-blue bg-accent-blue/5'
                : 'border-gray-200'
          )}
        >
          <AnimatePresence>
            {selectedWords.length === 0 && (
              <span className="text-gray-300 text-sm">Tap words to build the sentence</span>
            )}
            {selectedWords.map((word, i) => (
              <motion.button
                key={`${word}-${i}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => handleRemoveWord(i)}
                className={cn(
                  'font-jp px-4 py-2 rounded-xl text-lg font-medium transition-colors',
                  answered
                    ? isCorrect
                      ? 'bg-correct/20 text-correct'
                      : 'bg-incorrect/20 text-incorrect'
                    : 'bg-accent-blue/10 text-accent-blue active:scale-95'
                )}
              >
                <JpText text={word} reading={getReading(word)} />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Word bank */}
        <div className="flex flex-wrap justify-center gap-3">
          {availableWords.map((word, idx) => {
            const isUsed = selectedIndices.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleSelectWord(idx)}
                disabled={isUsed || answered}
                className={cn(
                  'font-jp px-5 py-3 rounded-2xl border-2 text-lg font-medium transition-all',
                  isUsed
                    ? 'border-gray-100 bg-gray-50 text-gray-200'
                    : 'border-gray-200 bg-white text-gray-800 active:scale-95'
                )}
              >
                <JpText text={word} reading={getReading(word)} />
              </button>
            );
          })}
        </div>
        </div>
      </div>

      <div className="p-4 pb-8">
        {answered && !isCorrect && (
          <div className="mb-4 p-3 rounded-2xl bg-correct/10 border-2 border-correct/30">
            <p className="text-sm text-correct font-bold text-center mb-2">Correct answer:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {exercise.correctOrder.map((word, i) => (
                <span key={i} className="font-jp px-3 py-1 rounded-xl bg-correct/20 text-correct text-lg font-medium">
                  <JpText text={word} reading={getReading(word)} />
                </span>
              ))}
            </div>
          </div>
        )}
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
            disabled={selectedWords.length === 0 || answered}
            className={cn(
              'w-full py-4 rounded-2xl text-lg font-bold transition-all',
              selectedWords.length > 0 && !answered
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
