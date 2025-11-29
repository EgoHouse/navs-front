import { memo } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '@lib/utils/format';
import { ProductImage, ProductImagePlaceholder } from './ProductImage';
import { DEFAULT_CURRENCY } from '../constants';
import type { MenuItem } from '@modules/catalog/types';

interface MenuItemComponentProps {
  item: MenuItem;
  currency?: string;
  onImageClick: (imageUrl: string, itemName: string) => void;
}

/**
 * Component for displaying a single menu item
 */
export const MenuItemComponent = memo<MenuItemComponentProps>(
  ({ item, currency = DEFAULT_CURRENCY, onImageClick }) => {
    const handleCardClick = () => {
      if (item.imageUrl) {
        onImageClick(item.imageUrl, item.name);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleCardClick}
        className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 ${
          item.imageUrl ? 'cursor-pointer' : ''
        }`}
      >
        <div className="flex items-start space-x-4">
          {/* Image or placeholder */}
          {item.imageUrl ? (
            <ProductImage imageUrl={item.imageUrl} name={item.name} />
          ) : (
            <ProductImagePlaceholder />
          )}

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-medium text-lg font-['Poppins']">{item.name}</h4>
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
                  <div className="text-lg">{formatPrice(item.price, currency)}</div>
                ) : (
                  <span className="text-gray-400 text-sm">Precio no disponible</span>
                )}
              </div>
            </div>

            {item.description && (
              <p className="text-gray-300 text-sm mb-2 italic">{item.description}</p>
            )}

            {item.tagline && (
              <p className="text-yellow-400/80 text-sm font-medium mb-2">"{item.tagline}"</p>
            )}

            {item.notes && <p className="text-gray-400 text-xs">{item.notes}</p>}
          </div>
        </div>
      </motion.div>
    );
  }
);

MenuItemComponent.displayName = 'MenuItemComponent';
