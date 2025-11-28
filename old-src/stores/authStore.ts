import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';
import { setAuthStoreApi, API_CONFIG } from '../utils/api';

export interface AuthState {
  // Estado de autenticación
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  
  // Acciones compuestas
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  clearError: () => void;
  
  // Estado de UI
  lastActivity: number;
  updateActivity: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false, // Iniciar como false, se establecerá a true solo durante verificaciones
      error: null,
      lastActivity: Date.now(),

      // Acciones básicas
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      // Acciones compuestas
      login: (user, token) => {
        // Sincronizar con localStorage primero
        localStorage.setItem(API_CONFIG.JWT_TOKEN_KEY, token);
        console.log('Token almacenado en localStorage:', token);
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          lastActivity: Date.now()
        });
        
        console.log('Estado de autenticación actualizado:', { user: user.email, isAuthenticated: true });
      },

      logout: () => {
        // Limpiar localStorage
        localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);
        console.log('Token removido del localStorage');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        
        console.log('Estado de autenticación limpiado');
      },

      updateUser: (user) => {
        set({ user, lastActivity: Date.now() });
      },

      clearError: () => {
        set({ error: null });
      },

      updateActivity: () => {
        set({ lastActivity: Date.now() });
      },
    }),
    {
      name: 'ego-house-auth', // Nombre único para el storage
      storage: createJSONStorage(() => localStorage), // Usar localStorage
      
      // Configurar qué persistir y qué no
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        lastActivity: state.lastActivity,
        // No persistir loading states ni errores
      }),
      
      // Configurar cuando hidratar el estado
      onRehydrateStorage: () => (state) => {
        console.log('Hidratando estado de autenticación...');
        
        // Cuando se hidrata, verificar si la sesión es válida
        if (state) {
          const now = Date.now();
          const lastActivity = state.lastActivity || 0;
          const maxInactivity = 7 * 24 * 60 * 60 * 1000; // 7 días en ms
          
          // Si ha pasado mucho tiempo, limpiar la sesión
          if (now - lastActivity > maxInactivity) {
            console.log('Sesión expirada por inactividad');
            state.logout();
          } else if (state.token && state.user) {
            // Si hay token y usuario, mantener el estado autenticado
            state.updateActivity();
            console.log('Estado de autenticación hidratado correctamente:', {
              email: state.user.email,
              role: state.user.role,
              isAuthenticated: state.isAuthenticated
            });
            
            // Sincronizar el token en localStorage si no existe
            const storedToken = localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);
            if (!storedToken && state.token) {
              localStorage.setItem(API_CONFIG.JWT_TOKEN_KEY, state.token);
              console.log('Token sincronizado en localStorage');
            }
          } else {
            console.log('No hay datos de sesión para hidratar');
          }
          
          // Siempre asegurar que loading esté en false después de hidratar
          state.setLoading(false);
        }
      },
      
      // Versión para manejar migraciones futuras
      version: 1,
    }
  )
);

// Configurar la API para acceder al store
setAuthStoreApi(useAuthStore);

// Selector hooks para mejor performance
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// Hook combinado para datos de autenticación
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    setLoading,
    setError,
    updateActivity,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    setLoading,
    setError,
    updateActivity,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
  };
};

// Hook para acciones de autenticación con servicios
export const useAuthActions = () => {
  const store = useAuthStore();
  
  return {
    login: store.login,
    logout: store.logout,
    updateUser: store.updateUser,
    clearError: store.clearError,
    setLoading: store.setLoading,
    setError: store.setError,
    updateActivity: store.updateActivity,
  };
};

export default useAuthStore;