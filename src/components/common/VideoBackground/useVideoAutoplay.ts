import { useEffect, useState, type RefObject } from 'react';

interface UseVideoAutoplayOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  isMobile: boolean;
  onFallback?: () => void;
}

const useVideoAutoplay = ({ videoRef, isMobile, onFallback }: UseVideoAutoplayOptions) => {
  const [showFallback, setShowFallback] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      setShowFallback(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const attemptAutoplay = async () => {
      try {
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Timeout')), 5000);
            video.addEventListener('loadeddata', () => {
              clearTimeout(timer);
              resolve(void 0);
            }, { once: true });
          });
        }

        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        setShowFallback(false);
      } catch (err) {
        setShowFallback(true);
        onFallback?.();
      }
    };

    attemptAutoplay();
  }, [videoRef, isMobile, onFallback]);

  return { showFallback };
};

export default useVideoAutoplay;
