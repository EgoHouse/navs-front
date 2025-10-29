import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const { isAuthenticated } = useAuthWithServices();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      // Redirigir a la página de autenticación en lugar de abrir modal
      navigate('/auth?from=home');
    }
  };

  // Hook para detectar el scroll
  useEffect(() => {
    console.log('Navbar mounted, isAuthenticated:', isAuthenticated);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Log cambios en el estado de autenticación
  useEffect(() => {
    console.log('Navbar: Auth state changed:', { isAuthenticated });
  }, [isAuthenticated]);

  // Cerrar menú móvil cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Carta', id: 'menu' },
    { name: 'Cachimbas', id: 'shisha-gallery' },
    { name: 'Cocktails', id: 'cocktails' },
    // { name: 'Espacios', id: 'discover-space' },
    { name: 'Ubicación', id: 'location' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center md:justify-center relative">
            {/* Desktop Navigation - Centrado */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -1 }}
                  className="px-6 py-2 text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button - Positioned to the right */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              className="md:hidden absolute right-2 top-1 p-3 text-white/70 hover:text-white transition-colors duration-300 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-md z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-end mb-12 pt-4">
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full text-left p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.name}
                    </motion.button>
                  ))}

                  {/* Authentication Area in Mobile Menu
                  <div className="pt-4 border-t border-white/10">
                    {isAuthenticated ? (
                      <div className="px-4">
                        <UserMenu />
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => {
                          handleLoginClick();
                          setMobileMenuOpen(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full border border-white/20 text-white py-3 px-6 rounded-full hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <LogIn size={16} />
                        Acceder
                      </motion.button>
                    )}
                  </div> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      /> */}
    </>
  );
};

export default Navbar;
