import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useDeviceDetection from '@lib/hooks/useDeviceDetection';
import VideoBackground from '@components/common/VideoBackground';
import { HERO_CONTENT, VIDEO_CONFIG, WHATSAPP_CONFIG } from '../constants/content';
import { containerVariants, itemVariants } from '../constants/animations';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useDeviceDetection();
  const isMobileOrTablet = isMobile || isTablet;

  const handleReserveClick = () => {
    const message = encodeURIComponent(HERO_CONTENT.cta.secondary.message);
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-black">
      <VideoBackground
        videoUrl={VIDEO_CONFIG.url}
        posterImage={VIDEO_CONFIG.poster}
        mobileImage={VIDEO_CONFIG.mobileImage}
        ariaLabel={VIDEO_CONFIG.ariaLabel}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial={isMobileOrTablet ? false : 'hidden'}
          animate={isMobileOrTablet ? false : 'visible'}
        >
          <motion.h1
            variants={itemVariants}
            className="mb-8 text-6xl font-extralight leading-none tracking-tighter md:text-8xl lg:text-9xl"
          >
            <span className="block text-white">{HERO_CONTENT.title}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-16 text-xl font-light tracking-wide text-white/70 md:text-2xl"
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <motion.button
              variants={itemVariants}
              onClick={() => navigate('/shisha')}
              className="cursor-pointer border border-white/50 bg-none px-6 py-2 text-sm font-light text-white/80 transition-all duration-300 hover:border-white hover:text-white sm:px-8 sm:py-3 sm:text-base"
              aria-label={HERO_CONTENT.cta.primary.ariaLabel}
            >
              {HERO_CONTENT.cta.primary.text}
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={handleReserveClick}
              className="cursor-pointer border border-white/50 bg-white/10 px-6 py-2 text-sm font-light text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:px-8 sm:py-3 sm:text-base"
              aria-label={HERO_CONTENT.cta.secondary.ariaLabel}
            >
              {HERO_CONTENT.cta.secondary.text}
            </motion.button>
          </div>

          {/* Scroll indicator - link to menu */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate('/menu')}
            className="mx-auto mt-10 flex w-full cursor-pointer flex-col items-center gap-3 border-none bg-transparent sm:mt-14"
            aria-label="Ver nuestra carta"
          >
            <span className="rounded-full border border-accent/40 bg-accent/10 px-8 py-3 text-base font-medium tracking-wide text-white shadow-[0_0_20px_rgba(234,179,8,0.15)] backdrop-blur-sm transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]">
              ↓ &nbsp;Descubre nuestra carta
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-0.5"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
                <polyline points="7 10 12 15 17 10" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-mt-3 text-accent/30">
                <polyline points="7 10 12 15 17 10" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
