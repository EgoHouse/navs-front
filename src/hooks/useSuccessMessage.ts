import { useState, useCallback } from 'react';

interface UseSuccessMessageReturn {
  isVisible: boolean;
  message: string;
  showSuccess: (message: string) => void;
  hideSuccess: () => void;
}

export const useSuccessMessage = (
  autoHideDuration: number = 3000
): UseSuccessMessageReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSuccess = useCallback((newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);
  }, []);

  const hideSuccess = useCallback(() => {
    setIsVisible(false);
    // Limpiar el mensaje después de la animación
    setTimeout(() => setMessage(''), 300);
  }, []);

  return {
    isVisible,
    message,
    showSuccess,
    hideSuccess
  };
};