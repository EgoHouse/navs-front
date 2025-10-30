import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DiscoverSpace: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="discover-space"
      className="relative min-h-screen bg-black overflow-hidden"
    >
    {/* Background Image */}
    <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: 'url(https://res.cloudinary.com/dm70hhhnm/image/upload/v1761152411/imagen_2025-10-22_190009156_z6bnra.png)',
        }}
    />

    {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 leading-none tracking-tighter"
          >
            DESCUBRE
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 leading-none tracking-tighter"
          >
            NUESTRO ESPACIO
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto"
          >
            Tres ambientes únicos diseñados para ofrecerte la mejor experiencia
            para purificar tu ego.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            onClick={() => navigate('/local')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-none border-1 border-white text-white px-8 py-3 font-light hover:transition-all duration-300"
            aria-label="Descubre nuestro espacio en EGO HOUSE Madrid"
          >
            Descubre nuestro espacio
          </motion.button>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-white/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-lg">Sala Principal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-lg">Reservado VIP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-lg">Terraza</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wider">EXPLORAR MÁS</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-white/30"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default DiscoverSpace;