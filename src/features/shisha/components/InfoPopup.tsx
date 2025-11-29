import { memo } from 'react';
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
  ({ title, content, isVisible, onClose }) => (
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
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/20"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-3 font-['Poppins']">
              {title}
            </h3>
            <p className="text-white/90 leading-relaxed mb-4">{content}</p>
            <button
              onClick={onClose}
              className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-300"
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);

InfoPopup.displayName = 'InfoPopup';
