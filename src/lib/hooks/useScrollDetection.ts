import { useState, useEffect } from 'react';

interface UseScrollDetectionOptions {
  threshold?: number;
}

/**
 * Hook para detectar scroll
 */
const useScrollDetection = (options: UseScrollDetectionOptions = {}) => {
  const { threshold = 100 } = options;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

export default useScrollDetection;
