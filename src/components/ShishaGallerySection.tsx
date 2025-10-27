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
    <>
      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Galería de Cachimbas EGO HOUSE Madrid',
            description:
              'Galería exclusiva de cachimbas artesanales y experiencias únicas en EGO HOUSE Madrid',
            url: 'https://www.egohousebynavs.com/galeria-cachimbas',
            image: [
              {
                '@type': 'ImageObject',
                url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046984_fvuzw1.jpg',
                description:
                  'Cachimba premium artesanal EGO HOUSE Madrid - Experiencia sensorial única',
                name: 'Premium Selection',
              },
              {
                '@type': 'ImageObject',
                url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046880_xvuv7k.jpg',
                description:
                  'Ambiente exclusivo cachimba Madrid EGO HOUSE - Momentos únicos compartidos',
                name: 'Ambiente Exclusivo',
              },
              {
                '@type': 'ImageObject',
                url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046973_igjg8n.jpg',
                description:
                  'Sabores artesanales cachimba Madrid EGO HOUSE - Mezclas premium exclusivas',
                name: 'Sabores Artesanales',
              },
            ],
            publisher: {
              '@type': 'Organization',
              name: 'EGO HOUSE Madrid',
              url: 'https://www.egohousebynavs.com',
            },
          }),
        }}
      />

      <section
        className="relative bg-black py-16 overflow-hidden"
        itemScope
        itemType="https://schema.org/ImageGallery"
      >
        <meta itemProp="name" content="Galería de Cachimbas EGO HOUSE Madrid" />
        <meta
          itemProp="description"
          content="Experiencias únicas de cachimba artesanal en Madrid"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[60vh] w-full"
        >
          {/* Lado Izquierdo - Layout Visual Impactante */}
          <motion.div
            variants={itemVariants}
            className="relative h-full min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
          >
            <div className="space-y-6 lg:space-y-8">
              {/* Row 1: Imagen Grande Izquierda - Texto Elegante Derecha */}
              <motion.div
                variants={imageVariants}
                className="flex items-center gap-8 lg:gap-12 group"
              >
                <div className="relative w-48 h-40 lg:w-64 lg:h-48 shrink-0">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046984_fvuzw1.jpg"
                      alt="Cachimba premium artesanal EGO HOUSE Madrid - Experiencia sensorial única"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width="256"
                      height="192"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-3xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-1 text-white">
                  <div className="relative">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3 block">
                      01
                    </span>
                    <h4 className="text-2xl lg:text-3xl font-light mb-4 leading-tight">
                      Premium
                      <br />
                      Selection
                    </h4>
                    <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-sm">
                      Cachimbas artesanales seleccionadas especialmente para una
                      experiencia sensorial única en EGO HOUSE Madrid
                    </p>
                    <div className="w-16 h-px bg-white/30 mt-4" />
                  </div>
                </div>
              </motion.div>

              {/* Row 2: Texto Elegante Izquierda - Imagen Grande Derecha */}
              <motion.div
                variants={imageVariants}
                className="flex items-center gap-8 lg:gap-12 group"
              >
                <div className="flex-1 text-white text-right">
                  <div className="relative">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3 block">
                      02
                    </span>
                    <h4 className="text-2xl lg:text-3xl font-light mb-4 leading-tight">
                      Ambiente
                      <br />
                      Exclusivo
                    </h4>
                    <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-sm ml-auto">
                      Un espacio diseñado para crear momentos inolvidables en
                      cada sesión compartida en Madrid
                    </p>
                    <div className="w-16 h-px bg-white/30 mt-4 ml-auto" />
                  </div>
                </div>
                <div className="relative w-48 h-40 lg:w-64 lg:h-48 shrink-0">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046880_xvuv7k.jpg"
                      alt="Ambiente exclusivo cachimba Madrid EGO HOUSE - Momentos únicos compartidos"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width="256"
                      height="192"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-l from-white/20 to-white/5 rounded-3xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Row 3: Imagen Grande Izquierda - Texto Elegante Derecha */}
              <motion.div
                variants={imageVariants}
                className="flex items-center gap-8 lg:gap-12 group"
              >
                <div className="relative w-48 h-40 lg:w-64 lg:h-48 shrink-0">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046973_igjg8n.jpg"
                      alt="Sabores artesanales cachimba Madrid EGO HOUSE - Mezclas premium exclusivas"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width="256"
                      height="192"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-3xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-1 text-white">
                  <div className="relative">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3 block">
                      03
                    </span>
                    <h4 className="text-2xl lg:text-3xl font-light mb-4 leading-tight">
                      Sabores
                      <br />
                      Artesanales
                    </h4>
                    <p className="text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-sm">
                      Mezclas exclusivas preparadas por nuestros maestros
                      tabaqueros con ingredientes premium en Madrid
                    </p>
                    <div className="w-16 h-px bg-white/30 mt-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Elementos decorativos sofisticados */}
            <motion.div
              variants={imageVariants}
              className="absolute top-8 right-8 w-2 h-16 bg-gradient-to-b from-white/40 to-transparent"
            />
            <motion.div
              variants={imageVariants}
              className="absolute bottom-8 left-8 w-2 h-16 bg-gradient-to-t from-white/40 to-transparent"
            />
            <motion.div
              variants={imageVariants}
              className="absolute top-1/2 -left-px w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            />
          </motion.div>

          {/* Lado Derecho - Contenido con Imagen de Fondo */}
          <motion.div
            variants={itemVariants}
            className="relative h-full min-h-[500px] lg:min-h-[600px] w-full"
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 overflow-hidden h-full w-full">
              <img
                src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1761478223/PAB01090_fnbn5o.jpg"
                alt="Fondo galería cachimbas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center text-white">
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
      </section>
    </>
  );
};

export default ShishaGallerySection;
