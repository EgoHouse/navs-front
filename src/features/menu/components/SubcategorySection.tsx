import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MenuItemComponent } from './MenuItemComponent';
import { DEFAULT_CURRENCY } from '../constants';
import type { MenuSubcategory } from '@modules/catalog/types';

interface SubcategorySectionProps {
  subcategory: MenuSubcategory;
  currency?: string;
  isSignature?: boolean;
  onImageClick: (imageUrl: string, itemName: string) => void;
  expandedSubsections: Set<string>;
  onToggleSubsection: (subsectionIndex: number) => void;
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
    expandedSubsections,
    onToggleSubsection
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
            const subsectionKey = `${idx}`;
            const isSubsectionExpanded = expandedSubsections.has(subsectionKey);

            return (
              <div key={idx} className="border-l-4 border-yellow-400/30 pl-4">
                {/* Subsection header with toggle button */}
                <button
                  onClick={() => onToggleSubsection(idx)}
                  className="w-full flex items-center justify-between text-left group mb-4 py-2"
                >
                  <h4 className="text-xl font-semibold text-yellow-400 font-['Poppins']">
                    {subsection.name}
                  </h4>
                  <div className="text-yellow-400 group-hover:scale-110 transition-transform">
                    {isSubsectionExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Collapsible subsection content */}
                <AnimatePresence>
                  {isSubsectionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  )
);

SubcategorySection.displayName = 'SubcategorySection';
