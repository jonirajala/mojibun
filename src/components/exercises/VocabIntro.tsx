import { useState } from 'react';
import type { VocabIntroExercise } from '../../data/types';
import { SpeakButton } from '../common/SpeakButton';
import { VisualIcon } from '../common/VisualIcon';
import { useUserStore } from '../../store/useUserStore';
import { getReading } from '../../data/readings';
import { getEmoji } from '../../data/emoji';
import { getKanjiEntry } from '../../data/kanji';
import { speakJapanese } from '../../lib/speech';
import { useUnitNumber } from '../../lib/LessonContext';

interface Props {
  exercise: VocabIntroExercise;
  onAnswer: (correct: boolean) => void;
}

export function VocabIntro({ exercise, onAnswer }: Props) {
  const showRomaji = useUserStore((s) => s.showRomaji);
  const scriptMode = useUserStore((s) => s.scriptMode);
  const unitNumber = useUnitNumber();
  const [currentIdx, setCurrentIdx] = useState(0);
  const word = exercise.words[currentIdx];
  const isLast = currentIdx >= exercise.words.length - 1;
  const emoji = word.emoji ?? getEmoji(word.japanese);

  // Check if this word has kanji and should be displayed
  const kanjiEntry = getKanjiEntry(word.japanese);
  const showKanji = scriptMode !== 'kana' && kanjiEntry && unitNumber >= kanjiEntry.introUnit;

  const renderWord = () => {
    if (!showKanji || !kanjiEntry) {
      return <span className="font-jp">{word.japanese}</span>;
    }

    if (scriptMode === 'kanji') {
      return <span className="font-jp">{kanjiEntry.kanji}</span>;
    }

    // Kanji + furigana
    return (
      <span className="font-jp">
        {kanjiEntry.segments.map((seg, i) =>
          seg.reading ? (
            <ruby key={i}>
              {seg.text}
              <rp>(</rp>
              <rt className="text-lg font-normal text-gray-400">{seg.reading}</rt>
              <rp>)</rp>
            </ruby>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {exercise.words.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i <= currentIdx ? 'bg-accent-blue' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Emoji */}
        {emoji && (
          <div className="mb-6 animate-bounce-in">
            <VisualIcon text={word.japanese} sizeClass="w-28 h-28" className="mx-auto" />
          </div>
        )}

        {/* Japanese word — tap to hear */}
        <button
          onClick={() => speakJapanese(word.japanese)}
          className="group"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-1 group-active:scale-95 transition-transform">
            {renderWord()}
          </h2>
        </button>

        {/* Kana reading (shown when kanji is displayed, so user can see both) */}
        {showKanji && (
          <p className="font-jp text-lg text-gray-400 mb-1">{word.japanese}</p>
        )}

        {/* Romaji */}
        {showRomaji && (
          <p className="text-sm text-gray-400 mb-3">
            {word.reading || getReading(word.japanese)}
          </p>
        )}

        {/* English */}
        <p className="text-xl text-gray-500 mb-6">{word.english}</p>

        {/* Audio button */}
        <SpeakButton text={word.japanese} size="lg" />

        <p className="text-xs text-gray-300 mt-3">Tap the word or speaker to hear it</p>
      </div>

      <div className="p-4 pb-8 flex gap-3">
        {currentIdx > 0 && (
          <button
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="w-14 py-4 bg-gray-100 text-gray-500 text-lg font-bold rounded-2xl
                       active:bg-gray-200 transition-all shrink-0"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <button
          onClick={() => {
            if (isLast) {
              onAnswer(true);
            } else {
              setCurrentIdx(currentIdx + 1);
            }
          }}
          className="flex-1 py-4 bg-primary text-white text-lg font-bold rounded-2xl
                     shadow-[0_4px_0_0_#B83A2A] active:shadow-none active:translate-y-1
                     transition-all duration-100"
        >
          {isLast ? 'Start Practice' : 'Next Word'}
        </button>
      </div>
    </div>
  );
}
