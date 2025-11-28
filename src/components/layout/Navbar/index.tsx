import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useScrollDetection from '@lib/hooks/useScrollDetection';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import { NAV_ITEMS } from './constants';

const Navbar = () => {
  const isScrolled = useScrollDetection({ threshold: 100 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="relative flex items-center justify-center md:justify-center">
          <NavbarDesktop items={NAV_ITEMS} onItemClick={scrollToSection} />

          <NavbarMobile
            items={NAV_ITEMS}
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            onItemClick={scrollToSection}
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
