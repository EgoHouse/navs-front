import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor simplificado que inicializa el store de autenticación
 * Ya no necesitamos Context API porque Zustand maneja el estado global
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    // Solo asegurar que el loading inicial se complete
    // La hidratación de Zustand se encarga del resto
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [setLoading]);

  // Listener para actividad del usuario (opcional)
  useEffect(() => {
    const { updateActivity, isAuthenticated } = useAuthStore.getState();
    
    const handleUserActivity = () => {
      if (isAuthenticated) {
        updateActivity();
      }
    };

    // Eventos que consideramos como actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Throttle para no actualizar muy frecuentemente
    let lastUpdate = 0;
    const throttledHandler = () => {
      const now = Date.now();
      if (now - lastUpdate > 60000) { // Actualizar máximo cada minuto
        lastUpdate = now;
        handleUserActivity();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, throttledHandler, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledHandler);
      });
    };
  }, []);

  return <>{children}</>;
};

export default AuthProvider;