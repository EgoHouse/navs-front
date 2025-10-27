import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import Navbar from '../components/Navbar';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';
import MenuCategories from '../components/MenuCategories';
import CloudinaryVideoBackground from '../components/CloudinaryVideoBackground';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import DiscoverSpace from './DiscoverSpace';
import ShishaGallerySection from '../components/ShishaGallerySection';
import CocktailPersonalizationSection from '../components/CocktailPersonalizationSection';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthWithServices();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Redirección automática para usuarios admin
  useEffect(() => {
    if (isAuthenticated && user && user.role === 'ADMIN') {
      console.log('Usuario admin detectado en landing page, redirigiendo...');
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Detectar móvil/tablet para desactivar animaciones
  useEffect(() => {
    const checkMobileOrTablet = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
          userAgent
        );
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024;

      return isMobileDevice || isTouchDevice || isSmallScreen;
    };

    setIsMobileOrTablet(checkMobileOrTablet());

    // Re-evaluar en cambio de tamaño de ventana
    const handleResize = () => {
      setIsMobileOrTablet(checkMobileOrTablet());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animaciones condicionadas - solo en desktop
  const containerVariants = isMobileOrTablet
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      };

  const itemVariants = isMobileOrTablet
    ? undefined
    : {
        hidden: { y: 60, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
          },
        },
      };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="EGO HOUSE Madrid"
        description="La mejor tetería de Madrid. Fumar cachimba premium en el centro de Madrid. EGO HOUSE: experiencia única de shisha, gastronomía exquisita y ambiente exclusivo. Reserva ya!"
        keywords="ego house madrid, mejores teterias madrid, fumar cachimba madrid, tetería madrid centro, cachimba madrid, hookah lounge madrid, donde fumar cachimba madrid, tetería premium madrid, shisha madrid, cachimba centro madrid, hookah bar madrid, tetería moderna madrid, cachimba con comida madrid, mejor cachimba madrid, tetería ambiente madrid, tetería madrid, ego house, egohouse, egohouse madrid, Ego House Madrid"
        url="https://www.egohousebynavs.com"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section with Video Background */}
      <main>
        <section
          id="hero"
          className="relative min-h-screen overflow-hidden bg-black flex items-center"
        >
          {/* Cloudinary Video Background */}
          <CloudinaryVideoBackground
            cloudinaryUrl="https://res.cloudinary.com/dm70hhhnm/video/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.mp4"
            posterImage="https://res.cloudinary.com/dm70hhhnm/image/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.jpg"
            mobileImage="/HomeMobile.png"
            ariaLabel="Video de ambiente de EGO HOUSE Madrid"
          />{' '}
          {/* Main Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial={isMobileOrTablet ? false : 'hidden'}
              animate={isMobileOrTablet ? false : 'visible'}
            >
              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-none tracking-tighter"
              >
                <span className="text-white block">EGO HOUSE</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/70 mb-16 font-light tracking-wide"
              >
                Experiencia sensorial única
              </motion.p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  variants={itemVariants}
                  onClick={() => navigate('/shisha')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-none border-1 border-white text-white px-8 py-3 font-light hover:transition-all duration-300"
                  aria-label="Crear experiencia personalizada de cachimba en EGO HOUSE"
                >
                  Crear experiencia
                </motion.button>

                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    const message = encodeURIComponent(
                      '¡Hola! Me gustaría reservar una mesa en EGO HOUSE Madrid. ¿Podrían ayudarme con la disponibilidad y horarios?'
                    );
                    window.open(
                      `https://wa.me/34646149112?text=${message}`,
                      '_blank'
                    );
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border-1 border-white text-black px-8 py-3 font-light hover:bg-white/90 transition-all duration-300"
                  aria-label="Reservar mesa en EGO HOUSE Madrid por WhatsApp"
                >
                  Reservar mesa
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Categories Section */}
        <section id="menu" className="relative bg-black py-10 pb-20">
          {/* Content */}
          <div className="relative z-10">
            <MenuCategories />
          </div>
        </section>

        {/* Shisha Gallery Section */}
        <ShishaGallerySection />

        {/* Cocktail Personalization Section */}
        <CocktailPersonalizationSection />

        <DiscoverSpace />

        {/* Location Map Section */}
        <LocationMap />

      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton
        phoneNumber="34646149112"
        defaultMessage="¡Hola! Me interesa conocer más sobre EGO HOUSE Madrid. ¿Podrían darme información sobre reservas y experiencias disponibles?"
      />
    </>
  );
};

export default LandingPage;
