// Exportar todos los servicios
export { AuthService, default as authService } from './authService';
export { CatalogService, default as catalogService } from './catalogService';
export { orderService } from './orderService';

// Re-exportar utilidades de API
export { apiClient, tokenUtils, makeRequest, API_CONFIG } from '../utils/api';

// Tipos principales para facilitar el import
export type {
  User,
  Category,
  MenuItem,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiError
} from '../types';