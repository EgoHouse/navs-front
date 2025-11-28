import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import SuccessMessage from './SuccessMessage';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContextValue {
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message: string, duration = 3000) => {
    addToast({ message, type: 'success', duration });
  }, [addToast]);

  const showError = useCallback((message: string, duration = 5000) => {
    addToast({ message, type: 'error', duration });
  }, [addToast]);

  const showInfo = useCallback((message: string, duration = 3000) => {
    addToast({ message, type: 'info', duration });
  }, [addToast]);

  const showWarning = useCallback((message: string, duration = 4000) => {
    addToast({ message, type: 'warning', duration });
  }, [addToast]);

  const value: ToastContextValue = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        <AnimatePresence>
          {toasts.map(toast => (
            <SuccessMessage
              key={toast.id}
              message={toast.message}
              isVisible={true}
              onClose={() => removeToast(toast.id)}
              autoHideDuration={toast.duration}
              showCloseButton={true}
              size="md"
              position="relative"
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};