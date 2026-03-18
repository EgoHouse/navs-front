import { memo } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '../constants';
import type { Category } from '@modules/catalog/types';

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategorySelect: (slug: string | null) => void;
  onSubcategorySelect: (index: string | null) => void;
  currentCategory: Category | null;
}

/**
 * Category navigation component with tabs and subcategory buttons
 */
export const CategoryNavigation = memo<CategoryNavigationProps>(
  ({ categories, selectedCategory, selectedSubcategory, onCategorySelect, onSubcategorySelect, currentCategory }) => (
    <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Category Tabs - wrap en móvil */}
        <div className="flex flex-wrap justify-center border-b border-gray-700/30">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || DEFAULT_CATEGORY_ICON;
            const isSelected = selectedCategory === category.slug;
            return (
              <button
                key={category.slug}
                onClick={() => onCategorySelect(category.slug)}
                className={`px-4 py-3 md:px-6 md:py-4 transition-all flex items-center space-x-2 border-b-2 ${isSelected
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/5'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={18} className="md:w-5 md:h-5" />
                <span className="font-bold text-sm md:text-lg">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory Buttons - grid en móvil, flex-wrap en desktop */}
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-3 md:py-4"
          >
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
              {currentCategory.subcategories.map((subcategory, idx) => {
                const isSelected = selectedSubcategory === idx.toString();
                return (
                  <button
                    key={idx}
                    onClick={() => onSubcategorySelect(idx.toString())}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all text-xs md:text-sm ${isSelected
                      ? 'bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-400/20'
                      : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-600/50'
                      }`}
                  >
                    {subcategory.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
);

CategoryNavigation.displayName = 'CategoryNavigation';
