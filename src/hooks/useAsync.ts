import { useState, useEffect, useCallback } from 'react';
import type { ApiError } from '../types';

// Estado para operaciones asíncronas
interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Hook genérico para manejar operaciones asíncronas
export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.message?.toString() || 'Error desconocido';
      setState({ data: null, isLoading: false, error: errorMessage });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const reset = () => {
    setState({ data: null, isLoading: false, error: null });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    execute,
    reset,
    clearError,
  };
};

// Hook para operaciones que no necesitan ejecutarse inmediatamente
export const useLazyAsync = <T>(asyncFunction: () => Promise<T>) => {
  return useAsync(asyncFunction, false);
};