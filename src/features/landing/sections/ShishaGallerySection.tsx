import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

//* Libs
import { getOptimizedCloudinaryUrl, getResponsiveCloudinarySet } from '@lib/utils/cloudinary';

//* Constants
import { SHISHA_GALLERY } from '../constants/content';
import { containerVariants, itemVariants, imageVariants } from '../constants/animations';

// El fondo cubre la mitad derecha en lg y todo el ancho en móvil.
const BACKGROUND_SIZES = '(min-width: 1024px) 50vw, 100vw';
const backgroundSet = getResponsiveCloudinarySet(SHISHA_GALLERY.backgroundImage);

const ShishaGallerySection = () => {
  const navigate = useNavigate();

  // Miniaturas pequeñas (max ~256px): un único ancho fijo con dpr_auto rinde
  // menos bytes que un srcset que arranca en 320.
  const optimizedImages = {
    image1: getOptimizedCloudinaryUrl(SHISHA_GALLERY.images[0].url, {
      quality: 'auto',
      format: 'auto',
      width: 400,
    }),
    image2: getOptimizedCloudinaryUrl(SHISHA_GALLERY.images[1].url, {
      quality: 'auto',
      format: 'auto',
      width: 400,
    }),
    image3: getOptimizedCloudinaryUrl(SHISHA_GALLERY.images[2].url, {
      quality: 'auto',
      format: 'auto',
      width: 400,
    }),
  };

  return (
    <section id="shisha-gallery" className="relative overflow-hidden bg-black py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {/* Título de sección */}
        <motion.div variants={itemVariants} className="mx-auto mb-16 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3">
            <div className="h-px w-12 bg-white/30"></div>
            <span className="text-sm font-light uppercase tracking-[0.2em] text-white/70">
              Galería
            </span>
            <div className="h-px w-12 bg-white/30"></div>
          </motion.div>
          <h2 className="text-5xl font-light tracking-tight text-white md:text-7xl">
            Experiencia Shisha
          </h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 text-xl font-light leading-relaxed text-white/70"
          >
            Descubre momentos únicos con nuestras cachimbas artesanales
          </motion.p>
        </motion.div>

        {/* Grid de contenido */}
        <div className="grid min-h-[60vh] w-full grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
        {/* Lado Izquierdo - Layout Visual */}
        <motion.div
          variants={itemVariants}
          className="relative flex min-h-[500px] flex-col justify-center px-4 sm:px-6 lg:min-h-[600px] lg:px-8"
        >
          <div className="space-y-6 lg:space-y-8">
            {/* Row 1: Imagen + Texto */}
            <motion.div
              variants={imageVariants}
              className="group flex items-center gap-8 lg:gap-12"
            >
              <div className="relative h-40 w-48 shrink-0 lg:h-48 lg:w-64">
                <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                  <img
                    src={optimizedImages.image1}
                    alt={SHISHA_GALLERY.images[0].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width="256"
                    height="192"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/40" />
                </div>
                <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-r from-white/20 to-white/5 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex-1 text-white">
                <div className="relative">
                  <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    01
                  </span>
                  <h3 className="mb-4 text-2xl font-light leading-tight lg:text-3xl">
                    {SHISHA_GALLERY.images[0].title.split(' ')[0]}
                    <br />
                    {SHISHA_GALLERY.images[0].title.split(' ')[1]}
                  </h3>
                  <p className=" text-base font-light leading-relaxed text-white/70 lg:text-lg">
                    {SHISHA_GALLERY.images[0].description}
                  </p>
                  <div className="mt-4 h-px w-16 bg-white/30" />
                </div>
              </div>
            </motion.div>

            {/* Row 2: Texto + Imagen */}
            <motion.div
              variants={imageVariants}
              className="group flex items-center gap-8 lg:gap-12"
            >
              <div className="flex-1 text-right text-white">
                <div className="relative">
                  <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    02
                  </span>
                  <h3 className="mb-4 text-2xl font-light leading-tight lg:text-3xl">
                    {SHISHA_GALLERY.images[1].title.split(' ')[0]}
                    <br />
                    {SHISHA_GALLERY.images[1].title.split(' ')[1]}
                  </h3>
                  <p className="ml-auto text-base font-light leading-relaxed text-white/70 lg:text-lg">
                    {SHISHA_GALLERY.images[1].description}
                  </p>
                  <div className="ml-auto mt-4 h-px w-16 bg-white/30" />
                </div>
              </div>
              <div className="relative h-40 w-48 shrink-0 lg:h-48 lg:w-64">
                <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                  <img
                    src={optimizedImages.image2}
                    alt={SHISHA_GALLERY.images[1].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width="256"
                    height="192"
                  />
                  <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/40" />
                </div>
                <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-l from-white/20 to-white/5 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>

            {/* Row 3: Imagen + Texto */}
            <motion.div
              variants={imageVariants}
              className="group flex items-center gap-8 lg:gap-12"
            >
              <div className="relative h-40 w-48 shrink-0 lg:h-48 lg:w-64">
                <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                  <img
                    src={optimizedImages.image3}
                    alt={SHISHA_GALLERY.images[2].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width="256"
                    height="192"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/40" />
                </div>
                <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-r from-white/20 to-white/5 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex-1 text-white">
                <div className="relative">
                  <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    03
                  </span>
                  <h3 className="mb-4 text-2xl font-light leading-tight lg:text-3xl">
                    {SHISHA_GALLERY.images[2].title.split(' ')[0]}
                    <br />
                    {SHISHA_GALLERY.images[2].title.split(' ')[1]}
                  </h3>
                  <p className="text-base font-light leading-relaxed text-white/70 lg:text-lg">
                    {SHISHA_GALLERY.images[2].description}
                  </p>
                  <div className="mt-4 h-px w-16 bg-white/30" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Elementos decorativos */}
          <motion.div
            variants={imageVariants}
            className="absolute right-8 top-8 h-16 w-2 bg-linear-to-b from-white/40 to-transparent"
          />
          <motion.div
            variants={imageVariants}
            className="absolute bottom-8 left-8 h-16 w-2 bg-linear-to-t from-white/40 to-transparent"
          />
          <motion.div
            variants={imageVariants}
            className="absolute -left-px top-1/2 h-32 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"
          />
        </motion.div>

        {/* Lado Derecho - Contenido con Imagen de Fondo */}
        <motion.div
          variants={itemVariants}
          className="relative h-full min-h-[500px] w-full lg:min-h-[600px]"
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <img
              src={backgroundSet.src}
              srcSet={backgroundSet.srcset}
              sizes={BACKGROUND_SIZES}
              alt="Fondo galería cachimbas"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Contenido */}
          <div className="relative z-10 flex h-full flex-col justify-center p-8 text-white lg:p-12">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-white/70">
                {SHISHA_GALLERY.label}
              </span>
              <h3 className="mb-6 text-4xl font-light leading-tight lg:text-5xl">
                {SHISHA_GALLERY.title}
                <br />
                <span className="text-white/80">{SHISHA_GALLERY.subtitle}</span>
              </h3>
              <p className="mb-8 text-lg font-light leading-relaxed text-white/80">
                {SHISHA_GALLERY.description}
              </p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={() => navigate(SHISHA_GALLERY.ctaLink)}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center self-start rounded-lg bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-white/90"
            >
              <span>{SHISHA_GALLERY.ctaText}</span>
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
};

export default ShishaGallerySection;
