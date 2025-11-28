/**
 * Common types used across the application
 */

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  phoneNumber: string;
  address?: string;
  role?: 'USER' | 'ADMIN';
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type AsyncState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};
