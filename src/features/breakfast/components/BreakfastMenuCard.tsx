import { motion } from 'framer-motion';
import type { BreakfastMenu } from '../constants';

interface BreakfastMenuCardProps {
  menu: BreakfastMenu;
  isSelected: boolean;
  onClick: () => void;
}

const BreakfastMenuCard = ({
  menu,
  isSelected,
  onClick,
}: BreakfastMenuCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative cursor-pointer rounded-lg border bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ${
        isSelected
          ? 'border-white bg-white/10'
          : 'border-white/20 hover:border-white/40'
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="mb-2 text-xl font-light text-white">{menu.name}</h3>
        <p className="mb-4 text-sm text-white/60">{menu.description}</p>
        <div className="mb-4 space-y-1">
          {menu.items.map((item, index) => (
            <p key={index} className="text-sm text-white/80">
              • {item}
            </p>
          ))}
        </div>
        <div className="text-2xl font-light text-white">{menu.price}€</div>
      </div>
      {isSelected && (
        <motion.div
          layoutId="selectedMenu"
          className="absolute inset-0 rounded-lg border-2 border-white"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </motion.div>
  );
};

export default BreakfastMenuCard;
