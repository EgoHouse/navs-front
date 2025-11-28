import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isLowPerformance: boolean;
  shouldUseStaticMedia: boolean;
  hasSlowConnection: boolean;
  prefersReducedData: boolean;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isLowPerformance: false,
    shouldUseStaticMedia: false,
    hasSlowConnection: false,
    prefersReducedData: false,
  });

  useEffect(() => {
    const detectDevice = () => {
      // Detectar dispositivos móviles
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;

      // Detectar dispositivos de bajo rendimiento
      let isLowPerformance = false;

      // Verificar memoria del dispositivo (si está disponible)
      if ('deviceMemory' in navigator) {
        // @ts-expect-error - deviceMemory no está en todos los tipos de TypeScript
        isLowPerformance = navigator.deviceMemory <= 4;
      }

      // Verificar número de núcleos del procesador
      if ('hardwareConcurrency' in navigator) {
        isLowPerformance =
          isLowPerformance || navigator.hardwareConcurrency <= 2;
      }

      // Detectar conexión lenta y ahorro de datos
      let hasSlowConnection = false;
      let prefersReducedData = false;

      if ('connection' in navigator) {
        const connection = navigator.connection as {
          effectiveType?: string;
          saveData?: boolean;
        };
        if (connection) {
          const slowConnections = ['slow-2g', '2g', '3g'];
          hasSlowConnection = !!(
            connection.effectiveType &&
            slowConnections.includes(connection.effectiveType)
          );
          prefersReducedData = connection.saveData === true;
          isLowPerformance =
            isLowPerformance || hasSlowConnection || prefersReducedData;
        }
      }

      // Detectar si la batería está baja (modo ahorro de energía)
      if ('getBattery' in navigator) {
        // @ts-expect-error - getBattery no está en todos los tipos
        navigator
          .getBattery()
          .then((battery: { level: number; charging: boolean }) => {
            if (battery.level < 0.2 || battery.charging === false) {
              setDeviceInfo((prev) => ({
                ...prev,
                isLowPerformance: true,
                shouldUseStaticMedia: true,
              }));
            }
          })
          .catch(() => {
            // Ignorar errores de la API de batería
          });
      }

      // Determinar si usar medios estáticos
      const shouldUseStaticMedia =
        isMobile || isLowPerformance || hasSlowConnection || prefersReducedData;

      setDeviceInfo({
        isMobile,
        isLowPerformance,
        shouldUseStaticMedia,
        hasSlowConnection,
        prefersReducedData,
      });
    };

    detectDevice();

    // Redetectar en cambios de tamaño de ventana
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
};
