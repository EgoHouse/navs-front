import { useState, useEffect } from 'react';

interface DeviceDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
}

const checkDevice = (): DeviceDetectionResult => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTabletDevice = /ipad|android(?!.*mobile)|tablet/.test(userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 1024;

  return {
    isMobile: isMobileDevice || isSmallScreen,
    isTablet: isTabletDevice || isMediumScreen,
    isDesktop: !isMobileDevice && !isTabletDevice && window.innerWidth > 1024,
    isTouchDevice,
  };
};

/**
 * Hook para detectar el tipo de dispositivo
 */
const useDeviceDetection = (): DeviceDetectionResult => {
  const [device, setDevice] = useState<DeviceDetectionResult>(checkDevice);

  useEffect(() => {
    const handleResize = () => {
      setDevice(checkDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};

export default useDeviceDetection;
