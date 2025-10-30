import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Info, Coffee, Sparkles, Leaf } from 'lucide-react';

interface QuizState {
  tobaccoType: string;
  flavors: Array<{
    main: string;
    sub?: string;
  }>;
  currentStep: number;
}

interface InfoPopupProps {
  title: string;
  content: string;
  isVisible: boolean;
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({
  title,
  content,
  isVisible,
  onClose,
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/20"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold text-yellow-400 mb-3 font-['Poppins']">
            {title}
          </h3>
          <p className="text-white/90 leading-relaxed mb-4">{content}</p>
          <button
            onClick={onClose}
            className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-300"
          >
            Entendido
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

interface ShishaQuizProps {
  onComplete: (order: QuizState) => void;
  onBack: () => void;
}

const ShishaQuiz: React.FC<ShishaQuizProps> = ({ onComplete, onBack }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    tobaccoType: '',
    flavors: [],
    currentStep: 0,
  });
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [showAddedNotification, setShowAddedNotification] = useState<
    string | null
  >(null);

  const tobaccoTypes = [
    {
      id: 'blond',
      name: 'Blond Blend',
      icon: Coffee,
      info: 'Tabaco rubio suave y ligero, ideal para principiantes.',
    },
    {
      id: 'fusion',
      name: 'Fusion Blend',
      icon: Sparkles,
      info: 'Mezcla equilibrada que combina lo mejor de diferentes tipos. Hoja rubia y hoja negra.',
    },
    {
      id: 'dark',
      name: 'Dark Blend',
      icon: Leaf,
      info: 'Tabaco oscuro con mayor intensidad para usuarios experimentados.',
    },
  ];

  const mainFlavors = [
    {
      id: 'afrutado',
      name: 'Afrutado',
      subs: ['frutos-rojos', 'tropical'],
      info: 'Sabores que evocan frutas frescas. Dulzura natural y frescura en cada calada.',
    },
    {
      id: 'dulce',
      name: 'Dulce',
      subs: ['repostería', 'seco'],
      info: 'Sabores azucarados que recuerdan a postres. Suavidad y placer en el paladar.',
    },
    {
      id: 'citrico',
      name: 'Cítrico',
      subs: ['ácido', 'amargo'],
      info: 'Toques de limón, naranja y derivados. Refrescante y vibrante, perfecto para limpiar el paladar.',
    },
    {
      id: 'salado',
      name: 'Salado',
      subs: [],
      info: 'Descubre la evolución de la cachimba con sabores como queso, tomate y derivados.',
    },
    {
      id: 'especiado',
      name: 'Especiado',
      subs: [],
      info: 'Especias como masala, clavo o cardamomo. Calidez y aroma intenso.',
    },
    {
      id: 'herbal',
      name: 'Herbal',
      subs: [],
      info: 'Hierbas aromáticas como tomillo o romero. Sensación natural y relajante.',
    },
    {
      id: 'floral',
      name: 'Floral',
      subs: [],
      info: 'Delicadas notas de flores como rosa o jazmín. Elegancia y sutileza.',
    },
    {
      id: 'mentolado',
      name: 'Mentolado',
      subs: [],
      info: 'Frescura intensa de mentol. Sensación refrescante y limpia en la garganta.',
    },
    {
      id: 'menta',
      name: 'Menta',
      subs: [],
      info: 'Menta natural suave. Frescura equilibrada sin ser demasiado intensa.',
    },
  ];

  const getFlavorDisplayName = (flavorId: string) => {
    return flavorId
      .replace('-', ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleTobaccoSelect = (tobacco: string) => {
    setQuizState((prev) => ({
      ...prev,
      tobaccoType: tobacco,
      currentStep: 1,
    }));
  };

  const handleFlavorSelect = (flavor: string, sub?: string) => {
    const newFlavor = { main: flavor, sub };
    const displayName =
      getFlavorDisplayName(flavor) +
      (sub ? ` (${getFlavorDisplayName(sub)})` : '');

    // Show notification
    setShowAddedNotification(displayName);
    setTimeout(() => setShowAddedNotification(null), 2000);

    setQuizState((prev) => ({
      ...prev,
      flavors: [...prev.flavors, newFlavor],
      currentStep: prev.flavors.length >= 4 ? -1 : prev.currentStep + 1,
    }));
  };

  const handleFinish = () => {
    onComplete(quizState);
  };

  const getCurrentFlavorStep = () => {
    return quizState.currentStep - 1;
  };

  const isMainFlavorStep = () => {
    return getCurrentFlavorStep() === 0;
  };

  const renderTobaccoStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-white mb-4 font-['Poppins']">
          ¿Qué tipo de tabaco quieres fumar?
        </h2>
        <p className="text-white/70">
          Selecciona el tipo de tabaco base para tu experiencia
        </p>
      </div>

      <div className="grid gap-4">
        {tobaccoTypes.map((tobacco) => {
          const IconComponent = tobacco.icon;
          return (
            <motion.button
              key={tobacco.id}
              onClick={() => handleTobaccoSelect(tobacco.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xl font-medium text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {tobacco.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveInfo(tobacco.id);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <Info className="w-5 h-5 text-white/60 hover:text-yellow-400" />
              </button>
            </motion.button>
          );
        })}
      </div>

      {/* Info Popups */}
      {tobaccoTypes.map((tobacco) => (
        <InfoPopup
          key={`info-${tobacco.id}`}
          title={tobacco.name}
          content={tobacco.info}
          isVisible={activeInfo === tobacco.id}
          onClose={() => setActiveInfo(null)}
        />
      ))}
    </motion.div>
  );

  const getSelectedMainFlavors = () => {
    return quizState.flavors.map((flavor) => flavor.main);
  };

  const isFlavorSelected = (flavorId: string) => {
    return getSelectedMainFlavors().includes(flavorId);
  };

  const renderFlavorStep = () => {
    const currentFlavorIndex = getCurrentFlavorStep();
    const isMain = isMainFlavorStep();
    const title = isMain
      ? '¿Qué matiz principal quieres que predomine?'
      : `Matiz adicional ${currentFlavorIndex} de 5`;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4 font-['Poppins']">
            {title}
          </h2>
          <p className="text-white/70">
            {isMain
              ? 'Este será el sabor predominante de tu cachimba'
              : `Añade otro matiz para enriquecer la experiencia (${currentFlavorIndex}/5)`}
          </p>

          {/* Mostrar sabores seleccionados */}
          {quizState.flavors.length > 0 && (
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-medium text-yellow-400 mb-3">
                Sabores seleccionados:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {quizState.flavors.map((flavor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
                  >
                    {index === 0 && '★ '}
                    {getFlavorDisplayName(flavor.main)}
                    {flavor.sub && ` (${getFlavorDisplayName(flavor.sub)})`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mainFlavors.map((flavor) => {
            const isSelected = isFlavorSelected(flavor.id);

            return (
              <motion.button
                key={flavor.id}
                onClick={() => {
                  if (isSelected) return; // No hacer nada si ya está seleccionado

                  // Solo mostrar subcategorías en el primer sabor
                  if (flavor.subs.length > 0 && isMain) {
                    // Show sub-options only for first flavor
                    setActiveInfo(`sub-${flavor.id}`);
                  } else {
                    // Para sabores adicionales, solo seleccionar la categoría principal
                    handleFlavorSelect(flavor.id);
                  }
                }}
                whileHover={!isSelected ? { scale: 1.02 } : {}}
                whileTap={!isSelected ? { scale: 0.98 } : {}}
                disabled={isSelected}
                className={`relative p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gray-500/20 border-gray-500/50 opacity-50 cursor-not-allowed'
                    : 'bg-white/10 border-white/20 hover:border-yellow-400/50 group cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-lg font-medium transition-colors duration-300 ${
                        isSelected
                          ? 'text-gray-400'
                          : 'text-white group-hover:text-yellow-400'
                      }`}
                    >
                      {flavor.name}
                    </span>
                    {isSelected && (
                      <span className="text-green-400 text-sm">
                        ✓ Seleccionado
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveInfo(`flavor-${flavor.id}`);
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                  >
                    <Info className="w-4 h-4 text-white/60 hover:text-yellow-400" />
                  </button>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Finish Button */}
        {currentFlavorIndex > 0 && (
          <div className="text-center pt-6">
            <motion.button
              onClick={handleFinish}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Finalizar Experiencia
            </motion.button>
          </div>
        )}

        {/* Sub-flavor Popups - Solo para el primer sabor */}
        {isMain &&
          mainFlavors.map(
            (flavor) =>
              flavor.subs.length > 0 &&
              !isFlavorSelected(flavor.id) && (
                <AnimatePresence key={`sub-popup-${flavor.id}`}>
                  {activeInfo === `sub-${flavor.id}` && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4"
                      onClick={() => setActiveInfo(null)}
                    >
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/20"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4 font-['Poppins']">
                          Tipo de {flavor.name}
                        </h3>
                        <div className="space-y-3">
                          {flavor.subs.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                handleFlavorSelect(flavor.id, sub);
                                setActiveInfo(null);
                              }}
                              className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white hover:text-yellow-400 transition-all duration-300 border border-white/10 hover:border-yellow-400/30"
                            >
                              {getFlavorDisplayName(sub)}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveInfo(null)}
                          className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
                        >
                          Cancelar
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )
          )}
      </motion.div>
    );
  };

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
              <h1 className="text-xl font-semibold text-white font-['Poppins']">
                Crear Experiencia
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {quizState.currentStep === 0 && renderTobaccoStep()}
            {quizState.currentStep > 0 &&
              quizState.currentStep <= 5 &&
              renderFlavorStep()}
          </AnimatePresence>
        </div>
      </div>

      {/* Added to Mix Notification */}
      <AnimatePresence>
        {showAddedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span className="font-medium">
                {showAddedNotification} añadido a la mezcla
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flavor Info Popups */}
      {mainFlavors.map((flavor) => (
        <InfoPopup
          key={`flavor-info-${flavor.id}`}
          title={flavor.name}
          content={flavor.info}
          isVisible={activeInfo === `flavor-${flavor.id}`}
          onClose={() => setActiveInfo(null)}
        />
      ))}
    </div>
  );
};

export default ShishaQuiz;
