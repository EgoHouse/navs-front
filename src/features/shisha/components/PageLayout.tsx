import { memo } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { SHISHA_BACKGROUND_IMAGE } from '../constants';

interface PageLayoutProps {
  title: string;
  icon?: LucideIcon;
  onBack: () => void;
  children: ReactNode;
}

export const PageLayout = memo<PageLayoutProps>(({ title, icon: Icon, onBack, children }) => {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${SHISHA_BACKGROUND_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Sticky Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300 font-['Poppins']"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Volver</span>
            </motion.button>

            <div className="flex items-center">
              {Icon && <Icon className="w-6 h-6 text-green-400 mr-2" />}
              <h1 className="text-xl font-semibold text-white font-['Poppins']">{title}</h1>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </div>
  );
});
