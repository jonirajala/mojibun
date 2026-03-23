import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    if (!supabase || get().initialized) return;

    // Listen for auth changes FIRST (catches magic link callback)
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('[auth] state change:', event, session?.user?.email);
      set({ user: session?.user ?? null, initialized: true });
    });

    // Handle magic link / PKCE code in URL
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));

    if (params.get('code') || hashParams.get('access_token')) {
      // Supabase will handle this via onAuthStateChange
      // But for PKCE flow, we need to explicitly exchange the code
      if (params.get('code')) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(params.get('code')!);
        if (error) {
          console.error('[auth] code exchange error:', error);
        } else {
          set({ user: data.session?.user ?? null, initialized: true });
          // Clean up URL
          window.history.replaceState({}, '', window.location.pathname);
        }
        return;
      }
    }

    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    console.log('[auth] existing session:', session?.user?.email ?? 'none');
    set({ user: session?.user ?? null, initialized: true });
  },

  signInWithMagicLink: async (email: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    set({ loading: true });
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    set({ loading: false });
    return { error: error?.message ?? null };
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
