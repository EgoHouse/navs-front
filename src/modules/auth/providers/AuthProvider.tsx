import { useEffect } from 'react';
import { initializeAuth } from '../store';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider que inicializa el estado de autenticación
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
