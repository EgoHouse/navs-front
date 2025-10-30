// Re-exportar todos los tipos de la API
export * from './api';

// Re-exportar tipos de pedidos
export * from './order.types';

// Tipos adicionales para el frontend
export interface AppConfig {
  API_BASE_URL: string;
  JWT_TOKEN_KEY: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AuthState extends LoadingState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Re-importar User para usar en AuthState
import type { User } from './api';