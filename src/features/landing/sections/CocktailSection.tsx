import { motion } from 'framer-motion';
import { getOptimizedCloudinaryUrl } from '@lib/utils/cloudinary';
import { COCKTAIL_SECTION } from '../constants/content';
import { containerVariants, itemVariants } from '../constants/animations';

const CocktailSection = () => {
  const backgroundImage = getOptimizedCloudinaryUrl(COCKTAIL_SECTION.backgroundImage, {
    quality: 'auto',
    format: 'auto',
    width: 1920,
  });

  return (
    <section id="cocktails" className="relative overflow-hidden mt-16">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <motion.img
          src={backgroundImage}
          alt={COCKTAIL_SECTION.backgroundAlt}
          className="h-full w-full scale-105 object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: 'linear' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8"
        >
          {/* Main Content - Centered Layout */}
          <div className="mx-auto max-w-4xl text-center text-white">
            {/* Pre-title */}
            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3">
              <div className="h-px w-12 bg-white/30"></div>
              <span className="text-sm font-light uppercase tracking-[0.2em] text-white/70">
                {COCKTAIL_SECTION.label}
              </span>
              <div className="h-px w-12 bg-white/30"></div>
            </motion.div>

            {/* Main Headlines */}
            <motion.h2
              variants={itemVariants}
              className="mb-6 text-5xl font-extralight leading-[0.9] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {COCKTAIL_SECTION.title.line1}
              <br />
              <span className="italic font-light">{COCKTAIL_SECTION.title.line2}</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mx-auto mb-12 text-xl font-light leading-relaxed text-white/80 md:text-2xl lg:text-3xl"
            >
              {COCKTAIL_SECTION.subtitle}
            </motion.p>

            {/* Features Grid - Minimalist */}
            <motion.div
              variants={itemVariants}
              className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
            >
              {COCKTAIL_SECTION.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="group text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white/40">
                    <div className="h-2 w-2 rounded-full bg-white/60 transition-colors duration-300 group-hover:bg-white"></div>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-white">{feature.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default CocktailSection;
