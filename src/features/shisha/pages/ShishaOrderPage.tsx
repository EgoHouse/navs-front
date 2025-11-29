import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Share } from 'lucide-react';

import type { QuizState } from '@modules/shisha/types';
import {
  getTobaccoInfo,
  formatFlavorName,
  generateWaiterText,
  generateOrderId,
  shareOrder,
} from '@modules/shisha/utils';

import { PageLayout } from '../components/PageLayout';

interface ShishaOrderPageProps {
  order: QuizState;
  onBack: () => void;
  onStartOver: () => void;
}

/**
 * Shisha order confirmation page
 * Displays the final order summary with share functionality
 */
const ShishaOrderPage = memo<ShishaOrderPageProps>(({ order, onBack, onStartOver }) => {
  const tobaccoInfo = getTobaccoInfo(order.tobaccoType);

  const handleShareOrder = async () => {
    const success = await shareOrder(order);
    if (!success && !navigator.share) {
      alert('¡Orden copiada al portapapeles!');
    }
  };

  return (
    <PageLayout title="Tu Experiencia" icon={CheckCircle} onBack={onBack}>
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400/20 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight font-['Poppins']">
          ¡Experiencia Creada!
        </h2>
        <p className="text-white/70 text-lg">Muestra esta comanda a tu camarero</p>
      </motion.div>

      {/* Order Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
      >
        {/* Order Header */}
        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 font-['Poppins']">
                Comanda Personalizada
              </h3>
              <p className="text-white/60 text-sm mt-1">
                Orden: {generateOrderId()} •{' '}
                {new Date().toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-6 space-y-6">
          {/* Tobacco Base */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white font-['Poppins']">Tabaco Base</h4>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white font-medium text-lg">{tobaccoInfo.name}</p>
              <p className="text-white/60 text-sm">{tobaccoInfo.description}</p>
            </div>
          </div>

          {/* Selected Flavors */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white font-['Poppins']">
              Sabores Seleccionados ({order.flavors.length})
            </h4>
            <div className="space-y-3">
              {order.flavors.map((flavor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <p className="text-white font-medium">
                    {index === 0 ? 'Principal: ' : `Matiz ${index}: `}
                    {formatFlavorName(flavor.main)}
                  </p>
                  {flavor.sub && (
                    <p className="text-yellow-400 text-sm">Tipo: {formatFlavorName(flavor.sub)}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Waiter Instructions */}
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
            <h5 className="text-blue-400 font-medium mb-2 font-['Poppins']">
              Texto para el camarero:
            </h5>
            <p className="text-white/80 text-sm leading-relaxed">"{generateWaiterText(order)}"</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <motion.button
          onClick={handleShareOrder}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 font-['Poppins']"
        >
          <Share className="w-5 h-5" />
          Compartir Orden
        </motion.button>

        <motion.button
          onClick={onStartOver}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-['Poppins']"
        >
          Crear Nueva Experiencia
        </motion.button>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-8"
      >
        <p className="text-white/50 text-sm font-['Poppins']">
          💡 Tip: Guarda una captura de pantalla para futuras referencias
        </p>
      </motion.div>
    </PageLayout>
  );
});

export default ShishaOrderPage;
