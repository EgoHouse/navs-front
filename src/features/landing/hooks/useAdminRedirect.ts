import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@modules/auth/hooks/useAuth';

/**
 * Hook para redirigir usuarios admin al dashboard
 */
const useAdminRedirect = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      navigate('/admin/tables', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);
};

export default useAdminRedirect;
