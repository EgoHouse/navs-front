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

const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);

  if (response.data.access_token) {
    tokenUtils.set(response.data.access_token);
  }

  return response.data;
};

const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/profile');
  return response.data;
};

const getUserDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>('/auth/user/dashboard');
  return response.data;
};

const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  const response = await apiClient.get<AdminUsersResponse>('/auth/admin/users');
  return response.data;
};

const logout = (): void => {
  tokenUtils.remove();
};

const isAuthenticated = (): boolean => {
  return tokenUtils.isValid();
};

const getToken = (): string | null => {
  return tokenUtils.get();
};

const isAdmin = async (): Promise<boolean> => {
  try {
    const user = await getProfile();
    return user.role === 'ADMIN';
  } catch {
    return false;
  }
};

const getCurrentUser = async (): Promise<User | null> => {
  if (!isAuthenticated()) {
    return null;
  }

  try {
    return await getProfile();
  } catch {
    logout();
    return null;
  }
};

const AuthService = {
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
