import { motion } from 'framer-motion';
import { Coffee, Wine, UtensilsCrossed } from 'lucide-react';

interface FloatingIconProps {
  Icon: React.ElementType;
  delay: number;
  position: string;
}

const FloatingIcon = ({ Icon, delay, position }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={`absolute ${position} text-yellow-400/20`}
  >
    <Icon size={24} />
  </motion.div>
);

/**
 * Iconos flotantes decorativos para el fondo
 */
const FloatingIcons = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <FloatingIcon Icon={Coffee} delay={0} position="top-10 left-10" />
    <FloatingIcon Icon={Wine} delay={1} position="top-20 right-16" />
    <FloatingIcon Icon={UtensilsCrossed} delay={2} position="bottom-20 left-16" />
    <FloatingIcon Icon={Coffee} delay={3} position="bottom-10 right-10" />
    <FloatingIcon Icon={Wine} delay={4} position="top-1/3 left-1/4" />
    <FloatingIcon Icon={UtensilsCrossed} delay={5} position="bottom-1/3 right-1/4" />
  </div>
);

export default FloatingIcons;
