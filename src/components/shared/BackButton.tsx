import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@lib/utils/routes';

interface BackButtonProps {
  className?: string;
  variant?: 'home' | 'back';
  text?: string;
}

/**
 * Botón genérico para volver atrás o ir al inicio
 */
const BackButton = ({ className = '', variant = 'home', text }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  const defaultText = variant === 'home' ? 'Menú Principal' : 'Volver';
  const Icon = variant === 'home' ? Home : ArrowLeft;

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{text || defaultText}</span>
    </motion.button>
  );
};

export default BackButton;
