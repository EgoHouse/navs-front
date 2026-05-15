import { memo, useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedCloudinaryUrl, getResponsiveCloudinarySet } from '@lib/utils/cloudinary';
import { IMAGE_WIDTHS } from '../constants';

// El modal se limita a max-w-4xl (≈896 px) y al 90vh. En móvil ocupa todo el
// ancho disponible; el navegador elige el srcset óptimo a partir de aquí.
const MODAL_SIZES = '(min-width: 1024px) 896px, 90vw';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  itemName: string;
  onClose: () => void;
}

/**
 * Modal for displaying product images in full size
 */
export const ImageModal = memo<ImageModalProps>(({ isOpen, imageUrl, itemName, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false); // Reset loading state when modal opens
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalSet = getResponsiveCloudinarySet(imageUrl);

  const thumbnailUrl = getOptimizedCloudinaryUrl(imageUrl, {
    width: IMAGE_WIDTHS.THUMBNAIL,
    quality: 'auto',
  });

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
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>

          {/* Image Container */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="relative min-h-[300px] flex items-center justify-center">
              {/* Loading Spinner */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                </div>
              )}

              {/* Blurred Thumbnail (shows while main image loads) */}
              {!imageLoaded && (
                <img
                  src={thumbnailUrl || imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain blur-lg opacity-50"
                  aria-hidden="true"
                />
              )}

              {/* Main Image */}
              <img
                src={modalSet.src || imageUrl}
                srcSet={modalSet.srcset}
                sizes={MODAL_SIZES}
                alt={itemName}
                className={`w-full h-auto max-h-[80vh] object-contain transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-white font-medium text-lg">{itemName}</h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

ImageModal.displayName = 'ImageModal';
