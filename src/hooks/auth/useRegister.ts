import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/endpoints/auth.api';
import { parseError } from '../../utils/errorHandler';
import type { RegisterPayload } from '../../types/auth.types';

interface UseRegisterReturn {
  registerUser: (payload: RegisterPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Encapsulates the email/password registration flow:
 *  1. POST /auth/register
 *  2. Navigates to /login on success
 */
export function useRegister(): UseRegisterReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const registerUser = async (payload: RegisterPayload): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await register(payload);
      navigate('/login');
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
}
