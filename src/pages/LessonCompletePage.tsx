import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSessionStore } from '../store/useSessionStore';
import { useProgressStore } from '../store/useProgressStore';
import { getLessonById } from '../data/course';
import { playComplete, playIncorrect } from '../lib/sounds';

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { getScore, getStars, isFailed, mistakes, reset } = useSessionStore();
  const { completeLesson } = useProgressStore();
  const [saved, setSaved] = useState(false);

  const score = getScore();
  const stars = getStars();
  const failed = isFailed();
  const lesson = lessonId ? getLessonById(lessonId) : null;

  useEffect(() => {
    if (!lessonId || saved) return;

    if (failed) {
      playIncorrect();
    } else {
      playComplete();
      completeLesson({
        lessonId,
        completedAt: new Date().toISOString(),
        score,
        stars,
        mistakes,
      });
    }
    setSaved(true);
  }, [lessonId, saved]);

  const handleContinue = () => {
    reset();
    navigate('/journey');
  };

  const handleRetry = () => {
    reset();
    navigate(`/lesson/${lessonId}`);
  };

  if (failed) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl mb-6"
          >
            😔
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Not quite yet
          </h1>
          <p className="text-gray-500 mb-2">
            You need at least 50% to pass.
          </p>

          {lesson && (
            <p className="text-gray-400 text-sm mb-6">{lesson.title}</p>
          )}

          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-incorrect">{score}%</p>
              <p className="text-sm text-gray-400">Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-incorrect">{mistakes}</p>
              <p className="text-sm text-gray-400">Mistakes</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="w-full btn-primary"
            >
              Try Again
            </button>
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-gray-100 text-gray-500 text-lg font-bold rounded-2xl
                         active:bg-gray-200 transition-all"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm w-full"
      >
        {/* Stars */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: n <= stars ? 1 : 0.6, rotate: 0 }}
              transition={{ delay: n * 0.2, type: 'spring', stiffness: 200 }}
            >
              <svg
                width={n === 2 ? 64 : 48}
                height={n === 2 ? 64 : 48}
                viewBox="0 0 24 24"
                fill={n <= stars ? '#FFD700' : '#E5E5E5'}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          {stars === 3 ? 'Perfect!' : stars === 2 ? 'Great job!' : 'Lesson Complete!'}
        </motion.h1>

        {lesson && (
          <p className="text-gray-500 mb-6">{lesson.title}</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-8 mb-10"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{score}%</p>
            <p className="text-sm text-gray-400">Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-orange">+{score}</p>
            <p className="text-sm text-gray-400">XP</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-incorrect">{mistakes}</p>
            <p className="text-sm text-gray-400">Mistakes</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={handleContinue}
            className="w-full btn-primary"
          >
            Continue
          </button>
          {stars < 3 && (
            <button
              onClick={handleRetry}
              className="w-full py-4 bg-gray-100 text-gray-600 text-lg font-bold rounded-2xl
                         active:bg-gray-200 transition-all"
            >
              Try Again
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
