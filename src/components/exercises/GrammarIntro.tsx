import type { GrammarIntroExercise } from '../../data/types';
import { useUserStore } from '../../store/useUserStore';
import { getReading } from '../../data/readings';
import { SpeakButton } from '../common/SpeakButton';

interface Props {
  exercise: GrammarIntroExercise;
  onAnswer: (correct: boolean) => void;
}

export function GrammarIntro({ exercise, onAnswer }: Props) {
  const showRomaji = useUserStore((s) => s.showRomaji);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="flex flex-col justify-center min-h-full max-w-md mx-auto w-full py-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-accent-purple">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h2 className="font-jp text-2xl font-bold text-gray-800 text-center mb-4">
            {exercise.title}
          </h2>

          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            {exercise.explanation}
          </p>

          {/* Examples with audio */}
          <div className="space-y-3">
            {exercise.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl p-4 flex items-start gap-3"
              >
                <SpeakButton text={ex.japanese} size="sm" className="mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-jp text-lg font-medium text-gray-800">
                    {ex.japanese}
                  </span>
                  {showRomaji && getReading(ex.japanese) && (
                    <span className="text-xs text-gray-400">{getReading(ex.japanese)}</span>
                  )}
                  <span className="text-sm text-gray-500">{ex.english}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pb-8">
        <button
          onClick={() => onAnswer(true)}
          className="w-full py-4 bg-primary text-white text-lg font-bold rounded-2xl
                     shadow-[0_4px_0_0_#B83A2A] active:shadow-none active:translate-y-1
                     transition-all duration-100"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
