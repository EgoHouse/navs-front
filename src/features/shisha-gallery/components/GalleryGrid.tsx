import { motion } from 'framer-motion';
import type { CategoryId } from '../constants';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../constants';

interface GalleryGridProps {
  activeCategory: CategoryId;
  onImageClick: (imageUrl: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Grid de imágenes de cachimbas con animaciones
 */
const GalleryGrid = ({ activeCategory, onImageClick }: GalleryGridProps) => {
  const images = GALLERY_IMAGES[activeCategory];
  const categoryName = GALLERY_CATEGORIES.find((c) => c.id === activeCategory)?.name;

  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-white/60 text-lg">
          No hay cachimbas disponibles en esta categoría
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={activeCategory}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {images.map((imagen, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm cursor-pointer"
          onClick={() => onImageClick(imagen)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={imagen}
              alt={`Cachimba ${index + 1} - ${categoryName}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Overlay en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
