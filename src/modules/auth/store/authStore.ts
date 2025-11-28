import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import AuthService from '../services/authService';
import type { AuthStore, LoginRequest, RegisterRequest } from '../types';

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: true,
      error: null,

      setLoading: (isLoading: boolean) => {
        set({ isLoading }, false, 'auth/setLoading');
      },

      setError: (error: string | null) => {
        set({ error }, false, 'auth/setError');
      },

      clearError: () => {
        set({ error: null }, false, 'auth/clearError');
      },
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true, error: null }, false, 'auth/login/start');

          const response = await AuthService.login(credentials);

          set(
            {
              user: response.user,
              isAuthenticated: true,
              token: response.access_token,
              isLoading: false,
              error: null,
            },
            false,
            'auth/login/success'
          );
        } catch (error: any) {
          const errorMessage = error.message || 'Error en el login';

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            'auth/login/error'
          );

          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null }, false, 'auth/register/start');

          const response = await AuthService.register(userData);

          set(
            {
              user: response.user,
              isAuthenticated: true,
              token: response.access_token,
              isLoading: false,
              error: null,
            },
            false,
            'auth/register/success'
          );
        } catch (error: any) {
          const errorMessage = error.message || 'Error en el registro';

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            'auth/register/error'
          );

          throw error;
        }
      },

      logout: () => {
        AuthService.logout();

        set(
          {
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
            error: null,
          },
          false,
          'auth/logout'
        );
      },

      refreshUser: async () => {
        try {
          const { isAuthenticated } = get();

          if (!isAuthenticated) {
            return;
          }

          set({ isLoading: true, error: null }, false, 'auth/refresh/start');

          const user = await AuthService.getProfile();

          set(
            {
              user,
              isLoading: false,
              error: null,
            },
            false,
            'auth/refresh/success'
          );
        } catch (error: any) {
          const errorMessage = error.message || 'Error al actualizar perfil';

          set(
            {
              isLoading: false,
              error: errorMessage,
            },
            false,
            'auth/refresh/error'
          );

          // Si el token es inválido (401), hacer logout
          if (error.statusCode === 401) {
            get().logout();
          }
        }
      },
    }),
    {
      name: 'auth-store',
      enabled: import.meta.env.DEV,
    }
  )
);

export const initializeAuth = async () => {
  const store = useAuthStore.getState();

  try {
    store.setLoading(true);

    const token = AuthService.getToken();
    if (!token || !AuthService.isAuthenticated()) {
      store.setLoading(false);
      return;
    }

    const user = await AuthService.getCurrentUser();
    if (user) {
      useAuthStore.setState({
        user,
        isAuthenticated: true,
        token,
        isLoading: false,
        error: null,
      });
    } else {
      store.setLoading(false);
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
    store.setLoading(false);
  }
};
