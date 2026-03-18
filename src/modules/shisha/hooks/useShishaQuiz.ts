import { useState, useCallback } from 'react';
import type { QuizState, FlavorSelection } from '../types';
import { INITIAL_QUIZ_STATE, MAX_FLAVORS } from '../constants';

export interface UseShishaQuizReturn {
  quizState: QuizState;
  selectTobacco: (tobacco: string) => void;
  addFlavor: (flavor: FlavorSelection) => void;
  getCurrentFlavorStep: () => number;
  isMainFlavorStep: () => boolean;
  resetQuiz: () => void;
}

/**
 * Hook to manage shisha quiz state and actions
 */
export const useShishaQuiz = (): UseShishaQuizReturn => {
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);

  const selectTobacco = useCallback((tobacco: string) => {
    setQuizState((prev) => ({
      ...prev,
      tobaccoType: tobacco,
      currentStep: 1,
    }));
  }, []);

  const addFlavor = useCallback((flavor: FlavorSelection) => {
    setQuizState((prev) => ({
      ...prev,
      flavors: [...prev.flavors, flavor],
      currentStep:
        prev.flavors.length >= MAX_FLAVORS - 1 ? -1 : prev.currentStep + 1,
    }));
  }, []);

  const getCurrentFlavorStep = useCallback(() => {
    return quizState.currentStep - 1;
  }, [quizState.currentStep]);

  const isMainFlavorStep = useCallback(() => {
    return getCurrentFlavorStep() === 0;
  }, [getCurrentFlavorStep]);

  const resetQuiz = useCallback(() => {
    setQuizState(INITIAL_QUIZ_STATE);
  }, []);

  return {
    quizState,
    selectTobacco,
    addFlavor,
    getCurrentFlavorStep,
    isMainFlavorStep,
    resetQuiz,
  };
};
