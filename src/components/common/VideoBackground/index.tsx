import { useRef } from 'react';
import useDeviceDetection from '@lib/hooks/useDeviceDetection';
import useVideoAutoplay from './useVideoAutoplay';
import type { VideoBackgroundProps } from './types';

const VideoBackground = ({
  videoUrl,
  posterImage,
  mobileImage = '/HomeMobile.png',
  className = '',
  ariaLabel = 'Video de fondo',
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isMobile, isTablet } = useDeviceDetection();
  const isMobileOrTablet = isMobile || isTablet;

  const { showFallback } = useVideoAutoplay({
    videoRef,
    isMobile: isMobileOrTablet,
  });

  return (
    <div className={`absolute inset-0 ${className}`}>
      {showFallback ? (
        <img
          src={mobileImage}
          alt={ariaLabel}
          className="h-full w-full object-cover"
          loading="eager"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={posterImage}
          preload="metadata"
          aria-label={ariaLabel}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />
    </div>
  );
};

export default VideoBackground;
