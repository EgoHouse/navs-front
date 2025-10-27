import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2,
  X,
  Coffee,
  Wine,
  UtensilsCrossed,
  User,
  UserPlus,
  Shield,
  Phone,
  MapPin
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';

type AuthMode = 'login' | 'register';
type UserType = 'admin' | 'user';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUserType?: UserType;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialUserType = 'admin',
  onSuccess 
}) => {
  const { login, register, isAuthenticated, isLoading, error, clearError, user } = useAuthWithServices();
  const navigate = useNavigate();
  
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
    confirmPassword: ''
  });
  const [localErrors, setLocalErrors] = useState<{[key: string]: string}>({});

  // Cerrar modal y redirigir si el usuario se autentica exitosamente
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuario autenticado:', user);
      onClose();
      
      // Ejecutar callback de éxito si se proporciona
      if (onSuccess) {
        onSuccess();
      } else {
        // Comportamiento por defecto
        if (user.role === 'ADMIN') {
          console.log('Redirigiendo a admin...');
          navigate('/admin', { replace: true });
        } else {
          console.log('Usuario normal, permaneciendo en la página actual');
        }
      }
    }
  }, [isAuthenticated, user, onClose, navigate, onSuccess]);

  // Limpiar errores cuando cambia el modo o se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      clearError();
      setLocalErrors({});
    }
  }, [authMode, isOpen, clearError]);

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        address: '',
        confirmPassword: ''
      });
      setLocalErrors({});
      setAuthMode('login');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    // Validar email
    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validaciones específicas para registro
    if (authMode === 'register') {
      if (!formData.name) {
        errors.name = 'El nombre es requerido';
      } else if (formData.name.length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }

      // Validar teléfono (obligatorio)
      if (!formData.phoneNumber) {
        errors.phoneNumber = 'El teléfono es requerido';
      } else if (!/^\+?[\d\s-()]{9,}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Formato de teléfono inválido';
      }
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      if (authMode === 'login') {
        console.log('Intentando hacer login...');
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        console.log('Intentando registrar usuario...');
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          address: formData.address || undefined
        });
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (localErrors[field]) {
      setLocalErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setLocalErrors({});
    clearError();
  };

  const switchUserType = () => {
    setUserType(userType === 'admin' ? 'user' : 'admin');
    setLocalErrors({});
    clearError();
  };

  const renderFloatingIcon = (Icon: React.ElementType, delay: number) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.2, 0.4, 0.2],
        y: [0, -15, 0],
        rotate: [0, 3, -3, 0]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute text-yellow-400/20"
    >
      <Icon size={20} />
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
        >
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top left */}
            <div className="absolute top-4 left-4">
              {renderFloatingIcon(Coffee, 0)}
            </div>
            
            {/* Top right */}
            <div className="absolute top-6 right-6">
              {renderFloatingIcon(Wine, 1)}
            </div>
            
            {/* Bottom left */}
            <div className="absolute bottom-6 left-6">
              {renderFloatingIcon(UtensilsCrossed, 2)}
            </div>
            
            {/* Bottom right */}
            <div className="absolute bottom-4 right-4">
              {renderFloatingIcon(Coffee, 3)}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 mb-3">
                <UtensilsCrossed className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-bold text-white">EGO HOUSE</h2>
              </div>
              <p className="text-gray-300">
                {authMode === 'login' ? 'Bienvenido de vuelta' : 'Únete a nosotros'}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="text-center mb-6">
              <div className="flex bg-gray-800/50 rounded-lg p-1">
                <button
                  type="button"
                  onClick={switchUserType}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    userType === 'admin'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Shield size={16} />
                    <span>Admin</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={switchUserType}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    userType === 'user'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <User size={16} />
                    <span>Usuario</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mode Description */}
            <div className="text-center mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2">
                  {userType === 'admin' ? (
                    <>
                      <Shield size={16} className="text-yellow-400" />
                      <span className="text-white font-medium">Acceso Administrativo</span>
                    </>
                  ) : (
                    <>
                      <User size={16} className="text-yellow-400" />
                      <span className="text-white font-medium">
                        {authMode === 'login' ? 'Acceso de Usuario' : 'Crear Cuenta de Usuario'}
                      </span>
                    </>
                  )}
                </div>
                {userType === 'user' && (
                  <p className="text-gray-400 text-xs mt-1">
                    Para pedidos de desayunos y servicios
                  </p>
                )}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field - solo en registro de usuario */}
              {authMode === 'register' && userType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                        localErrors.name ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  {localErrors.name && (
                    <p className="text-red-400 text-sm mt-1">{localErrors.name}</p>
                  )}
                </div>
              )}

              {/* Phone field - solo en registro de usuario */}
              {authMode === 'register' && userType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                        localErrors.phoneNumber ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  {localErrors.phoneNumber && (
                    <p className="text-red-400 text-sm mt-1">{localErrors.phoneNumber}</p>
                  )}
                </div>
              )}

              {/* Address field - solo en registro de usuario (opcional) */}
              {authMode === 'register' && userType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dirección <span className="text-gray-500">(opcional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
                      placeholder="Tu dirección (opcional)"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                      localErrors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                    placeholder={userType === 'admin' ? 'admin@egohouse.com' : 'tu@email.com'}
                  />
                </div>
                {localErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{localErrors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                      localErrors.password ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {localErrors.password && (
                  <p className="text-red-400 text-sm mt-1">{localErrors.password}</p>
                )}
              </div>

              {/* Confirm Password field - solo en registro de usuario */}
              {authMode === 'register' && userType === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                        localErrors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {localErrors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{localErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    {authMode === 'login' ? (
                      <>
                        <LogIn size={18} />
                        <span>Iniciar Sesión</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} />
                        <span>Crear Cuenta</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Mode Switch - Solo para usuarios normales */}
            {userType === 'user' && (
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                  <button
                    onClick={switchAuthMode}
                    className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  >
                    {authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
                  </button>
                </p>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-400 text-sm text-center">
                <strong>
                  {userType === 'admin' 
                    ? 'Acceso exclusivo para administradores'
                    : 'Accede para realizar pedidos y más'
                  }
                </strong>
              </p>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                {userType === 'admin' 
                  ? 'Panel de administración - EGO HOUSE'
                  : 'Servicios de usuario - EGO HOUSE'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;