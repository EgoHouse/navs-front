import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { AuthService } from '../services';
import type { LoginRequest, RegisterRequest } from '../types';

/**
 * Hook principal para autenticación que integra Zustand con los servicios
 */
export const useAuthWithServices = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: setLoginState,
    logout: clearAuthState,
    updateUser,
    clearError,
    setLoading,
    setError,
    updateActivity,
  } = useAuthStore();

  // Verificar autenticación al cargar
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Inicializando autenticación...');
        setLoading(true);
        clearError();

        const storedToken = AuthService.getToken();

        // Si no hay token, limpiar estado y terminar
        if (!storedToken) {
          clearAuthState();
          setLoading(false);
          return;
        }

        // Si hay token pero no está autenticado en el store, verificar con el servidor
        if (!isAuthenticated) {
          const currentUser = await AuthService.getCurrentUser();
          if (currentUser) {
            // Login con el usuario obtenido y el token existente
            setLoginState(currentUser, storedToken);
            updateActivity();
            console.log('Autenticación inicializada con token almacenado:', {
              email: currentUser.email,
              role: currentUser.role
            });
          } else {
            // Token inválido, limpiar estado
            console.log('Token inválido, limpiando estado');
            clearAuthState();
          }
        } else {
          // Ya está autenticado, solo actualizar actividad
          console.log('Usuario ya autenticado, actualizando actividad');
          updateActivity();
        }
      } catch (error: any) {
        console.error('Error inicializando autenticación:', error);
        setError('Error de autenticación');
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Solo ejecutar una vez al montar

  // Función de login
  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      clearError();

      const response = await AuthService.login(credentials);

      // Actualizar store con los datos de la respuesta
      setLoginState(response.user, response.access_token);
      updateActivity();

      return response; // Devolver la respuesta para uso posterior
    } catch (error: any) {
      setError(error.message || 'Error en el login');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoginState, setLoading, setError, clearError, updateActivity]);

  // Función de registro
  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      clearError();

      const response = await AuthService.register(userData);

      // Actualizar store con los datos de la respuesta
      setLoginState(response.user, response.access_token);
      updateActivity();
    } catch (error: any) {
      setError(error.message || 'Error en el registro');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoginState, setLoading, setError, clearError, updateActivity]);

  // Función de logout
  const logout = useCallback(() => {
    AuthService.logout();
    clearAuthState();
  }, [clearAuthState]);

  // Función para refrescar datos del usuario
  const refreshUser = useCallback(async () => {
    try {
      if (!isAuthenticated) return;

      setLoading(true);
      clearError();

      const currentUser = await AuthService.getProfile();
      updateUser(currentUser);
      updateActivity();
    } catch (error: any) {
      setError(error.message || 'Error al actualizar perfil');
      // Si el token es inválido, hacer logout
      if (error.statusCode === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, updateUser, setLoading, setError, clearError, updateActivity, logout]);

  // Función para actualizar actividad (útil para extender sesión)
  const trackActivity = useCallback(() => {
    if (isAuthenticated) {
      updateActivity();
    }
  }, [isAuthenticated, updateActivity]);

  return {
    // Estado
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Funciones
    login,
    register,
    logout,
    refreshUser,
    clearError,
    trackActivity,

    // Computed values
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
  };
};

export default useAuthWithServices;
