import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import SEO from '@components/common/SEO';
import { ROUTES } from '@lib/utils/routes';

import { CategoryTabs, GalleryGrid, ImageModal } from '../components';
import { GALLERY_SEO, FEATURED_IMAGE, type CategoryId } from '../constants';

/**
 * Página de galería de cachimbas
 * Muestra una galería organizada por categorías con imágenes de cachimbas
 */
const ShishaGalleryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todas');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  const handleCategoryChange = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO {...GALLERY_SEO} />

      {/* Botón de volver fijo */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleGoBack}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/40 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </motion.button>

      <div className="min-h-screen bg-black">
        {/* Banner superior */}
        <div className="relative h-64 md:h-100 overflow-hidden">
          <img
            src={FEATURED_IMAGE}
            alt="Banner galería de cachimbas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Título */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-light text-white text-center font-['Poppins'] [text-shadow:_0_4px_12px_rgb(0_0_0_/_50%)]"
            >
              Galería de Cachimbas
            </motion.h1>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <GalleryGrid
            activeCategory={activeCategory}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
    </>
  );
};

export default ShishaGalleryPage;
