import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types/auth.types';

// ─── State Shape ──────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  token: string | null;      // access token (also mirrored in localStorage["token"])
  refreshToken: string | null;
  loading: boolean;

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      loading: false,

      setAuth: (user, accessToken, refreshToken) => {
        // Keep localStorage["token"] in sync so the Axios interceptor picks it up
        localStorage.setItem('token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

        set({ user, token: accessToken, refreshToken: refreshToken ?? null });
      },

      setLoading: (loading) => set({ loading }),

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        set({ user: null, token: null, refreshToken: null });
      },
    }),
    {
      name: 'proofchain-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist user + tokens; loading is always false on hydration
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
