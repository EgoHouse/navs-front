import { useAuthStore } from '../store';
import type { AuthStore } from '../types';

/**
 * Hook para acceder al estado completo de autenticación
 */
export const useAuth = (): AuthStore => {
  return useAuthStore();
};

export default useAuth;
