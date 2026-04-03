import { memo } from 'react';
import { createPortal } from 'react-dom';
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
  ({ isVisible, flavorName, subFlavors, onSelect, onClose }) =>
    createPortal(
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
              className="relative rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
              style={{ width: 'min(calc(100vw - 2rem), 26rem)' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="mb-4 font-['Poppins'] text-xl font-semibold text-yellow-400">
                Tipo de {flavorName}
              </h3>
              <div className="space-y-3">
                {subFlavors.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => onSelect(sub)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10 hover:text-yellow-400"
                  >
                    {formatFlavorName(sub)}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                className="mt-4 w-full rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-gray-700"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
);

SubFlavorPopup.displayName = 'SubFlavorPopup';
