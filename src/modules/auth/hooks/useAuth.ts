import { useAuthStore } from '../store';
import type { AuthStore } from '../types';

/**
 * Hook para acceder al estado de autenticación
 */
const useAuth = (): AuthStore => {
  return useAuthStore();
};

export default useAuth;
