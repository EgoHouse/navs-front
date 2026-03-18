import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, LogOut } from 'lucide-react';

//* Libs
import { ROUTES } from '@lib/utils/routes';

//* Modules
import { useAuth } from '@modules/auth';
import type { OrderType } from '@modules/order/types';

//* Components
import Footer from '@components/layout/Footer';
import SEO from '@components/common/SEO';
import WhatsAppButton from '@components/common/WhatsAppButton';
import OrderForm from '@components/common/OrderForm';

//* Feature components
import BreakfastMenuCard from '../components/BreakfastMenuCard';
import SuccessScreen from '../components/SuccessScreen';
import { BREAKFAST_MENUS } from '../constants';

const BreakfastPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState<OrderType | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMenuSelect = (menuType: OrderType) => {
    setSelectedMenu(menuType);
  };

  const handleOrderSuccess = () => {
    setOrderSubmitted(true);
    setSelectedMenu(null);
  };

  const handleReset = () => {
    setOrderSubmitted(false);
    setSelectedMenu(null);
  };

  if (orderSubmitted) {
    return <SuccessScreen onReset={handleReset} />;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title="Desayunos - EGO HOUSE Madrid"
        description="Disfruta de nuestros deliciosos desayunos en EGO HOUSE Madrid. Menús completos desde 4€ con café, zumo y opciones gourmet."
        keywords="desayunos madrid, café madrid, mollete madrid, ego house desayunos, brunch madrid"
        url="https://www.egohousebynavs.com/desayunos"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      {/* Login Button - Top Right (if not authenticated) */}
      {!isAuthenticated && (
        <button
          onClick={() => navigate(`${ROUTES.AUTH.USER}?from=desayunos`)}
          className="fixed right-6 top-6 z-30 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 px-4 py-2 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
        >
          <LogIn size={16} />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </button>
      )}

      {/* User indicator - Top Right (if authenticated) */}
      {isAuthenticated && user && (
        <div className="fixed right-6 top-6 z-30 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 px-4 py-2 text-white backdrop-blur-sm">
          <User size={16} />
          <span className="hidden text-sm sm:inline">Hola, {user.name}</span>
          <button
            onClick={() => {
              logout();
              navigate(ROUTES.HOME);
            }}
            className="ml-2 rounded-full p-1 transition-colors hover:bg-white/10"
            title="Cerrar sesión"
          >
            <LogOut size={14} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="relative min-h-screen overflow-hidden pb-16 pt-24">
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
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-6 text-5xl font-extralight tracking-tight text-white md:text-7xl">
              Desayunos
            </h1>
            <div className="mx-auto mb-6 h-px w-24 bg-white/30"></div>
            <p className="text-xl font-light text-white/70">
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
            <h2 className="mb-8 text-center text-2xl font-light text-white">
              Elige tu menú
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {BREAKFAST_MENUS.map((menu) => (
                <BreakfastMenuCard
                  key={menu.type}
                  menu={menu}
                  isSelected={selectedMenu === menu.type}
                  onClick={() => handleMenuSelect(menu.type)}
                />
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
      <WhatsAppButton defaultMessage="¡Hola! Me interesa información sobre los desayunos de EGO HOUSE Madrid." />
    </>
  );
};

export default BreakfastPage;
