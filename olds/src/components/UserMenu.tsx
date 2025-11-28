import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Shield, 
  ChevronDown,
  UserCircle 
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthWithServices();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    {
      icon: UserCircle,
      label: 'Mi Perfil',
      onClick: () => {
        setIsOpen(false);
        // navigate('/profile');
      }
    },
    ...(user.role === 'ADMIN' ? [{
      icon: Shield,
      label: 'Panel Admin',
      onClick: () => {
        setIsOpen(false);
        // navigate('/admin');
      }
    }] : []),
    {
      icon: Settings,
      label: 'Configuración',
      onClick: () => {
        setIsOpen(false);
        // navigate('/settings');
      }
    },
    {
      icon: LogOut,
      label: 'Cerrar Sesión',
      onClick: handleLogout,
      variant: 'danger' as const
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 text-white hover:bg-gray-700/50 transition-all duration-300"
      >
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <User size={16} className="text-black" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <User size={18} className="text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{user.name}</p>
                    <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      user.role === 'ADMIN' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-800/50 transition-colors ${
                        item.variant === 'danger' 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;