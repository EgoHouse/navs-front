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
  ({
    subcategory,
    currency = DEFAULT_CURRENCY,
    isSignature = false,
    onImageClick,
  }) => (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <h3
          className={`text-3xl font-bold font-['Poppins'] ${isSignature ? 'text-yellow-400' : 'text-white'
            }`}
        >
          {subcategory.name}
        </h3>
        {isSignature && (
          <p className="text-gray-300 italic text-lg mt-2">
            Cocktails de autor únicos
          </p>
        )}
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Direct items */}
      {subcategory.items && subcategory.items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {subcategory.items.map((item, idx) => (
            <MenuItemComponent
              key={idx}
              item={item}
              currency={currency}
              onImageClick={onImageClick}
            />
          ))}
        </motion.div>
      )}

      {/* Subsections with collapsible */}
      {subcategory.subsections && subcategory.subsections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {subcategory.subsections.map((subsection, idx) => {
            return (
              <div key={idx} className="border-l-4 border-yellow-400/30 pl-4">
                <div className="mb-4 py-2">
                  <h4 className="text-xl font-semibold text-yellow-400 font-['Poppins']">
                    {subsection.name}
                  </h4>
                </div>

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
            );
          })}
        </motion.div>
      )}
    </div>
  )
);

SubcategorySection.displayName = 'SubcategorySection';
