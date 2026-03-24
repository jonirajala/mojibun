import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useUserStore } from './store/useUserStore';
import { useAuthStore } from './store/useAuthStore';
import { useProgressStore } from './store/useProgressStore';
import { OnboardingPage } from './pages/OnboardingPage';
import { JourneyPage } from './pages/JourneyPage';
import { LessonPage } from './pages/LessonPage';
import { LessonCompletePage } from './pages/LessonCompletePage';
import { SettingsPage } from './pages/SettingsPage';
import { mergeAndSync, syncProgressToSupabase, syncSettingsToSupabase } from './lib/syncProgress';

function App() {
  const hasCompletedOnboarding = useUserStore((s) => s.hasCompletedOnboarding);
  const user = useAuthStore((s) => s.user);
  const prevUserId = useRef<string | null>(null);

  // Initialize auth on mount
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  // Sync on sign-in
  useEffect(() => {
    if (user && user.id !== prevUserId.current) {
      prevUserId.current = user.id;
      mergeAndSync(user.id);
    }
    if (!user) {
      prevUserId.current = null;
    }
  }, [user]);

  // Subscribe to stores — sync changes to Supabase when authenticated
  useEffect(() => {
    const unsubProgress = useProgressStore.subscribe((state, prevState) => {
      const authUser = useAuthStore.getState().user;
      if (!authUser) return;
      if (state.completedLessons !== prevState.completedLessons) {
        syncProgressToSupabase(authUser.id);
      }
    });

    const unsubSettings = useUserStore.subscribe((state, prevState) => {
      const authUser = useAuthStore.getState().user;
      if (!authUser) return;
      if (
        state.name !== prevState.name ||
        state.showRomaji !== prevState.showRomaji ||
        state.scriptMode !== prevState.scriptMode
      ) {
        syncSettingsToSupabase(authUser.id);
      }
    });

    return () => {
      unsubProgress();
      unsubSettings();
    };
  }, []);

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={
              hasCompletedOnboarding ? (
                <Navigate to="/journey" replace />
              ) : (
                <OnboardingPage />
              )
            }
          />
          <Route
            path="/journey"
            element={
              hasCompletedOnboarding ? (
                <JourneyPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/lesson/:lessonId/complete" element={<LessonCompletePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Analytics />
      </>
    </BrowserRouter>
  );
}

export default App;
