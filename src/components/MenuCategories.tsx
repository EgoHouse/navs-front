import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCatalog';

const MenuCategories: React.FC = () => {
  const navigate = useNavigate();
  const { categories: menuCategories, isLoading, error } = useCategories();

  // Calcular el total de items en todas las categorías
  const totalItems = menuCategories.reduce((total, category) => {
    return (
      total +
      category.subcategories.reduce((subTotal, subcategory) => {
        if (subcategory.items) {
          return subTotal + subcategory.items.length;
        }
        if (subcategory.subsections) {
          return (
            subTotal +
            subcategory.subsections.reduce(
              (subSubTotal, subsection) =>
                subSubTotal + subsection.items.length,
              0
            )
          );
        }
        return subTotal;
      }, 0)
    );
  }, 0);

  const handleMenuClick = () => {
    navigate('/menu/general');
  };

  const handleShishaClick = () => {
    navigate('/shisha');
  };

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
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-['Poppins']">
        <div className="text-center py-20">
          <div className="text-white text-xl">Cargando carta...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-['Poppins']">
        <div className="text-center py-20">
          <div className="text-red-400 text-xl">Error al cargar la carta</div>
          <div className="text-gray-300 text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-['Poppins']">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-light mb-8 text-white tracking-tight"
        >
          Nuestra Carta
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Descubre una experiencia gastronómica única
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {/* Card Carta Completa */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -8,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          onClick={handleMenuClick}
          className="group relative cursor-pointer overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172141/HAMBURGUESA_3_nixycj.jpg"
              alt="Carta Completa"
              className="w-full h-full object-cover"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
          </div>

          {/* Card Content */}
          <div className="relative h-96 flex flex-col justify-between p-8 text-white">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {totalItems} productos
              </span>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-3xl font-semibold mb-4 [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
                Carta Completa
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">
                Bebidas, desayunos, meriendas y cocktails de autor
              </p>

              {/* CTA */}
              <div className="flex items-center justify-center text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                <span>Explorar Carta</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cachimba Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -8,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          onClick={handleShishaClick}
          className="group relative cursor-pointer overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <img
              src="/hookas.jpg"
              alt="Cachimbas"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
          </div>

          {/* Card Content */}
          <div className="relative h-96 flex flex-col justify-between p-8 text-white">
            {/* Header */}
            <div className="flex items-center justify-between"></div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-3xl font-semibold mb-4 [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
                Algo para fumar
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">
                Disfruta de una experiencia relajante y social
              </p>

              {/* CTA */}
              <div className="flex items-center justify-center text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                <span>Descubrir</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MenuCategories;
