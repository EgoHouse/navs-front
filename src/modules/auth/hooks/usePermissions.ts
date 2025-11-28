import { useAuthStore } from '../store';
import type { Permissions } from '../types';

/**
 * Hook para verificar permisos del usuario
 */
const usePermissions = (): Permissions => {
  const { isAuthenticated, user } = useAuthStore();

  return {
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
    user,
  };
};

export default usePermissions;
