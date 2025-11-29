import { memo } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sparkles, Leaf, Info } from 'lucide-react';

import type { TobaccoType } from '@modules/shisha/types';

interface TobaccoCardProps {
  tobacco: TobaccoType;
  onSelect: () => void;
  onInfo: () => void;
}

const ICON_MAP = {
  coffee: Coffee,
  sparkles: Sparkles,
  leaf: Leaf,
} as const;

/**
 * Tobacco card component - Displays a tobacco type option
 */
export const TobaccoCard = memo<TobaccoCardProps>(
  ({ tobacco, onSelect, onInfo }) => {
    const IconComponent = ICON_MAP[tobacco.icon];

    return (
      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors duration-300">
            <IconComponent className="w-6 h-6 text-yellow-400" />
          </div>
          <span className="text-xl font-medium text-white group-hover:text-yellow-400 transition-colors duration-300">
            {tobacco.name}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
        >
          <Info className="w-5 h-5 text-white/60 hover:text-yellow-400" />
        </button>
      </motion.button>
    );
  }
);

TobaccoCard.displayName = 'TobaccoCard';
