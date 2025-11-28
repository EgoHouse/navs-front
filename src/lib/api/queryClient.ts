/**
 * React Query Client Configuration
 *
 * Configuración centralizada del QueryClient para TanStack React Query
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos - datos se consideran frescos
      retry: 1, // Reintentar 1 vez en caso de error
      refetchOnWindowFocus: false, // No refetch al volver a la ventana
      refetchOnReconnect: true, // Refetch al reconectar
    },
    mutations: {
      retry: 0, // No reintentar mutations
    },
  },
});
