import axios, { type AxiosInstance, type AxiosError } from 'axios';

import { API_CONFIG } from '@lib/utils/constants';
import { logger } from '@lib/utils/logger';

/**
 * Axios client instance with default configuration
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Request interceptor
 * Adds auth token to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug('API Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
    });

    return config;
  },
  (error: AxiosError) => {
    logger.error('Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    logger.debug('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error: AxiosError) => {
    logger.error('Response Error:', error);

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Limpiar localStorage
      localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);

      // Importar dinámicamente el store para evitar dependencias circulares
      const { useAuthStore } = await import('@modules/auth/store');
      const logout = useAuthStore.getState().logout;

      // Hacer logout en el store
      logout();

      // Redirigir a la página de login
      // Solo redirigir si no estamos ya en una página de auth
      if (!window.location.pathname.includes('/auth') && !window.location.pathname.includes('/admin')) {
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

/**
 * API Error type
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

/**
 * Extract error message from Axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      'An error occurred'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
};
