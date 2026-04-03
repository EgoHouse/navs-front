import { memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoPopupProps {
  title: string;
  content: string;
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Info popup component - Shows information modal
 */
export const InfoPopup = memo<InfoPopupProps>(
  ({ title, content, isVisible, onClose }) =>
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
              style={{ width: 'min(calc(100vw - 2rem), 28rem)' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="mb-3 font-['Poppins'] text-xl font-semibold text-yellow-400">
                {title}
              </h3>
              <p className="mb-4 leading-relaxed text-white/90">{content}</p>
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black transition-colors duration-300 hover:bg-yellow-500"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
);

InfoPopup.displayName = 'InfoPopup';
