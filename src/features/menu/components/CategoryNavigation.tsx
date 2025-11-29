import { memo } from 'react';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '../constants';
import type { Category } from '@modules/catalog/types';

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (slug: string | null) => void;
}

/**
 * Category navigation component
 */
export const CategoryNavigation = memo<CategoryNavigationProps>(
  ({ categories, selectedCategory, onCategorySelect }) => (
    <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === null
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
            }`}
          >
            Todas las categorías
          </button>
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || DEFAULT_CATEGORY_ICON;
            return (
              <button
                key={category.slug}
                onClick={() => onCategorySelect(category.slug)}
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
  )
);

CategoryNavigation.displayName = 'CategoryNavigation';
