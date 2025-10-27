import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireUser = false,
  redirectTo = '/'
}) => {
  const { isAuthenticated, user, isLoading } = useAuthWithServices();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Redirigir a auth si no está autenticado
  if (!isAuthenticated) {
    // Si requiere admin, ir a la página principal
    if (requireAdmin) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    // Si requiere usuario normal, ir a la página de auth con query param
    if (requireUser) {
      return <Navigate to="/auth?from=desayunos" state={{ from: location }} replace />;
    }
    // Por defecto, ir a donde se especifique
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar permisos de admin si es requerido
  if (requireAdmin && user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-white text-xl font-bold mb-4">Acceso Restringido</h2>
            <p className="text-gray-400 mb-6">
              Esta página requiere permisos de administrador.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verificar que tenga token de usuario si es requerido
  if (requireUser && !user) {
    return <Navigate to="/auth?from=desayunos" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * Hook para verificar permisos en componentes
 */
export const usePermissions = () => {
  const { isAuthenticated, user } = useAuthWithServices();
  
  return {
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
    user
  };
};

export default ProtectedRoute;