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

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              variants={itemVariants}
              onClick={() => navigate('/shisha')}
              className="cursor-pointer border border-white bg-none px-8 py-3 font-light text-white transition-all duration-300 hover:transition-all"
              aria-label={HERO_CONTENT.cta.primary.ariaLabel}
            >
              {HERO_CONTENT.cta.primary.text}
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={handleReserveClick}
              className="cursor-pointer border border-white bg-white px-8 py-3 font-light text-black transition-all duration-300 hover:bg-white/90"
              aria-label={HERO_CONTENT.cta.secondary.ariaLabel}
            >
              {HERO_CONTENT.cta.secondary.text}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
