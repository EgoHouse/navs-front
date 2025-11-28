import { useState, useCallback } from 'react';

import type { AsyncState } from '@lib/types/common.types';

/**
 * Generic hook for handling async operations
 */
export const useAsync = <T, Args extends any[] = []>(
  asyncFn: (...args: Args) => Promise<T>
) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ data: null, error: null, isLoading: true });

      try {
        const data = await asyncFn(...args);
        setState({ data, error: null, isLoading: false });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An error occurred';
        setState({ data: null, error: errorMessage, isLoading: false });
        throw error;
      }
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
