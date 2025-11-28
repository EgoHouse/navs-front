/**
 * Auth Module - Auth Provider
 * Provider que inicializa el estado de autenticación al cargar la app
 */

import { useEffect } from 'react';
import { initializeAuth } from '../store';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider de autenticación
 * Inicializa el estado de autenticación verificando el token almacenado
 *
 * @example
 * ```tsx
 * // En App.tsx o main.tsx
 * <AuthProvider>
 *   <Router>
 *     <App />
 *   </Router>
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    // Inicializar autenticación al montar el componente
    initializeAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
