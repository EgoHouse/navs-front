/**
 * Auth Module - useUser Hook
 * Hook para acceder a datos del usuario con loading state
 */

import { useAuthStore } from '../store';
import type { User } from '../types';

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
}

/**
 * Hook para acceder a datos del usuario con estado de carga
 * @returns Información del usuario con estado de loading y error
 *
 * @example
 * ```tsx
 * const { user, isLoading, error, refreshUser, isAdmin } = useUser();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * if (!user) return <Login />;
 *
 * return <UserProfile user={user} isAdmin={isAdmin} />;
 * ```
 */
export const useUser = (): UseUserReturn => {
  const { user, isLoading, error, refreshUser } = useAuthStore();

  return {
    user,
    isLoading,
    error,
    refreshUser,
    isAdmin: user?.role === 'ADMIN',
  };
};

export default useUser;
