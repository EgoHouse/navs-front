import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavItem } from './types';

interface NavbarMobileProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: (id: string) => void;
}

const NavbarMobile = ({ items, isOpen, onToggle, onItemClick }: NavbarMobileProps) => {
  return (
    <>
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        className="md:hidden absolute right-2 top-1 p-3 text-white/70 hover:text-white transition-colors duration-300 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-black/80 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-72 bg-black/95 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-end mb-12 pt-4">
                  <motion.button
                    onClick={onToggle}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 text-white/70 hover:text-white cursor-pointer"
                    aria-label="Cerrar menú"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                <div className="flex-1 space-y-2">
                  {items.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => onItemClick(item.id)}
                      className="w-full text-left p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarMobile;
