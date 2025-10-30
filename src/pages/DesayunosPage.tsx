import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, LogOut } from 'lucide-react';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import { OrderForm } from '../components/OrderForm';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import type { OrderType } from '../types';
import { ORDER_CONFIG } from '../types/order.types';

interface BreakfastMenu {
  type: OrderType;
  name: string;
  description: string;
  price: number;
  items: readonly string[];
}

const DesayunosPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthWithServices();
  const [selectedMenu, setSelectedMenu] = useState<OrderType | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breakfastMenus: BreakfastMenu[] = [
    {
      type: 'classic',
      name: 'Desayuno Clásico',
      description: 'La combinación perfecta para empezar el día',
      price: ORDER_CONFIG['classic'].price,
      items: ORDER_CONFIG['classic'].food,
    },
    {
      type: 'traditional',
      name: 'Desayuno Tradicional',
      description: 'Sabor auténtico con mollete de jamón',
      price: ORDER_CONFIG['traditional'].price,
      items: ORDER_CONFIG['traditional'].food,
    },
    {
      type: 'premium',
      name: 'Desayuno Premium',
      description: 'Una experiencia gourmet para paladares exigentes',
      price: ORDER_CONFIG['premium'].price,
      items: ORDER_CONFIG['premium'].food,
    },
  ];

  const handleMenuSelect = (menuType: OrderType) => {
    setSelectedMenu(menuType);
  };

  const handleOrderSuccess = () => {
    setOrderSubmitted(true);
    setSelectedMenu(null); // Limpiar selección después del pedido exitoso
  };

  if (orderSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/HomeMobile.png)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-white mb-4">
            ¡Pedido Enviado!
          </h2>
          <p className="text-white/70 mb-8">
            Tu pedido ha sido enviado por WhatsApp. Te confirmaremos la
            disponibilidad y tiempo de preparación.
          </p>
          <button
            onClick={() => {
              setOrderSubmitted(false);
              setSelectedMenu(null);
            }}
            className="bg-white text-black px-6 py-2 font-light hover:bg-white/90 transition-all duration-300"
          >
            Hacer otro pedido
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Desayunos - EGO HOUSE Madrid"
        description="Disfruta de nuestros deliciosos desayunos en EGO HOUSE Madrid. Menús completos desde 4€ con café, zumo y opciones gourmet."
        keywords="desayunos madrid, café madrid, mollete madrid, ego house desayunos, brunch madrid"
        url="https://www.egohousebynavs.com/desayunos"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      {/* Login Button - Top Right (if not authenticated) */}
      {!isAuthenticated && (
        <button
          onClick={() => navigate('/auth?from=desayunos')}
          className="fixed top-6 right-6 z-30 flex gap-1 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 text-white px-4 py-2 font-medium transition-all hover:bg-white/10"
        >
          <LogIn size={16} />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </button>
      )}

      {/* User indicator - Top Right (if authenticated) */}
      {isAuthenticated && user && (
        <div className="fixed top-6 right-6 z-30 flex gap-1 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 text-white px-4 py-2">
          <User size={16} />
          <span className="hidden sm:inline text-sm">Hola, {user.name}</span>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={14} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/HomeMobile.png)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
              Desayunos
            </h1>
            <div className="w-24 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-xl text-white/70 font-light">
              Comienza tu día con el sabor de EGO HOUSE
            </p>
          </motion.div>

          {/* Menu Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light text-white mb-8 text-center">
              Elige tu menú
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breakfastMenus.map((menu) => (
                <motion.div
                  key={menu.type}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 bg-white/5 backdrop-blur-sm rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedMenu === menu.type
                      ? 'border-white bg-white/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => handleMenuSelect(menu.type)}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-light text-white mb-2">
                      {menu.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {menu.description}
                    </p>
                    <div className="space-y-1 mb-4">
                      {menu.items.map((item, index) => (
                        <p key={index} className="text-white/80 text-sm">
                          • {item}
                        </p>
                      ))}
                    </div>
                    <div className="text-2xl font-light text-white">
                      {menu.price}€
                    </div>
                  </div>
                  {selectedMenu === menu.type && (
                    <motion.div
                      layoutId="selectedMenu"
                      className="absolute inset-0 border-2 border-white rounded-lg"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Form */}
          {selectedMenu && (
            <OrderForm
              selectedMenuType={selectedMenu}
              onSuccess={handleOrderSuccess}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber="34646149112"
        defaultMessage="¡Hola! Me interesa información sobre los desayunos de EGO HOUSE Madrid."
      />
    </>
  );
};

export default DesayunosPage;
