import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthService } from '../services';
import type { LoginRequest, RegisterRequest, AuthState } from '../types';

// Definir el contexto
interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
    isLoading: true,
    error: null,
  });

  // Función para actualizar el estado de forma segura
  const updateState = (updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      try {
        updateState({ isLoading: true, error: null });

        const token = AuthService.getToken();
        if (!token || !AuthService.isAuthenticated()) {
          updateState({ 
            isLoading: false, 
            isAuthenticated: false, 
            user: null, 
            token: null 
          });
          return;
        }

        // Verificar token con el servidor
        const user = await AuthService.getCurrentUser();
        if (user) {
          updateState({
            user,
            isAuthenticated: true,
            token,
            isLoading: false,
            error: null,
          });
        } else {
          // Token inválido, limpiar estado
          updateState({
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        updateState({
          user: null,
          isAuthenticated: false,
          token: null,
          isLoading: false,
          error: 'Error de autenticación',
        });
      }
    };

    initAuth();
  }, []);

  // Función de login
  const login = async (credentials: LoginRequest) => {
    try {
      updateState({ isLoading: true, error: null });

      const response = await AuthService.login(credentials);
      
      updateState({
        user: response.user,
        isAuthenticated: true,
        token: response.access_token,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'Error en el login',
      });
      throw error;
    }
  };

  // Función de registro
  const register = async (userData: RegisterRequest) => {
    try {
      updateState({ isLoading: true, error: null });

      const response = await AuthService.register(userData);
      
      updateState({
        user: response.user,
        isAuthenticated: true,
        token: response.access_token,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'Error en el registro',
      });
      throw error;
    }
  };

  // Función de logout
  const logout = () => {
    AuthService.logout();
    updateState({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  // Función para refrescar datos del usuario
  const refreshUser = async () => {
    try {
      if (!state.isAuthenticated) return;

      updateState({ isLoading: true, error: null });
      
      const user = await AuthService.getProfile();
      updateState({
        user,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'Error al actualizar perfil',
      });
      // Si el token es inválido, hacer logout
      if (error.statusCode === 401) {
        logout();
      }
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    updateState({ error: null });
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Hook para verificar si es admin
export const useIsAdmin = (): boolean => {
  const { user } = useAuth();
  return user?.role === 'ADMIN';
};

// Hook para datos de usuario con loading
export const useUser = () => {
  const { user, isLoading, error, refreshUser } = useAuth();
  
  return {
    user,
    isLoading,
    error,
    refreshUser,
    isAdmin: user?.role === 'ADMIN',
  };
};

export default AuthContext;