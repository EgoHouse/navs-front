import React, { useState, useEffect, memo } from 'react'; // --- MEJORA: Importado `memo` ---
import {
  ArrowLeft,
  Coffee,
  Utensils,
  Wine,
  UtensilsCrossed,
  ImageIcon,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCatalog';
import type {
  MenuSubcategory,
  MenuItem as NewMenuItem,
} from '../types/api';
import SEOHead from '../components/SEOHead';

const categoryIcons = {
  bebidas: Wine,
  desayunos: Coffee,
  meriendas: UtensilsCrossed,
  cocktails: Wine,
} as const;

const formatPrice = (price: number | undefined | null, currency: string = '€'): string => {
  if (!price && price !== 0) {
    return 'Precio no disponible';
  }
  const numPrice = Number(price);
  if (isNaN(numPrice)) {
    return 'Precio no disponible';
  }
  return `${numPrice.toFixed(2).replace('.00', '')}${currency}`;
};

// --- MEJORA: Helper para optimización de imágenes (f_auto, q_auto, w_auto) ---
// Asume un CDN tipo Cloudinary. Ajusta 'upload/' según tu proveedor.
// Esta es una FUNCIÓN NUEVA, no modifica ninguna existente.
const getOptimizedImageUrl = (
  url: string | undefined | null,
  options: { width: number }
): string | undefined => {
  if (!url) return undefined;
  
  // Asumimos que la URL es de Cloudinary si incluye '/upload/'
  // Si tu CDN es diferente, ajusta esta lógica
  if (url.includes('/upload/')) {
    const { width } = options;
    const transformations = `f_auto,q_auto,w_${width},dpr_auto`;
    return url.replace('/upload/', `/upload/${transformations}/`);
  }
  
  // Si no, devuelve la URL original (no podemos optimizarla)
  return url;
};


// Componente para imagen placeholder
// --- MEJORA: `React.memo` evita re-renders si las props no cambian ---
const ProductImagePlaceholder: React.FC = memo(() => (
  <div className="w-16 h-16 bg-linear-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
    <ImageIcon className="w-8 h-8 text-gray-400" />
  </div>
));

// Componente para imagen del producto
// --- MEJORA: `React.memo` evita re-renders si las props no cambian ---
const ProductImage: React.FC<{
  imageUrl: string;
  name: string;
  onImageClick: () => void;
}> = memo(({ imageUrl, name, onImageClick }) => {
  // --- MEJORA: URL optimizada para thumbnails (ancho 128px) ---
  const optimizedUrl = getOptimizedImageUrl(imageUrl, { width: 128 });

  return (
    <div
      className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600 cursor-pointer hover:border-yellow-400/50 transition-all duration-300 group"
      onClick={onImageClick}
    >
      <img
        src={optimizedUrl || imageUrl} // Fallback a la original si no se puede optimizar
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        // --- MEJORA: Lazy loading nativo para imágenes de la carta ---
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

// Modal de imagen
// --- MEJORA: `React.memo` evita re-renders si las props no cambian ---
// --- NOTA: Este componente es ideal para `React.lazy` + `Suspense` ---
// (Requeriría moverlo a su propio archivo e importarlo dinámicamente)
const ImageModal: React.FC<{
  isOpen: boolean;
  imageUrl: string;
  itemName: string;
  onClose: () => void;
}> = memo(({ isOpen, imageUrl, itemName, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --- MEJORA: URL optimizada para vista de modal (ancho 1024px) ---
  const optimizedModalUrl = getOptimizedImageUrl(imageUrl, { width: 1024 });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <img
              src={optimizedModalUrl || imageUrl} // Fallback a la original
              alt={itemName}
              className="w-full h-auto max-h-[80vh] object-contain"
              // --- MEJORA: Lazy loading (aunque el modal ya es bajo demanda) ---
              loading="lazy"
            />
            <div className="p-4 text-center">
              <h3 className="text-white font-medium text-lg">{itemName}</h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// --- MEJORA: `React.memo` evita re-renders de items individuales ---
const MenuItemComponent: React.FC<{
  item: NewMenuItem;
  currency: string;
  onImageClick: (imageUrl: string, itemName: string) => void;
}> = memo(({ item, currency, onImageClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      {/* Imagen del producto o placeholder */}
      {item.imageUrl ? (
        <ProductImage
          imageUrl={item.imageUrl}
          name={item.name}
          onImageClick={() => onImageClick(item.imageUrl!, item.name)}
        />
      ) : (
        <ProductImagePlaceholder />
      )}

      {/* Contenido */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-white font-medium text-lg font-['Poppins']">
            {item.name}
          </h4>
          <div className="text-yellow-400 font-semibold ml-4 text-right">
            {item.variants && item.variants.length > 0 ? (
              <div className="space-y-1">
                {item.variants.map((variant, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-gray-300">{variant.size}: </span>
                    <span className="text-yellow-400">{formatPrice(variant.price, currency)}</span>
                  </div>
                ))}
              </div>
            ) : item.price !== undefined && item.price !== null ? (
              <div className="text-lg">
                {formatPrice(item.price, currency)}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Precio no disponible</span>
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-gray-300 text-sm mb-2 italic">
            {item.description}
          </p>
        )}

        {item.tagline && (
          <p className="text-yellow-400/80 text-sm font-medium mb-2">
            "{item.tagline}"
          </p>
        )}

        {item.notes && <p className="text-gray-400 text-xs">{item.notes}</p>}
      </div>
    </div>
  </motion.div>
));

// --- MEJORA: `React.memo` evita re-renders de secciones enteras ---
const SubcategorySection: React.FC<{
  subcategory: MenuSubcategory;
  currency: string;
  isSignature?: boolean;
  onImageClick: (imageUrl: string, itemName: string) => void;
}> = memo(({ subcategory, currency, isSignature = false, onImageClick }) => (
  <div className="mb-8">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <h3
        className={`text-2xl font-bold mb-2 font-['Poppins'] ${
          isSignature
            ? 'text-yellow-400 text-center text-3xl'
            : 'text-white border-b border-yellow-400/30 pb-2'
        }`}
      >
        {subcategory.name}
      </h3>
      {isSignature && (
        <p className="text-center text-gray-300 italic text-lg mb-4">
          Cocktails de autor únicos
        </p>
      )}
    </motion.div>

    {subcategory.items && (
      <div className="grid gap-4">
        {subcategory.items.map((item, idx) => (
          <MenuItemComponent
            key={idx}
            item={item}
            currency={currency}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    )}

    {subcategory.subsections && (
      <div className="space-y-6">
        {subcategory.subsections.map((subsection, idx) => (
          <div key={idx}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-4 font-['Poppins']">
              {subsection.name}
            </h4>
            <div className="grid gap-4">
              {subsection.items.map((item, itemIdx) => (
                <MenuItemComponent
                  key={itemIdx}
                  item={item}
                  currency={currency}
                  onImageClick={onImageClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
));

const FullMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  // Obtener datos del catálogo desde el backend
  const { categories, isLoading, error, refetch } = useCategories();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- (Función sin modificar) ---
  const handleImageClick = (imageUrl: string, itemName: string) => {
    setSelectedImage({ url: imageUrl, name: itemName });
    setIsModalOpen(true);
  };

  // --- (Función sin modificar) ---
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const filteredCategories = selectedCategory
    ? categories.filter((cat) => cat.slug === selectedCategory)
    : categories;

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
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => refetch(true)}
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
          <p className="text-gray-400 mb-6">No hay categorías disponibles en este momento</p>
          <button
            onClick={() => refetch(true)}
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
      <SEOHead
        title="Carta Completa | EGO HOUSE Madrid - Bebidas, Desayunos, Meriendas y Cocktails"
        description="Explora la carta completa de EGO HOUSE Madrid. Bebidas premium, desayunos gourmet, meriendas exquisitas y cocktails de autor en un ambiente único."
        keywords="carta ego house madrid, menú completo madrid, bebidas premium madrid, desayunos madrid, cocktails madrid, gastronomía madrid, restaurante madrid"
        url="https://www.egohousebynavs.com/menu/general"
        image="/comida.jpg"
      />
      <div className="min-h-screen relative font-['Poppins']">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/HomeMobile.png')",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 z-10 bg-black/70" />

        {/* Content */}
        <div className="relative z-20">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft size={24} />
                <span>Volver</span>
              </button>

              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="text-yellow-400" size={32} />
                <h1 className="text-3xl font-bold text-white">Carta</h1>
              </div>

              <div className="text-sm text-gray-400"></div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                  }`}
                >
                  Todas las categorías
                </button>
                {categories.map((category) => {
                  const Icon =
                    categoryIcons[
                      category.slug as keyof typeof categoryIcons
                    ] || Utensils;
                  return (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center space-x-2 ${
                        selectedCategory === category.slug
                          ? 'bg-yellow-400 text-black font-semibold'
                          : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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
                  const Icon =
                    categoryIcons[
                      category.slug as keyof typeof categoryIcons
                    ] || Utensils;
                  return (
                    <div key={categoryIdx} className="space-y-8">
                      {/* Título de categoría si se muestran todas */}
                      {!selectedCategory && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-8"
                        >
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <Icon className="text-yellow-400" size={40} />
                            <h2 className="text-4xl font-bold text-white">
                              {category.name}
                            </h2>
                          </div>
                          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
                        </motion.div>
                      )}

                      {/* Subcategorías */}
                      {category.subcategories.map((subcategory, idx) => (
                        <SubcategorySection
                          key={idx}
                          subcategory={subcategory}
                          currency="€"
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
                Carta actualizada • Precios en € • IVA incluido
              </p>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {/* --- MEJORA: `React.lazy` y `Suspense` ---
          Aquí es donde aplicarías `React.lazy`. 
          Si `ImageModal` estuviera en su propio archivo (ej: 'ImageModal.tsx'),
          lo importarías con:
          
          const LazyImageModal = lazy(() => import('./ImageModal'));
          
          Y luego lo usarías aquí dentro de <Suspense>:

          <Suspense fallback={<Loader2 className="fixed..." />}>
            {isModalOpen && selectedImage && (
              <LazyImageModal
                isOpen={isModalOpen}
                ...
              />
            )}
          </Suspense>
          
          Como no podemos cambiar la estructura de archivos, 
          hemos aplicado `React.memo` al modal (definido arriba)
          para optimizarlo lo máximo posible dentro de este archivo.
        */}
        {isModalOpen && selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            imageUrl={selectedImage.url} // La URL se optimiza *dentro* del modal
            itemName={selectedImage.name}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

// --- MEJORA: Exportar el componente principal con `memo` ---
export default memo(FullMenuPage);