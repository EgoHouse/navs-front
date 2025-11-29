import { memo } from 'react';
import { ImageIcon } from 'lucide-react';
import { getOptimizedCloudinaryUrl } from '@lib/utils/cloudinary';
import { IMAGE_WIDTHS } from '../constants';

interface ProductImagePlaceholderProps {}

/**
 * Placeholder component for products without image
 */
export const ProductImagePlaceholder = memo<ProductImagePlaceholderProps>(() => (
  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
    <ImageIcon className="w-8 h-8 text-gray-400" />
  </div>
));

ProductImagePlaceholder.displayName = 'ProductImagePlaceholder';

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

/**
 * Optimized product image component with Cloudinary integration
 */
export const ProductImage = memo<ProductImageProps>(({ imageUrl, name }) => {
  const optimizedUrl = getOptimizedCloudinaryUrl(imageUrl, {
    width: IMAGE_WIDTHS.THUMBNAIL,
    quality: 'auto',
  });

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600 transition-all duration-300">
      <img
        src={optimizedUrl || imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';
