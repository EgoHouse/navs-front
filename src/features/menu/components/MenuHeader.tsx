import { memo } from 'react';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AllergenButton } from './AllergenSection';

interface MenuHeaderProps {
  isAllergenOpen: boolean;
  onAllergenToggle: () => void;
}

/**
 * Menu page header component
 */
export const MenuHeader = memo<MenuHeaderProps>(({ isAllergenOpen, onAllergenToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-1 md:space-x-2 text-white hover:text-yellow-400 transition-colors shrink-0"
        >
          <ArrowLeft size={20} className="md:w-6 md:h-6" />
          <span className="text-sm md:text-base">Volver</span>
        </button>

        <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
          <UtensilsCrossed className="text-yellow-400 shrink-0" size={24} />
          <h1 className="text-xl md:text-3xl font-bold text-white truncate">Carta</h1>
        </div>

        <div className="shrink-0">
          <AllergenButton isOpen={isAllergenOpen} onToggle={onAllergenToggle} />
        </div>
      </div>
    </div>
  );
});

MenuHeader.displayName = 'MenuHeader';
