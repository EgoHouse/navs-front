import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  UtensilsCrossed,
  Plus,
  Edit,
  Trash2,
  ChefHat,
  ArrowLeft,
  Package,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import MenuManagement from '../components/admin/MenuManagement';
import { OrderManagement } from '../components/admin/OrderManagement';

type AdminSection = 'menu' | 'reservas' | 'pedidos' | null;

const AdminDashboard: React.FC = () => {
  const { logout, user } = useAuthWithServices();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderHeader = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
          {/* Botón volver solo en móvil */}
          {activeSection !== null && (
            <button
              onClick={() => setActiveSection(null)}
              className="sm:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Volver"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <ChefHat className="text-yellow-400" size={28} />
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Panel de Administración
            </h1>
            <p className="text-gray-400 text-sm">EGO HOUSE</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 self-end sm:self-auto">
          <div className="text-right">
            <p className="text-white font-medium text-sm sm:text-base">
              {user?.name}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">Administrador</p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div className="min-h-screen bg-gray-950 pt-28 sm:pt-32">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Qué deseas administrar?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Selecciona una opción para comenzar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Modificación de Carta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveSection('menu')}
            className="group cursor-pointer"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <UtensilsCrossed className="text-yellow-400" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Modificación de Carta
                </h3>

                <p className="text-gray-400 mb-6">
                  Gestiona categorías, productos, precios y disponibilidad del
                  menú
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Plus size={16} />
                    <span>Agregar productos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Edit size={16} />
                    <span>Editar categorías</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Trash2 size={16} />
                    <span>Eliminar elementos</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gestión de Reservas
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/admin/tables')}
            className="group cursor-pointer"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <Calendar className="text-yellow-400" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Gestión de Reservas
                </h3>

                <p className="text-gray-400 mb-6">
                  Administra reservas de mesas, eventos y disponibilidad
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Users size={16} />
                    <span>Ver reservas</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={16} />
                    <span>Gestionar horarios</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Settings size={16} />
                    <span>Configurar mesas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Gestión de Pedidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setActiveSection('pedidos')}
            className="group cursor-pointer"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full mb-6 group-hover:bg-yellow-400/20 transition-colors">
                  <Package className="text-yellow-400" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Gestión de Pedidos
                </h3>

                <p className="text-gray-400 mb-6">
                  Administra pedidos de desayunos, cierra, edita y elimina
                  pedidos
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Eye size={16} />
                    <span>Ver pedidos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle size={16} />
                    <span>Cerrar/Reabrir pedidos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Edit size={16} />
                    <span>Editar detalles</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderMenuManagement = () => (
    <div className="min-h-screen bg-gray-950 pt-28 sm:pt-32">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          {/* Botón volver solo en desktop */}
          <button
            onClick={() => setActiveSection(null)}
            className="hidden sm:flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al panel principal</span>
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Modificación de Carta
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Gestiona el catálogo de productos y categorías
          </p>
        </motion.div>

        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8">
          <MenuManagement onBack={() => setActiveSection(null)} />
        </div>
      </div>
    </div>
  );

  const renderOrderManagement = () => (
    <div className="min-h-screen bg-gray-950 pt-28 sm:pt-32">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          {/* Botón volver solo en desktop */}
          <button
            onClick={() => setActiveSection(null)}
            className="hidden sm:flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al panel principal</span>
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Gestión de Pedidos
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Administra los pedidos de desayunos de los clientes
          </p>
        </motion.div>

        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8">
          <OrderManagement />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {renderHeader()}

      {activeSection === null && renderMainMenu()}
      {activeSection === 'menu' && renderMenuManagement()}
      {activeSection === 'pedidos' && renderOrderManagement()}
    </div>
  );
};

export default AdminDashboard;
