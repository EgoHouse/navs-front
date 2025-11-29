import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle, UtensilsCrossed } from 'lucide-react';

//* Lib
import SEO from '@components/common/SEO';

//* Modules
import { useCategories } from '@modules/catalog/hooks';

//* Components
import {
  MenuHeader,
  CategoryNavigation,
  SubcategorySection,
  ImageModal,
} from '../components';

//* Constants
import {
  MENU_SEO,
  MENU_BACKGROUND_IMAGE,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_ICON,
  DEFAULT_CURRENCY,
} from '../constants';

/**
 * Full Menu Page Component
 * Displays the complete catalog with categories, subcategories, and items
 */
const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  // Fetch categories using React Query
  const { data: categories = [], isLoading, error, refetch } = useCategories();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter categories based on selection
  const filteredCategories = useMemo(() => {
    if (!selectedCategory) return categories;
    return categories.filter((cat) => cat.slug === selectedCategory);
  }, [categories, selectedCategory]);

  // Handlers
  const handleImageClick = (imageUrl: string, itemName: string) => {
    setSelectedImage({ url: imageUrl, name: itemName });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando carta...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Error al cargar la carta</h2>
          <p className="text-gray-400 mb-6">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Intentar de nuevo
          </button>
          <button
            onClick={() => navigate('/')}
            className="block mt-4 text-gray-400 hover:text-white transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // No categories available
  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <UtensilsCrossed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Carta no disponible</h2>
          <p className="text-gray-400 mb-6">
            No hay categorías disponibles en este momento
          </p>
          <button
            onClick={() => refetch()}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Actualizar
          </button>
          <button
            onClick={() => navigate('/')}
            className="block mt-4 text-gray-400 hover:text-white transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO {...MENU_SEO} />
      <div className="min-h-screen relative font-['Poppins']">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${MENU_BACKGROUND_IMAGE}')`,
          }}
        />
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 z-10 bg-black/70" />

        {/* Content */}
        <div className="relative z-20">
          {/* Header */}
          <MenuHeader />

          {/* Category Navigation */}
          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Menu Content */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {filteredCategories.map((category, categoryIdx) => {
                  const Icon = CATEGORY_ICONS[category.slug] || DEFAULT_CATEGORY_ICON;
                  return (
                    <div key={categoryIdx} className="space-y-8">
                      {/* Category title if showing all */}
                      {!selectedCategory && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-8"
                        >
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <Icon className="text-yellow-400" size={40} />
                            <h2 className="text-4xl font-bold text-white">{category.name}</h2>
                          </div>
                          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
                        </motion.div>
                      )}

                      {/* Subcategories */}
                      {category.subcategories.map((subcategory, idx) => (
                        <SubcategorySection
                          key={idx}
                          subcategory={subcategory}
                          currency={DEFAULT_CURRENCY}
                          isSignature={subcategory.type === 'signature'}
                          onImageClick={handleImageClick}
                        />
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-black/40 backdrop-blur-sm border-t border-gray-700/50 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm">
                Carta actualizada • Precios en {DEFAULT_CURRENCY} • IVA incluido
              </p>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {isModalOpen && selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            imageUrl={selectedImage.url}
            itemName={selectedImage.name}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default MenuPage;
