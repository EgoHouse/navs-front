import { memo } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface FlavorCardProps {
  flavorName: string;
  isSelected: boolean;
  onSelect: () => void;
  onInfo: () => void;
}

export const FlavorCard = memo<FlavorCardProps>(
  ({ flavorName, isSelected, onSelect, onInfo }) => {
    return (
      <motion.button
        onClick={onSelect}
        whileHover={!isSelected ? { scale: 1.02 } : {}}
        whileTap={!isSelected ? { scale: 0.98 } : {}}
        disabled={isSelected}
        className={`relative p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
          isSelected
            ? 'bg-gray-500/20 border-gray-500/50 opacity-50 cursor-not-allowed'
            : 'bg-white/10 border-white/20 hover:border-yellow-400/50 group cursor-pointer'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`text-lg font-medium transition-colors duration-300 ${
                isSelected
                  ? 'text-gray-400'
                  : 'text-white group-hover:text-yellow-400'
              }`}
            >
              {flavorName}
            </span>
            {isSelected && (
              <span className="text-green-400 text-sm">✓ Seleccionado</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfo();
            }}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <Info className="w-4 h-4 text-white/60 hover:text-yellow-400" />
          </button>
        </div>
      </motion.button>
    );
  }
);

FlavorCard.displayName = 'FlavorCard';
