import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/endpoints/auth.api';
import { useAuthStore } from '../../store/authStore';
import type { User } from '../../types/auth.types';

interface UseCurrentUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches the authenticated user from GET /auth/me.
 *
 * - Only runs when a token exists in the store (i.e. the user is logged in).
 * - Automatically updates the Zustand store when fresh data arrives.
 * - Designed to be mounted once at the app root (e.g. in a layout component).
 */
export function useCurrentUser(): UseCurrentUserReturn {
  const { token, user, setAuth, logout } = useAuthStore();

  const { isLoading, error, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const freshUser = await getCurrentUser();
      // Preserve existing tokens while updating user data
      if (token) setAuth(freshUser, token);
      return freshUser;
    },
    // Only fetch when a token is present
    enabled: !!token,
    // Keep data fresh but don't hammer the server
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    // On 401 / auth failure, clear the store so the user is logged out
    throwOnError: false,
  });

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  // If the query errored (e.g. 401), purge stale credentials
  if (error && !isLoading) {
    logout();
  }

  return {
    user,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch: handleRefetch,
  };
}
