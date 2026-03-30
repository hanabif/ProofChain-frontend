import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/endpoints/auth.api';
import { useAuthStore } from '../../store/authStore';
import { parseError } from '../../utils/errorHandler';
import type { LoginPayload } from '../../types/auth.types';

interface UseLoginReturn {
  loginUser: (payload: LoginPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Encapsulates the email/password login flow:
 *  1. POST /auth/login
 *  2. Stores access + refresh tokens and user in Zustand (+ localStorage)
 *  3. Navigates to /dashboard on success
 */
export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const loginUser = async (payload: LoginPayload): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { access, refresh, user } = await login(payload);
      setAuth(user, access, refresh);
      
      // Handle redirection after login
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirect') || '/dashboard';
      navigate(redirectTo);
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
}
