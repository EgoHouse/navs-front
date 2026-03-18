import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { formatFlavorName } from '@modules/shisha/utils';

interface SubFlavorPopupProps {
  isVisible: boolean;
  flavorName: string;
  subFlavors: string[];
  onSelect: (sub: string) => void;
  onClose: () => void;
}

/**
 * Sub-flavor popup component - Shows sub-flavor selection modal
 */
export const SubFlavorPopup = memo<SubFlavorPopupProps>(
  ({ isVisible, flavorName, subFlavors, onSelect, onClose }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 w-104 border border-white/20"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 font-['Poppins']">
              Tipo de {flavorName}
            </h3>
            <div className="space-y-3">
              {subFlavors.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSelect(sub)}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white hover:text-yellow-400 transition-all duration-300 border border-white/10 hover:border-yellow-400/30"
                >
                  {formatFlavorName(sub)}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
            >
              Cancelar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);

SubFlavorPopup.displayName = 'SubFlavorPopup';
