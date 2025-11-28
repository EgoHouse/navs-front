/**
 * Auth Module - Type Definitions
 * Tipos relacionados con autenticación y usuarios
 */

// ===== USER TYPES =====

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

// ===== AUTH REQUEST TYPES =====

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address?: string;
  role?: UserRole;
}

// ===== AUTH RESPONSE TYPES =====

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface DashboardResponse {
  message: string;
  user: User;
  dashboardData: string;
}

export interface AdminUsersResponse {
  message: string;
  requestedBy: User;
  data: string;
}

// ===== AUTH STATE TYPES =====

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export type AuthStore = AuthState & AuthActions;

// ===== PERMISSION TYPES =====

export interface Permissions {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  user: User | null;
}
