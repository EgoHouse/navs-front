import { useAuthStore } from '../store';

/**
 * Hook para verificar si el usuario actual es administrador
 */
const useIsAdmin = (): boolean => {
  const user = useAuthStore((state) => state.user);
  return user?.role === 'ADMIN';
};

export default useIsAdmin;
