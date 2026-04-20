import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOptimizedCloudinaryUrl } from '@lib/utils/cloudinary';
import { MENU_SECTION } from '../constants/content';
import { containerVariants, itemVariants, cardVariants } from '../constants/animations';

const MenuSection = () => {
  const navigate = useNavigate();

  const foodImageUrl = getOptimizedCloudinaryUrl(
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172141/HAMBURGUESA_3_nixycj.jpg',
    { quality: 'auto', format: 'auto', width: 800 }
  );

  const hookasImageUrl = getOptimizedCloudinaryUrl(
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1764339989/hookas_ykzx03.jpg',
    { quality: 'auto', format: 'auto', width: 800 }
  );

  return (
    <section id="menu" className="relative bg-black pb-20">
      <div className="mx-auto w-full flex flex-col gap-16 max-w-6xl px-4 font-['Poppins'] sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-5xl font-light tracking-tight text-white md:text-7xl"
          >
            {MENU_SECTION.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto text-xl font-light leading-relaxed text-gray-300"
          >
            {MENU_SECTION.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            onClick={() => navigate('/menu')}
            className="group relative cursor-pointer overflow-hidden"
          >
            <div className="relative h-100 w-full overflow-hidden rounded-2xl border border-white/10 md:h-100">
              <img
                src={foodImageUrl}
                alt="Carta completa de EGO HOUSE"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="mb-2 text-3xl font-light text-white md:mb-3">Carta Completa</h3>
                <p className="mb-4 text-sm font-light text-white/80 md:text-base">
                  Explora nuestra selección de bebidas, desayunos y experiencias gastronómicas
                </p>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  Ver carta
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={16}
                  />
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            onClick={() => navigate('/shisha')}
            className="group relative cursor-pointer overflow-hidden"
          >
            <div className="relative h-100 w-full overflow-hidden rounded-2xl border border-white/10 md:h-100">
              <img
                src={hookasImageUrl}
                alt="Cachimbas premium de EGO HOUSE"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="mb-2 text-3xl font-light text-white md:mb-3">Cachimbas Premium</h3>
                <p className="mb-4 text-sm font-light text-white/80 md:text-base">
                  Crea tu experiencia personalizada con nuestras cachimbas artesanales
                </p>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  Personalizar
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={16}
                  />
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
