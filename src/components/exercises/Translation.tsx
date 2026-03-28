import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TranslationExercise } from '../../data/types';
import { cn, shuffleArray } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: TranslationExercise;
  onAnswer: (correct: boolean) => void;
}

export function Translation({ exercise, onAnswer }: Props) {
  const [shuffledBank] = useState(() => shuffleArray(exercise.wordBank));
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectWord = (idx: number) => {
    if (answered) return;
    playTap();
    setSelectedIndices([...selectedIndices, idx]);
    setSelectedWords([...selectedWords, shuffledBank[idx]]);
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
      selectedWords.length === exercise.correctAnswer.length &&
      selectedWords.every((w, i) => w === exercise.correctAnswer[i]);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      playCorrect();
      setTimeout(async () => {
        await speakJapanese(exercise.correctAnswer.join(''));
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
        <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
          Translate this sentence
        </h2>
        <p className="text-xl text-gray-700 text-center mb-8 font-medium">
          "{exercise.prompt}"
        </p>

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
              <span className="text-gray-300 text-sm">Tap words to translate</span>
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
                  'font-jp px-4 py-2 rounded-xl text-lg font-medium',
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
          {shuffledBank.map((word, idx) => {
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
