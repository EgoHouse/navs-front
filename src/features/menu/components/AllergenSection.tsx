import { memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { ALLERGENS } from '../constants';

export const AllergenButton = memo<{ isOpen: boolean; onToggle: () => void }>(({ isOpen, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border transition-all ${isOpen
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                : 'text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10 hover:border-yellow-400/50'
            }`}
        title="Alérgenos"
    >
        <ShieldAlert size={20} />
        <span className="text-xs md:text-sm font-semibold">Alérgenos</span>
    </button>
));

AllergenButton.displayName = 'AllergenButton';

export const AllergenPanel = memo<{ isOpen: boolean; onClose: () => void }>(({ isOpen, onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed top-0 right-0 h-full w-80 md:w-96 z-[60] bg-gray-950/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gray-950/90 backdrop-blur-sm border-b border-gray-700/50 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <ShieldAlert size={22} className="text-yellow-400" />
                            <h3 className="text-lg font-bold text-white font-['Poppins']">Alérgenos</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Allergen List */}
                    <div className="p-5 space-y-2">
                        {ALLERGENS.map((allergen) => {
                            const Icon = allergen.icon;
                            return (
                                <div
                                    key={allergen.name}
                                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30"
                                >
                                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-yellow-400/10">
                                        <Icon size={20} className="text-yellow-400" />
                                    </div>
                                    <span className="text-gray-200 text-sm font-medium">{allergen.name}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="px-5 pb-6">
                        <p className="text-gray-500 text-xs text-center leading-relaxed">
                            Si tienes alguna alergia o intolerancia alimentaria, consulta con nuestro personal
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

AllergenPanel.displayName = 'AllergenPanel';
