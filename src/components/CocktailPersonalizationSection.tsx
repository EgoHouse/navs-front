import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CocktailPersonalizationSection: React.FC = () => {
  const handlePersonalizeClick = () => {
    // Por ahora solo muestra una alerta, después será una página de cuestionario
    alert('Próximamente: Página de personalización de cocktails');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <motion.img
          src="/fondoCocktail.jpg"
          alt="Cocktails premium EGO HOUSE Madrid"
          className="w-full h-full object-cover scale-105"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: 'linear' }}
        />
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-20"
        >
          {/* Main Content - Centered Layout */}
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Pre-title */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-px bg-white/30"></div>
              <span className="text-sm font-light tracking-[0.2em] uppercase text-white/70">
                Mixología de Autor
              </span>
              <div className="w-12 h-px bg-white/30"></div>
            </motion.div>

            {/* Main Headlines */}
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-6 leading-[0.9] tracking-tight"
            >
              Un Cocktail para
              <br />
              <span className="font-light italic">alimentar tu ego</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
            >
              Cada persona tiene su cocktail perfecto. Nosotros lo creamos para ti.
              {/*Nuestro sistema de
              personalización encuentra exactamente el que conecta con tu
              esencia. */}
            </motion.p>

            {/* Features Grid - Minimalist */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
            >
              {[
                {
                  title: 'Ingredientes Premium',
                  desc: 'Solo los mejores destilados y productos frescos',
                },
                {
                  title: 'Técnica Artesanal',
                  desc: 'Métodos clásicos con toques contemporáneos',
                },
                {
                  title: 'Experiencia Única',
                  desc: 'Personalizado según tus preferencias y momento',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-300">
                    <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            {/* <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <motion.button
                onClick={handlePersonalizeClick}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-500"
                aria-label="Personalizar experiencia de cocktail en EGO HOUSE"
              >
                <span className="text-lg font-light tracking-wide">
                  Personaliza tu experiencia
                </span>
                <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </motion.button>

              {/* Small descriptive text */}
            {/*<motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-white/40 mt-6 font-light"
              >
                Descubre tu cocktail ideal en menos de 2 minutos
              </motion.p>
            </motion.div> */}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade - more subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default CocktailPersonalizationSection;
