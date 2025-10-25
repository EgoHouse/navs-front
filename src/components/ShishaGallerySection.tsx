import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShishaGallerySection: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="relative bg-black py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]"
        >
          {/* Lado Izquierdo - Collage de Imágenes */}
          <motion.div
            variants={itemVariants}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Imagen 1 - Principal (más grande) */}
            <motion.div
              variants={imageVariants}
              className="absolute top-0 left-0 w-3/5 h-3/5 z-10"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hookas.jpg"
                  alt="Cachimba premium EGO HOUSE"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
              </div>
            </motion.div>

            {/* Imagen 2 - Superpuesta derecha */}
            <motion.div
              variants={imageVariants}
              className="absolute top-1/4 right-0 w-2/5 h-2/5 z-20"
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1729629543/cachimba2_mhsb4z.jpg"
                  alt="Ambiente cachimba EGO HOUSE"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
              </div>
            </motion.div>

            {/* Imagen 3 - Inferior izquierda */}
            <motion.div
              variants={imageVariants}
              className="absolute bottom-0 left-1/4 w-2/5 h-2/5 z-15"
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1729629543/cachimba3_dqwxh8.jpg"
                  alt="Cachimba artesanal EGO HOUSE"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
              </div>
            </motion.div>

            {/* Elemento decorativo */}
            <motion.div
              variants={imageVariants}
              className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"
            />
            <motion.div
              variants={imageVariants}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Lado Derecho - Contenido con Imagen de Fondo */}
          <motion.div variants={itemVariants} className="relative">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1729629543/cachimba-fondo_ixvmku.jpg"
                alt="Fondo galería cachimbas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 p-8 lg:p-12 min-h-[400px] flex flex-col justify-center text-white">
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-block text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
                  Galería
                </span>
                <h3 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
                  Momentos
                  <br />
                  <span className="text-white/80">Únicos</span>
                </h3>
                <p className="text-lg text-white/80 font-light leading-relaxed mb-8 max-w-md">
                  Descubre la esencia de nuestras cachimbas artesanales y los
                  momentos especiales que se viven en EGO HOUSE.
                </p>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={() => navigate('/galeria-cachimbas')}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center bg-white text-black px-8 py-4 font-medium hover:bg-white/90 transition-all duration-300 self-start rounded-lg"
              >
                <span>Explorar Galería</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShishaGallerySection;
