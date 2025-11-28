/**
 * Auth Module - usePermissions Hook
 * Hook para verificar permisos del usuario
 */

import { useAuthStore } from '../store';
import type { Permissions } from '../types';

/**
 * Hook para obtener información sobre permisos del usuario actual
 * @returns Objeto con información de permisos
 *
 * @example
 * ```tsx
 * const { isAdmin, isUser, isAuthenticated, user } = usePermissions();
 *
 * return (
 *   <div>
 *     {isAdmin && <AdminMenu />}
 *     {isUser && <UserMenu />}
 *     {!isAuthenticated && <LoginButton />}
 *   </div>
 * );
 * ```
 */
export const usePermissions = (): Permissions => {
  const { isAuthenticated, user } = useAuthStore();

  return {
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
    user,
  };
};

export default usePermissions;
