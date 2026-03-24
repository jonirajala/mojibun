import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';
import { Logo } from '../components/common/Logo';
import { isSupabaseConfigured } from '../lib/supabase';
import { AuthModal } from '../components/auth/AuthModal';

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const { setName: storeName, completeOnboarding } = useUserStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const handleGuest = () => setStep(1);

  const handleBegin = () => {
    if (!name.trim()) return;
    storeName(name.trim());
    completeOnboarding();
    navigate('/journey');
  };

  // If user just signed in via magic link, go straight to name entry
  // (mergeAndSync in App.tsx will have pulled any existing progress)
  if (user && step === 0) {
    setStep(1);
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface px-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-sm w-full"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex justify-center mb-4">
                <Logo size={120} />
              </div>
              <h1 className="font-jp text-4xl font-bold text-gray-800">
                文字文
              </h1>
              <p className="text-base text-primary font-semibold tracking-wide">mojibun</p>
              <span className="text-xs text-gray-300 mt-1 inline-block">v0.1</span>
            </motion.div>

            <p className="text-gray-500 mb-10 leading-relaxed">
              Learn Japanese, step by step.
              <br />
              <span className="text-sm text-gray-400">Free forever.</span>
            </p>

            <div className="flex flex-col gap-3">
              {isSupabaseConfigured() && (
                <>
                  <button
                    onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
                    className="w-full btn-primary"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => { setShowAuth(true); setAuthMode('signin'); }}
                    className="w-full py-4 bg-white border-2 border-primary text-primary text-lg font-bold rounded-2xl active:bg-primary/5 transition-all"
                  >
                    Sign In
                  </button>
                </>
              )}
              <button
                onClick={handleGuest}
                className={isSupabaseConfigured()
                  ? 'w-full py-4 bg-gray-100 text-gray-600 text-lg font-bold rounded-2xl active:bg-gray-200 transition-all'
                  : 'w-full btn-primary'
                }
              >
                {isSupabaseConfigured() ? 'Continue as Guest' : 'Get Started'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-sm w-full"
          >
            <div className="text-5xl mb-6">👋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What should we call you?
            </h2>
            <p className="text-gray-500 mb-8">
              We assume you already know hiragana & katakana.
              <br />
              Let's build your vocabulary and grammar!
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBegin()}
              placeholder="Your name"
              className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl
                         focus:border-primary focus:outline-none text-center mb-6"
              autoFocus
            />
            <button
              onClick={handleBegin}
              disabled={!name.trim()}
              className="w-full btn-primary"
            >
              Start Learning
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode={authMode} />}
    </div>
  );
}
