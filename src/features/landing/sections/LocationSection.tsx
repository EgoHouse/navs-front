import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { LOCATION_INFO } from '../constants/content';
import { containerVariants, itemVariants } from '../constants/animations';
import useDeviceDetection from '@lib/hooks/useDeviceDetection';

const LocationSection = () => {
  const { isMobile, isTablet } = useDeviceDetection();
  const isMobileOrTablet = isMobile || isTablet;

  const mapUrl = `https://maps.google.com/maps?q=${LOCATION_INFO.coordinates.lat},${LOCATION_INFO.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleDirections = () => {
    window.open(LOCATION_INFO.directionsUrl, '_blank');
  };

  return (
    <section id="location" className="relative overflow-hidden bg-black py-6 text-white">
        <motion.div
          className="absolute left-1/4 top-20 h-32 w-32 rounded-full bg-white/3 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 h-24 w-24 rounded-full bg-white/4 blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.04, 0.02, 0.04],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute right-20 top-1/2 h-20 w-20 rounded-full bg-white/3 blur-xl"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial={isMobileOrTablet ? false : 'hidden'}
          whileInView={isMobileOrTablet ? {} : 'visible'}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3">
            <div className="h-px w-12 bg-white/30"></div>
            <span className="text-sm font-light uppercase tracking-[0.2em] text-white/70">
              Ubicación
            </span>
            <div className="h-px w-12 bg-white/30"></div>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-4xl font-extralight tracking-tight md:text-5xl"
          >
            {LOCATION_INFO.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg font-light text-white/70">
            {LOCATION_INFO.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Map Section */}
          <motion.div
            initial={isMobileOrTablet ? false : { opacity: 0, x: -30 }}
            whileInView={isMobileOrTablet ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/20">
              <iframe
                src={mapUrl}
                className="absolute inset-0 h-full w-full transition-all duration-500 group-hover:scale-105"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ego House Location"
              />
              <div className="pointer-events-none absolute inset-0 bg-white/0 transition-all duration-500 group-hover:bg-white/3" />
            </div>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={isMobileOrTablet ? false : { opacity: 0, x: 30 }}
            whileInView={isMobileOrTablet ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Address */}
            <motion.div
              className="group space-y-3"
              whileHover={isMobileOrTablet ? {} : { x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                <h3 className="text-lg font-light">Dirección</h3>
              </div>
              <div className="ml-8">
                <p className="text-white">{LOCATION_INFO.address}</p>
                <p className="text-sm text-white/70">{LOCATION_INFO.city}</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              className="group space-y-3"
              whileHover={isMobileOrTablet ? {} : { x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                <h3 className="text-lg font-light">Horarios</h3>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Lunes a Jueves</span>
                  <span className="text-white">{LOCATION_INFO.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Viernes a Domingos</span>
                  <span className="text-white">{LOCATION_INFO.hours.weekends}</span>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="group space-y-3"
              whileHover={isMobileOrTablet ? {} : { x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                <h3 className="text-lg font-light">Contacto</h3>
              </div>
              <div className="ml-8">
                <p className="text-white">{LOCATION_INFO.phone}</p>
              </div>
            </motion.div>

            {/* Directions Button */}
            <div className="pt-6">
              <motion.button
                onClick={handleDirections}
                className="flex items-center gap-3 rounded-lg border border-white/20 px-6 py-3 transition-all duration-300 hover:border-white/40"
                whileHover={isMobileOrTablet ? {} : { scale: 1.02 }}
                whileTap={isMobileOrTablet ? {} : { scale: 0.98 }}
              >
                <Navigation className="h-5 w-5" />
                <span className="font-light">Cómo llegar</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
