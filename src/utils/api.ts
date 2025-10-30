import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from '../types';

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  JWT_TOKEN_KEY: import.meta.env.VITE_JWT_TOKEN_KEY || 'ego_house_token',
  //TIMEOUT: import.meta.env.VITE_TIMEOUT || 10000,
} as const;

// Variable para acceder al store de Zustand desde fuera de React
let authStoreApi: any = null;

// Función para configurar el store (se llama desde el store)
export const setAuthStoreApi = (api: any) => {
  authStoreApi = api;
};

// Crear instancia de axios con configuración base
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    //timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para requests - agregar token automáticamente
  instance.interceptors.request.use(
    (config) => {
      // Obtener token del store de Zustand si está disponible
      let token = null;
      if (authStoreApi) {
        token = authStoreApi.getState().token;
      } else {
        // Fallback al localStorage
        token = localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para responses - manejo de errores
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Si el token ha expirado o es inválido (401), limpiar estado
      if (error.response?.status === 401) {
        // Limpiar localStorage
        localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);

        // Limpiar store de Zustand si está disponible
        if (authStoreApi) {
          authStoreApi.getState().logout();
        }
      }

      // Formatear error según la estructura de la API
      const apiError: ApiError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Error de conexión',
        error: error.response?.data?.error || 'Internal Server Error',
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Instancia principal de axios
export const apiClient: AxiosInstance = createAxiosInstance();

// Utilidades para manejo de tokens
export const tokenUtils = {
  get: (): string | null => {
    return localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);
  },

  set: (token: string): void => {
    localStorage.setItem(API_CONFIG.JWT_TOKEN_KEY, token);
  },

  remove: (): void => {
    localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);
  },

  isValid: (): boolean => {
    const token = tokenUtils.get();
    if (!token) return false;

    try {
      // Verificar si el token no ha expirado (decodificar JWT básico)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

// Tipos auxiliares para las respuestas
export interface ApiRequestConfig extends AxiosRequestConfig {}
export interface ApiResponse<T = any> extends AxiosResponse<T> {}

// Función helper para hacer requests con manejo de errores tipado
export const makeRequest = async <T>(
  requestFn: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
