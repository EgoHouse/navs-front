import { memo } from 'react';

import type { FlavorSelection } from '@modules/shisha/types';
import { formatFlavorName } from '@modules/shisha/utils';

interface SelectedFlavorsProps {
  flavors: FlavorSelection[];
}

/**
 * Selected flavors component - Shows currently selected flavors
 */
export const SelectedFlavors = memo<SelectedFlavorsProps>(({ flavors }) => {
  if (flavors.length === 0) return null;

  return (
    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
      <h3 className="text-lg font-medium text-yellow-400 mb-3">
        Sabores seleccionados:
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {flavors.map((flavor, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
          >
            {index === 0 && '★ '}
            {formatFlavorName(flavor.main)}
            {flavor.sub && ` (${formatFlavorName(flavor.sub)})`}
          </span>
        ))}
      </div>
    </div>
  );
});
