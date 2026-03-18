import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useAuth from '@modules/auth/hooks/useAuth';
import { ROUTES } from '@lib/utils/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 */
const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireUser = false,
  redirectTo = ROUTES.HOME,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-accent" />
          <p className="text-lg text-white">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Redirigir a auth si no está autenticado o no tiene permisos
  if (!isAuthenticated || (requireAdmin && user?.role !== 'ADMIN')) {
    // Si requiere admin, ir a la página de auth de admin
    if (requireAdmin) {
      return <Navigate to={ROUTES.AUTH.ADMIN} state={{ from: location }} replace />;
    }
    // Si requiere usuario normal, ir a la página de auth de usuarios
    if (requireUser) {
      return <Navigate to={ROUTES.AUTH.USER} state={{ from: location }} replace />;
    }
    // Por defecto
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar que tenga token de usuario si es requerido
  if (requireUser && !user) {
    return <Navigate to={ROUTES.AUTH.USER} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
