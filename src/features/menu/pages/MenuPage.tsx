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
  AllergenPanel,
} from '../components';

//* Constants
import {
  MENU_SEO,
  MENU_BACKGROUND_IMAGE,
  DEFAULT_CURRENCY,
} from '../constants';

/**
 * Full Menu Page Component
 * Displays the complete catalog with categories, subcategories, and items
 */
const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(new Set());
  const [isAllergenOpen, setIsAllergenOpen] = useState(false);

  // Fetch categories using React Query
  const { data: categories = [], isLoading, error, refetch } = useCategories();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Select first category and subcategory by default
  useEffect(() => {
    const first = categories[0];
    if (first && !selectedCategory) {
      setSelectedCategory(first.slug);
      if (first.subcategories.length > 0) {
        setSelectedSubcategory('0');
      }
    }
  }, [categories]);

  // Get current category and subcategories
  const currentCategory = useMemo(() => {
    if (!selectedCategory) return null;
    return categories.find((cat) => cat.slug === selectedCategory);
  }, [categories, selectedCategory]);

  // Get current subcategory data
  const currentSubcategoryData = useMemo(() => {
    if (!currentCategory || !selectedSubcategory) return null;
    const index = parseInt(selectedSubcategory);
    return currentCategory.subcategories[index];
  }, [currentCategory, selectedSubcategory]);

  // Handlers
  const handleImageClick = (imageUrl: string, itemName: string) => {
    setSelectedImage({ url: imageUrl, name: itemName });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setExpandedSubsections(new Set());
    if (slug) {
      const cat = categories.find((c) => c.slug === slug);
      setSelectedSubcategory(cat && cat.subcategories.length > 0 ? '0' : null);
    } else {
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategorySelect = (index: string | null) => {
    setSelectedSubcategory(index);
    setExpandedSubsections(new Set());
  };

  const toggleSubsection = (subsectionIndex: number) => {
    const key = `${subsectionIndex}`;
    setExpandedSubsections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
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
          <MenuHeader
            isAllergenOpen={isAllergenOpen}
            onAllergenToggle={() => setIsAllergenOpen(prev => !prev)}
          />

          {/* Category Navigation */}
          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
            currentCategory={currentCategory ?? null}
          />

          {/* Menu Content */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {/* Show content only if a category and subcategory are selected */}
              {selectedCategory && selectedSubcategory && currentSubcategoryData ? (
                <motion.div
                  key={`${selectedCategory}-${selectedSubcategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SubcategorySection
                    subcategory={currentSubcategoryData}
                    currency={DEFAULT_CURRENCY}
                    isSignature={currentSubcategoryData.type === 'signature'}
                    onImageClick={handleImageClick}
                    expandedSubsections={expandedSubsections}
                    onToggleSubsection={toggleSubsection}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-16"
                >
                  <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedCategory ? 'Selecciona una subcategoría' : 'Selecciona una categoría'}
                  </h3>
                  <p className="text-gray-400">
                    {selectedCategory
                      ? 'Elige una de las subcategorías arriba para ver los productos'
                      : 'Elige una categoría en las pestañas de arriba para empezar'}
                  </p>
                </motion.div>
              )}
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

        {/* Allergen Panel */}
        <AllergenPanel
          isOpen={isAllergenOpen}
          onClose={() => setIsAllergenOpen(false)}
        />

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
