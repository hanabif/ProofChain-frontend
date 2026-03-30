import { api } from '../client';
import type {
  AuthTokenResponse,
  LoginPayload,
  RegisterPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
  GoogleCallbackParams,
  User,
} from '../../types/auth.types';

// ─── Login ────────────────────────────────────────────────────────────────────

export const login = (payload: LoginPayload): Promise<AuthTokenResponse> =>
  api.post<AuthTokenResponse>('/auth/login', payload).then((r) => r.data);

// ─── Register ─────────────────────────────────────────────────────────────────

export const register = (payload: RegisterPayload): Promise<AuthTokenResponse> =>
  api.post<AuthTokenResponse>('/auth/register', payload).then((r) => r.data);

// ─── Get Current User ─────────────────────────────────────────────────────────

export const getCurrentUser = (): Promise<User> =>
  api.get<User>('/auth/me').then((r) => r.data);

// ─── Refresh Token ────────────────────────────────────────────────────────────

export const refreshToken = (payload: RefreshTokenPayload): Promise<RefreshTokenResponse> =>
  api.post<RefreshTokenResponse>('/auth/token/refresh', payload).then((r) => r.data);

// ─── Google OAuth ─────────────────────────────────────────────────────────────

/**
 * Returns the Google consent-page URL.
 * The backend issues a 302 redirect; we expose the full URL so the
 * caller can do `window.location.href = googleLoginUrl()`.
 */
export const getGoogleLoginUrl = (): string =>
  `${api.defaults.baseURL}/auth/google/login`;

/**
 * Exchange the OAuth authorisation code + state for JWT tokens.
 * Called from the /auth/google/callback route after Google redirects back.
 */
export const googleCallback = (params: GoogleCallbackParams): Promise<AuthTokenResponse> =>
  api
    .get<AuthTokenResponse>('/auth/google/callback', { params })
    .then((r) => r.data);

// ─── Wallet Balance ───────────────────────────────────────────────────────────

export const getWalletBalance = (): Promise<import('../../types/auth.types').WalletBalance> =>
  api.get<import('../../types/auth.types').WalletBalance>('/auth/wallet/balance').then((r) => r.data);
