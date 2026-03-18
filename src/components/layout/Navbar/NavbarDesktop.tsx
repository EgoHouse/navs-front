import { motion } from 'framer-motion';
import type { NavItem } from './types';

interface NavbarDesktopProps {
  items: NavItem[];
  onItemClick: (id: string) => void;
}

const NavbarDesktop = ({ items, onItemClick }: NavbarDesktopProps) => {
  return (
    <div className="hidden items-center gap-1 md:flex md:sticky md:top-0">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          whileHover={{ y: -1 }}
          className="cursor-pointer px-6 py-2 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
        >
          {item.name}
        </motion.button>
      ))}
    </div>
  );
};

export default NavbarDesktop;
