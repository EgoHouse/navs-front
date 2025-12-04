import { motion } from 'framer-motion';
import type { CategoryId } from '../constants';
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '../constants';

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onCategoryChange: (categoryId: CategoryId) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
        <div className="flex flex-wrap gap-1">
          {GALLERY_CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                scale: { type: 'spring', stiffness: 400, damping: 25 },
              }}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-500 overflow-hidden group ${
                activeCategory === category.id
                  ? 'text-black shadow-lg shadow-white/25'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Background animado para el tab activo */}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-xl"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />

              {/* Texto del tab */}
              <span className="relative z-10 font-['Poppins'] tracking-wide">
                {category.name}
              </span>

              {/* Indicador de cantidad */}
              {category.id === 'todas' && (
                <span className="relative z-10 ml-2 text-xs bg-black/20 px-2 py-1 rounded-full">
                  {GALLERY_IMAGES.todas.length}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryTabs;
