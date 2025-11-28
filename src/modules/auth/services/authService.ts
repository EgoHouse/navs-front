/**
 * Auth Module - Auth Service
 * Servicio para todas las operaciones relacionadas con autenticación
 */

import { apiClient } from '@lib/api/apiClient';
import { tokenUtils } from '../utils';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  DashboardResponse,
  AdminUsersResponse,
} from '../types';

/**
 * Registrar un nuevo usuario
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

/**
 * Iniciar sesión
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);

  // Guardar token automáticamente
  if (response.data.access_token) {
    tokenUtils.set(response.data.access_token);
  }

  return response.data;
};

/**
 * Obtener perfil del usuario actual (requiere autenticación)
 */
export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/profile');
  return response.data;
};

/**
 * Obtener dashboard del usuario (requiere autenticación)
 */
export const getUserDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>(
    '/auth/user/dashboard'
  );
  return response.data;
};

/**
 * Obtener lista de usuarios (solo ADMIN)
 */
export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  const response = await apiClient.get<AdminUsersResponse>(
    '/auth/admin/users'
  );
  return response.data;
};

/**
 * Cerrar sesión
 */
export const logout = (): void => {
  tokenUtils.remove();
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  return tokenUtils.isValid();
};

/**
 * Obtener token actual
 */
export const getToken = (): string | null => {
  return tokenUtils.get();
};

/**
 * Verificar si el usuario tiene rol de administrador
 */
export const isAdmin = async (): Promise<boolean> => {
  try {
    const user = await getProfile();
    return user.role === 'ADMIN';
  } catch {
    return false;
  }
};

/**
 * Verificar estado de autenticación y obtener usuario
 */
export const getCurrentUser = async (): Promise<User | null> => {
  if (!isAuthenticated()) {
    return null;
  }

  try {
    return await getProfile();
  } catch {
    // Si falla la verificación, limpiar token
    logout();
    return null;
  }
};

/**
 * Servicio de autenticación agrupado (para compatibilidad)
 */
export const AuthService = {
  register,
  login,
  getProfile,
  getUserDashboard,
  getAdminUsers,
  logout,
  isAuthenticated,
  getToken,
  isAdmin,
  getCurrentUser,
};

export default AuthService;
