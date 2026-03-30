// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  username: string;
  email?: string;
  wallet_address: string;
  is_active?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface WalletBalance {
  wallet_address: string;
  balance_xlm: string;
  has_funds: boolean;
  horizon_available: boolean;
}

// ─── Token Response (login / register / google callback) ──────────────────────

export interface AuthTokenResponse {
  access: string;
  refresh: string;
  user: User;
}

// ─── Refresh Token Response ────────────────────────────────────────────────────

export interface RefreshTokenResponse {
  access: string;
}

// ─── Request Payloads ─────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refresh: string;
}

// ─── Google OAuth callback query params ───────────────────────────────────────

export interface GoogleCallbackParams {
  code: string;
  state: string;
}
