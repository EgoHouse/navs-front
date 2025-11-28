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

  // Redirigir a auth si no está autenticado
  if (!isAuthenticated) {
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

  // Verificar permisos de admin si es requerido
  if (requireAdmin && user?.role !== 'ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-2xl border border-gray-700/50 bg-gray-900/80 p-8 backdrop-blur-lg">
            <h2 className="mb-4 text-xl font-bold text-white">
              Acceso Restringido
            </h2>
            <p className="mb-6 text-gray-400">
              Esta página requiere permisos de administrador.
            </p>
            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-accent px-6 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
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
    return <Navigate to={ROUTES.AUTH.USER} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
