import React, { useEffect, useRef, useState } from 'react';

interface CloudinaryVideoBackgroundProps {
  cloudinaryUrl: string;
  posterImage: string;
  mobileImage?: string;
  className?: string;
  ariaLabel?: string;
}

const CloudinaryVideoBackground: React.FC<CloudinaryVideoBackgroundProps> = ({
  cloudinaryUrl,
  posterImage,
  mobileImage = '/HomeMobile.png',
  className = '',
  ariaLabel = 'Video de fondo de EGO HOUSE Madrid',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Detectar si es móvil o tablet
  useEffect(() => {
    const checkMobileOrTablet = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
          userAgent
        );
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024; // Incluir tablets

      return isMobileDevice || isTouchDevice || isSmallScreen;
    };

    const mobile = checkMobileOrTablet();
    setIsMobileOrTablet(mobile);

    // Si es móvil o tablet, mostrar imagen directamente (sin video)
    if (mobile) {
      setShowFallback(true);
      console.log('Mobile/Tablet detected, using static image');
      return;
    }

    // Solo en desktop intentar autoplay del video
    const attemptAutoplay = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        // Asegurar que el video esté cargado
        if (video.readyState < 2) {
          video.load();
          // Esperar a que esté listo
          await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Timeout')), 3000);
            video.addEventListener(
              'loadeddata',
              () => {
                clearTimeout(timer);
                resolve(void 0);
              },
              { once: true }
            );
          });
        }

        // Intentar reproducir
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        setShowFallback(false);
        console.log('Video autoplay successful');
      } catch (err) {
        console.log('Autoplay failed, showing fallback:', err);
        setShowFallback(true);
      }
    };

    // Solo intentar autoplay en desktop
    setTimeout(() => {
      attemptAutoplay();
    }, 500);
  }, []);

  useEffect(() => {
    // Solo escuchar interacciones si no hemos interactuado ya
    if (hasUserInteracted) return;

    const handleInteraction = async () => {
      if (hasUserInteracted) return;

      setHasUserInteracted(true);
      const video = videoRef.current;

      if (!video) return;

      try {
        // Cargar el video si no está cargado
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
          });
        }

        await video.play();
        setShowFallback(false);
      } catch (err) {
        console.log('Failed to play video on user interaction:', err);
      }
    };

    // Usar passive listeners para mejor rendimiento
    document.addEventListener('touchstart', handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener('click', handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener('scroll', handleInteraction, {
      passive: true,
      once: true,
    });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [hasUserInteracted]);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Video element - Solo se muestra en desktop */}
      {!isMobileOrTablet && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            showFallback ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label={ariaLabel}
          preload="auto"
          webkit-playsinline="true"
          crossOrigin="anonymous"
          style={{
            zIndex: showFallback ? 1 : 2,
          }}
          onCanPlay={() => {
            // Intentar reproducir cuando el video esté listo
            const video = videoRef.current;
            if (video && video.paused && !showFallback) {
              video.play().catch(() => {
                setShowFallback(true);
              });
            }
          }}
          onError={() => {
            console.log('Video error, showing fallback');
            setShowFallback(true);
          }}
        >
          <source src={cloudinaryUrl} type="video/mp4" />
        </video>
      )}

      {/* Imagen de fondo - Móvil/Tablet usa HomeMobile.png, Desktop usa posterImage */}
      <img
        src={isMobileOrTablet ? mobileImage : posterImage}
        alt="EGO HOUSE Madrid - Ambiente del lounge"
        className={`w-full h-full object-cover absolute inset-0 ${
          isMobileOrTablet
            ? 'opacity-100' // Siempre visible en móvil/tablet
            : `transition-opacity duration-1000 ${
                showFallback ? 'opacity-100' : 'opacity-0'
              }`
        }`}
        style={{ zIndex: isMobileOrTablet || showFallback ? 2 : 1 }}
        loading="eager"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default CloudinaryVideoBackground;
