import { useState, useEffect } from 'react';
import type { MatchingExercise } from '../../data/types';
import { cn, shuffleArray } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { containsJapaneseText } from '../../lib/ttsText';
import { playTap, playMatch, playIncorrect, playCorrect } from '../../lib/sounds';

interface Props {
  exercise: MatchingExercise;
  onAnswer: (correct: boolean) => void;
}

export function Matching({ exercise, onAnswer }: Props) {
  const [shuffledLeft] = useState(() => shuffleArray(exercise.pairs.map((p) => p.left)));
  const [shuffledRight] = useState(() => shuffleArray(exercise.pairs.map((p) => p.right)));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const pairMap = new Map(exercise.pairs.map((p) => [p.left, p.right]));

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isMatch = pairMap.get(selectedLeft) === selectedRight;
      if (isMatch) {
        playMatch();
        setMatchedPairs((prev) => {
          const next = new Set(prev);
          next.add(selectedLeft);
          return next;
        });
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        playIncorrect();
        setWrongPair({ left: selectedLeft, right: selectedRight });
        setMistakes((m) => m + 1);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
      }
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (matchedPairs.size === exercise.pairs.length) {
      playCorrect();
      setTimeout(() => {
        onAnswer(mistakes === 0);
      }, 500);
    }
  }, [matchedPairs.size]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 text-center pt-4 pb-4 px-4 shrink-0">
        Match the pairs
      </h2>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-w-md mx-auto w-full">
          {/* Left column — Japanese with emoji */}
          <div className="flex flex-col gap-3">
            {shuffledLeft.map((word) => {
              const isMatched = matchedPairs.has(word);
              const isSelected = selectedLeft === word;
              const isWrong = wrongPair?.left === word;

              return (
                <button
                  key={word}
                  onClick={() => {
                    if (isMatched || wrongPair) return;
                    playTap();
                    if (containsJapaneseText(word)) speakJapanese(word);
                    setSelectedLeft(word === selectedLeft ? null : word);
                  }}
                  disabled={isMatched}
                  className={cn(
                    'p-3 rounded-xl border-2 text-base font-medium transition-all flex items-center justify-center gap-2',
                    isMatched && 'border-correct/30 bg-correct/5 text-correct/50',
                    isWrong && 'border-incorrect bg-incorrect/10 text-incorrect animate-shake',
                    isSelected && !isWrong && 'border-accent-blue bg-accent-blue/5 text-accent-blue',
                    !isMatched && !isSelected && !isWrong && 'border-gray-200 bg-white text-gray-800',
                    !isMatched && 'active:scale-95'
                  )}
                >
                  <JpText text={word} reading={getReading(word)} />
                </button>
              );
            })}
          </div>

          {/* Right column — English */}
          <div className="flex flex-col gap-3">
            {shuffledRight.map((word) => {
              const matchedLeftWord = exercise.pairs.find((p) => p.right === word)?.left;
              const isMatched = matchedLeftWord ? matchedPairs.has(matchedLeftWord) : false;
              const isSelected = selectedRight === word;
              const isWrong = wrongPair?.right === word;

              return (
                <button
                  key={word}
                  onClick={() => {
                    if (isMatched || wrongPair) return;
                    playTap();
                    setSelectedRight(word === selectedRight ? null : word);
                  }}
                  disabled={isMatched}
                  className={cn(
                    'p-3 rounded-xl border-2 text-base font-medium transition-all text-center',
                    isMatched && 'border-correct/30 bg-correct/5 text-correct/50',
                    isWrong && 'border-incorrect bg-incorrect/10 text-incorrect animate-shake',
                    isSelected && !isWrong && 'border-accent-blue bg-accent-blue/5 text-accent-blue',
                    !isMatched && !isSelected && !isWrong && 'border-gray-200 bg-white text-gray-800',
                    !isMatched && 'active:scale-95'
                  )}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
