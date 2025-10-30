import { apiClient, makeRequest, tokenUtils } from '../utils/api';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  DashboardResponse,
  AdminUsersResponse
} from '../types';

/**
 * Servicio de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación y usuarios
 */
export class AuthService {
  
  /**
   * Registrar un nuevo usuario
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    return makeRequest(() => 
      apiClient.post<AuthResponse>('/auth/register', data)
    );
  }

  /**
   * Iniciar sesión
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await makeRequest(() => 
      apiClient.post<AuthResponse>('/auth/login', data)
    );
    
    // Guardar token automáticamente
    if (response.access_token) {
      tokenUtils.set(response.access_token);
    }
    
    return response;
  }

  /**
   * Obtener perfil del usuario actual (requiere autenticación)
   */
  static async getProfile(): Promise<User> {
    return makeRequest(() => 
      apiClient.get<User>('/auth/profile')
    );
  }

  /**
   * Obtener dashboard del usuario (requiere autenticación)
   */
  static async getUserDashboard(): Promise<DashboardResponse> {
    return makeRequest(() => 
      apiClient.get<DashboardResponse>('/auth/user/dashboard')
    );
  }

  /**
   * Obtener lista de usuarios (solo ADMIN)
   */
  static async getAdminUsers(): Promise<AdminUsersResponse> {
    return makeRequest(() => 
      apiClient.get<AdminUsersResponse>('/auth/admin/users')
    );
  }

  /**
   * Cerrar sesión
   */
  static logout(): void {
    tokenUtils.remove();
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    return tokenUtils.isValid();
  }

  /**
   * Obtener token actual
   */
  static getToken(): string | null {
    return tokenUtils.get();
  }

  /**
   * Verificar si el usuario tiene rol de administrador
   */
  static async isAdmin(): Promise<boolean> {
    try {
      const user = await this.getProfile();
      return user.role === 'ADMIN';
    } catch {
      return false;
    }
  }

  /**
   * Verificar estado de autenticación y obtener usuario
   */
  static async getCurrentUser(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      return await this.getProfile();
    } catch {
      // Si falla la verificación, limpiar token
      this.logout();
      return null;
    }
  }
}

// Exportar instancia por defecto
export default AuthService;