import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, type ScriptMode } from '../store/useUserStore';
import { useProgressStore } from '../store/useProgressStore';
import { useAuthStore } from '../store/useAuthStore';
import { AccountSection } from '../components/auth/AccountSection';
import { clearSupabaseProgress } from '../lib/syncProgress';
import { AboutModal } from '../components/common/AboutModal';

export function SettingsPage() {
  const navigate = useNavigate();
  const { name, showRomaji, toggleRomaji, scriptMode, setScriptMode } = useUserStore();
  const { completedLessons, totalXp, reset: resetProgress } = useProgressStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const completedCount = Object.keys(completedLessons).length;

  return (
    <div className="min-h-dvh bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/journey')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Profile</h2>
          <div className="bg-surface rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{name}</p>
                <p className="text-sm text-gray-400">Japanese Learner</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-accent-orange">{totalXp}</p>
              <p className="text-sm text-gray-400">Total XP</p>
            </div>
            <div className="bg-surface rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-primary">{completedCount}</p>
              <p className="text-sm text-gray-400">Lessons Done</p>
            </div>
          </div>
        </section>

        {/* Account */}
        <AccountSection />

        {/* Reading Aid */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Reading Aid</h2>
          <div className="bg-surface rounded-2xl p-4 space-y-5">
            {/* Script mode */}
            <div>
              <p className="font-bold text-gray-800 mb-1">Kanji Display</p>
              <p className="text-sm text-gray-400 mb-3">How to show words that have kanji forms</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { mode: 'kana' as ScriptMode, label: 'Kana Only', example: 'がくせい' },
                  { mode: 'kanji_furigana' as ScriptMode, label: 'Kanji + Furigana', example: '学生' },
                  { mode: 'kanji' as ScriptMode, label: 'Kanji Only', example: '学生' },
                ]).map(({ mode, label, example }) => (
                  <button
                    key={mode}
                    onClick={() => setScriptMode(mode)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      scriptMode === mode
                        ? 'border-accent-blue bg-accent-blue/5'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className="font-jp text-lg block">{example}</span>
                    {mode === 'kanji_furigana' && (
                      <span className="text-[10px] text-gray-400 block -mt-0.5">がくせい</span>
                    )}
                    <span className="text-xs text-gray-500 mt-1 block">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Romaji toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">Show Romaji</p>
                <p className="text-sm text-gray-400">Display romanized readings below Japanese text</p>
              </div>
              <button
                onClick={toggleRomaji}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  showRomaji ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    showRomaji ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Data</h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full p-4 bg-incorrect/5 border-2 border-incorrect/20 rounded-2xl text-incorrect font-bold text-left"
            >
              Reset All Progress
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">About</h2>
          <div className="bg-surface rounded-2xl p-4 space-y-4">
            <div>
              <p className="font-bold text-gray-800">Mojibun v0.1</p>
              <p className="text-sm text-gray-500 mt-1">
                Many language apps are expensive. With modern LLMs, making a learning app is
                not hard anymore. Learning should be free, so this app exists.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                The course still needs a lot of work, and all feedback is appreciated.
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Open source:{' '}
                <a
                  href="https://github.com/jonirajala/mojibun"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-semibold underline underline-offset-2"
                >
                  github.com/jonirajala/mojibun
                </a>
              </p>
              <p>
                Questions:{' '}
                <a
                  href="mailto:joni.m.rajala@gmail.com"
                  className="text-primary font-semibold underline underline-offset-2"
                >
                  joni.m.rajala@gmail.com
                </a>
              </p>
            </div>

            <button
              onClick={() => setShowAbout(true)}
              className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl"
            >
              Read More
            </button>
          </div>
        </section>

        {/* About */}
        <section className="text-center pt-4">
          <p className="font-jp text-lg text-gray-300">やっぱり v 0.1</p>
          <p className="text-sm text-gray-300">Free Japanese learning for everyone</p>
        </section>
      </div>

      {/* Reset confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reset progress?</h3>
            <p className="text-gray-500 mb-6">
              This will delete all your lesson progress and XP. This cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  resetProgress();
                  const authUser = useAuthStore.getState().user;
                  if (authUser) clearSupabaseProgress(authUser.id);
                  setShowResetConfirm(false);
                }}
                className="w-full py-3 bg-incorrect text-white font-bold rounded-2xl"
              >
                Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
