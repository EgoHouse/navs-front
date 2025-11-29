import { memo } from 'react';
import { motion } from 'framer-motion';
import { MenuItemComponent } from './MenuItemComponent';
import { DEFAULT_CURRENCY } from '../constants';
import type { MenuSubcategory } from '@modules/catalog/types';

interface SubcategorySectionProps {
  subcategory: MenuSubcategory;
  currency?: string;
  isSignature?: boolean;
  onImageClick: (imageUrl: string, itemName: string) => void;
}

/**
 * Component for displaying a menu subcategory section
 */
export const SubcategorySection = memo<SubcategorySectionProps>(
  ({ subcategory, currency = DEFAULT_CURRENCY, isSignature = false, onImageClick }) => (
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

      {/* Direct items */}
      {subcategory.items && subcategory.items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

      {/* Subsections */}
      {subcategory.subsections && subcategory.subsections.length > 0 && (
        <div className="space-y-6">
          {subcategory.subsections.map((subsection, idx) => (
            <div key={idx}>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-4 font-['Poppins']">
                {subsection.name}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
  )
);

SubcategorySection.displayName = 'SubcategorySection';
