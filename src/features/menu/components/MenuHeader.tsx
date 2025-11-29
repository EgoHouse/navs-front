import { memo } from 'react';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Menu page header component
 */
export const MenuHeader = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Volver</span>
        </button>

        <div className="flex items-center space-x-3">
          <UtensilsCrossed className="text-yellow-400" size={32} />
          <h1 className="text-3xl font-bold text-white">Carta</h1>
        </div>

        <div className="text-sm text-gray-400"></div>
      </div>
    </div>
  );
});

MenuHeader.displayName = 'MenuHeader';
