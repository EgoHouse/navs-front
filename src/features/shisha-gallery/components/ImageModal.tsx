import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getResponsiveCloudinarySet } from '@lib/utils/cloudinary';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

/**
 * Modal para mostrar imágenes ampliadas
 */
const ImageModal = ({ imageUrl, onClose }: ImageModalProps) => {
  if (!imageUrl) return null;

  const { src, srcset } = getResponsiveCloudinarySet(imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      {/* Botón de cerrar */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-60 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors duration-300"
        aria-label="Cerrar modal"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Contenedor de la imagen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative flex items-center justify-center w-full h-full px-4"
      >
        <img
          src={src || imageUrl}
          srcSet={srcset}
          sizes="90vw"
          alt="Cachimba ampliada"
          className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
