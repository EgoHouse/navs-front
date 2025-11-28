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
 * Hook para acceder a datos del usuario con loading
 */
const useUser = (): UseUserReturn => {
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
