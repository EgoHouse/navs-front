import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShishaQuiz from '../components/ShishaQuiz';
import ShishaOrder from '../components/ShishaOrder';
import SEOHead from '../components/SEOHead';

interface QuizState {
  tobaccoType: string;
  flavors: Array<{
    main: string;
    sub?: string;
  }>;
  currentStep: number;
}

const ShishaPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'info' | 'quiz' | 'order'>(
    'info'
  );
  const [orderData, setOrderData] = useState<QuizState | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (order: QuizState) => {
    setOrderData(order);
    setCurrentView('order');
  };

  const handleBackToInfo = () => {
    setCurrentView('info');
  };

  const handleStartOver = () => {
    setOrderData(null);
    setCurrentView('quiz');
  };

  // Render different views based on current state
  if (currentView === 'quiz') {
    return (
      <ShishaQuiz onComplete={handleQuizComplete} onBack={handleBackToInfo} />
    );
  }

  if (currentView === 'order' && orderData) {
    return (
      <ShishaOrder
        order={orderData}
        onBack={handleBackToInfo}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <>
      <SEOHead
        title="Fumar Cachimba Madrid | Mejores Teterías Madrid | EGO HOUSE - Cachimba Premium"
        description="La mejor tetería de Madrid para fumar cachimba. Experiencia personalizada de shisha con tabaco premium, sabores únicos y ambiente exclusivo. Descubre EGO HOUSE!"
        keywords="fumar cachimba madrid, mejores teterias madrid, tetería madrid centro, cachimba madrid, hookah lounge madrid, shisha madrid, donde fumar cachimba madrid, cachimba premium madrid, tetería con ambiente madrid, hookah bar madrid, cachimba personalizada madrid, tabaco cachimba madrid, sabores cachimba madrid, tetería moderna madrid, cachimba centro madrid"
        url="https://www.egohousebynavs.com/shisha"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />
      <div className="min-h-screen relative bg-black">
        {/* Background Image */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/HomeMobile.png')",
          }}
        >
          {/* Overlay para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/60" />
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
                onClick={handleGoBack}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-white hover:text-gray-400 transition-colors duration-300 font-['Poppins']"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Volver</span>
              </motion.button>

              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-white font-['Poppins']">
                  Algo para fumar
                </h1>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-light mb-6 text-white tracking-tight font-['Poppins'] [text-shadow:_0_4px_12px_rgb(0_0_0_/_50%)]">
                Algo para fumar
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
                Sumérgete en una experiencia única de relajación y sabor
              </p>
            </motion.div>

            {/* Content Sections */}
            <div className="grid gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-400 font-['Poppins']">
                  EGO EXPERIENCE - 20€
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Diseñamos tu mezcla a medida. Nosotros proponemos y tu eliges.
                  Entran todas las gamas: blond blend, fusion blend y dark
                  blend, incluyendo algunas referencias de importación.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-400 font-['Poppins']">
                  WTO EXPERIENCE - Sujeto a condiciones
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  WTO extract está considerado el producto más premium, gourmet
                  y exclusivo del mundo, su línea base cuesta a partir de mil
                  euros el kilo. El producto principal presente en este
                  compuesto es hoja de puro. En ego house contamos con una
                  selección de sabores de la marca. Añádelo a tu shisha como
                  suplemento.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <motion.button
                onClick={handleStartQuiz}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(255, 193, 7, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-12 py-4 rounded-2xl font-semibold text-xl shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 font-['Poppins']"
              >
                Crear Experiencia
              </motion.button>

              <p className="text-white/70 text-sm mt-4 font-['Poppins']">
                Reserva tu mesa y personaliza tu experiencia
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShishaPage;
