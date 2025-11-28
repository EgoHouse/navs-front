import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Share } from 'lucide-react';

interface QuizState {
  tobaccoType: string;
  flavors: Array<{
    main: string;
    sub?: string;
  }>;
  currentStep: number;
}

interface ShishaOrderProps {
  order: QuizState;
  onBack: () => void;
  onStartOver: () => void;
}

const ShishaOrder: React.FC<ShishaOrderProps> = ({
  order,
  onBack,
  onStartOver,
}) => {
  const getTobaccoInfo = (type: string) => {
    const tobaccoMap = {
      blond: {
        name: 'Blond Blend',
        displayName: 'tabaco rubio',
        description: 'Suave y ligero',
      },
      fusion: {
        name: 'Fusion Blend',
        displayName: 'fusion blend',
        description: 'Equilibrado y versátil',
      },
      dark: {
        name: 'Dark Blend',
        displayName: 'tabaco oscuro',
        description: 'Intenso y profundo',
      },
    };
    return (
      tobaccoMap[type as keyof typeof tobaccoMap] || {
        name: type,
        displayName: type,
        description: '',
      }
    );
  };

  const getFlavorDisplayName = (flavorId: string) => {
    return flavorId.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const generateWaiterText = () => {
    const tobaccoInfo = getTobaccoInfo(order.tobaccoType);
    const mainFlavor = order.flavors[0];
    const secondaryFlavors = order.flavors.slice(1);

    let text = `Quiero un ${tobaccoInfo.displayName}`;

    if (mainFlavor) {
      text += ` con el matiz principal ${getFlavorDisplayName(
        mainFlavor.main
      )}`;
      if (mainFlavor.sub) {
        text += ` (${getFlavorDisplayName(mainFlavor.sub)})`;
      }
    }

    if (secondaryFlavors.length > 0) {
      text += ` y como matices secundarios `;
      const secondaryNames = secondaryFlavors.map((flavor) => {
        let name = getFlavorDisplayName(flavor.main);
        if (flavor.sub) {
          name += ` (${getFlavorDisplayName(flavor.sub)})`;
        }
        return name;
      });

      if (secondaryNames.length === 1) {
        text += secondaryNames[0];
      } else {
        text +=
          secondaryNames.slice(0, -1).join(', ') +
          ' y ' +
          secondaryNames[secondaryNames.length - 1];
      }
    }

    text +=
      '. Además recomiendar marcar dominancia de sabores según tus gustos.';

    return text;
  };

  const generateOrderId = () => {
    return `EXP-${Date.now().toString().slice(-6)}`;
  };

  const handleShare = async () => {
    const orderText = `Mi Experiencia Cachimba Personalizada

📋 Orden: ${generateOrderId()}

🌿 Tabaco Base: ${getTobaccoInfo(order.tobaccoType).name}

🎯 Sabores Seleccionados:
${order.flavors
  .map(
    (flavor, index) =>
      `${index + 1}. ${getFlavorDisplayName(flavor.main)}${
        flavor.sub ? ` (${getFlavorDisplayName(flavor.sub)})` : ''
      }`
  )
  .join('\n')}

✨ Creado en Navs App`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Experiencia Cachimba',
          text: orderText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(orderText);
      alert('¡Orden copiada al portapapeles!');
    }
  };

  const tobaccoInfo = getTobaccoInfo(order.tobaccoType);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/HomeMobile.png')",
        }}
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
              <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
              <h1 className="text-xl font-semibold text-white font-['Poppins']">
                Tu Experiencia
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
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
            <p className="text-white/70 text-lg">
              Muestra esta comanda a tu camarero
            </p>
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
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-400"></div>
                </div>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6 space-y-6">
              {/* Tobacco Base */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white font-['Poppins']">
                  Tabaco Base
                </h4>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div>
                    <p className="text-white font-medium text-lg">
                      {tobaccoInfo.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {tobaccoInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flavors */}
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
                      <div>
                        <p className="text-white font-medium">
                          {index === 0 ? 'Principal: ' : `Matiz ${index}: `}
                          {getFlavorDisplayName(flavor.main)}
                        </p>
                        {flavor.sub && (
                          <p className="text-yellow-400 text-sm">
                            Tipo: {getFlavorDisplayName(flavor.sub)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <h5 className="text-blue-400 font-medium mb-2 font-['Poppins']">
                  Texto para el camarero:
                </h5>
                <p className="text-white/80 text-sm leading-relaxed">
                  "{generateWaiterText()}"
                </p>
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
              onClick={handleShare}
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
        </div>
      </div>
    </div>
  );
};

export default ShishaOrder;
