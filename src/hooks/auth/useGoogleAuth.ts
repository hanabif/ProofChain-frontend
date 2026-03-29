import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGoogleLoginUrl, googleCallback } from '../../api/endpoints/auth.api';
import { useAuthStore } from '../../store/authStore';
import { parseError } from '../../utils/errorHandler';

interface UseGoogleAuthReturn {
  /** Redirect the browser to Google's consent page */
  initiateGoogleLogin: () => void;
  /** True while the callback is being processed */
  loading: boolean;
  error: string | null;
}

/**
 * Handles the full Google OAuth flow:
 *
 *  Step 1 – `initiateGoogleLogin()`
 *    Redirects the browser to GET /auth/google/login (backend issues 302 → Google).
 *
 *  Step 2 – Callback (automatic, triggered by URL params)
 *    When Google redirects back to /auth/google/callback?code=…&state=…,
 *    this hook reads `code` and `state` from the URL, exchanges them for JWT
 *    tokens via GET /auth/google/callback, then navigates to /dashboard.
 *
 * Mount this hook on the GoogleCallback route component so Step 2 fires
 * automatically when the component renders.
 */
export function useGoogleAuth(): UseGoogleAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ── Step 1 ─────────────────────────────────────────────────────────────────
  const initiateGoogleLogin = (): void => {
    window.location.href = getGoogleLoginUrl();
  };

  // ── Step 2 ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Only execute when both OAuth params are present in the URL
    if (!code || !state) return;

    const handleCallback = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const { access, refresh, user } = await googleCallback({ code, state });
        setAuth(user, access, refresh);
        navigate('/dashboard');
      } catch (err) {
        setError(parseError(err));
        setLoading(false);
      }
    };

    void handleCallback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount (callback page render)

  return { initiateGoogleLogin, loading, error };
}
