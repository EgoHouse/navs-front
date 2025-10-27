import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2,
  ArrowLeft,
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
import SEOHead from '../components/SEOHead';

type AuthMode = 'login' | 'register';
type UserType = 'admin' | 'user';
type Origin = 'home' | 'desayunos' | 'other';

const AuthPage: React.FC = () => {
  const { login, register, isAuthenticated, isLoading, error, clearError, user } = useAuthWithServices();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('user');
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

  // Detectar origen desde query parameters o location state
  const getOrigin = (): Origin => {
    const fromQuery = searchParams.get('from');
    const fromState = location.state?.from?.pathname;
    
    if (fromQuery === 'home' || fromState === '/') return 'home';
    if (fromQuery === 'desayunos' || fromState === '/desayunos') return 'desayunos';
    return 'other';
  };

  const origin = getOrigin();

  // Configurar userType inicial basado en el origen
  useEffect(() => {
    if (origin === 'desayunos') {
      setUserType('user'); // Solo usuario para desayunos
      setAuthMode('login'); // Forzar modo login para usuario
    } else {
      setUserType('admin'); // Solo admin para cualquier otro origen (home, other)
      setAuthMode('login'); // Forzar modo login para admin
    }
  }, [origin]);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuario autenticado:', user);

      // Determinar dónde redirigir basado en el origen y rol
      if (origin === 'desayunos') {
        navigate('/desayunos', { replace: true });
      } else if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        // Usuario normal desde home, ir a desayunos
        navigate('/desayunos', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, origin]);

  // Limpiar errores cuando cambia el modo
  useEffect(() => {
    clearError();
    setLocalErrors({});
  }, [authMode, userType, clearError]);

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



  const handleBack = () => {
    if (origin === 'desayunos') {
      navigate('/', { replace: true });
    } else if (origin === 'home') {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const renderFloatingIcon = (Icon: React.ElementType, delay: number, position: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute ${position} text-yellow-400/20`}
    >
      <Icon size={24} />
    </motion.div>
  );

  const getPageTitle = () => {
    if (origin === 'desayunos') {
      return authMode === 'login' ? 'Accede para ordenar' : 'Regístrate para ordenar';
    }
    return authMode === 'login' ? 'Bienvenido de vuelta' : 'Únete a nosotros';
  };

  const getPageDescription = () => {
    if (origin === 'desayunos') {
      return 'Necesitas una cuenta para realizar pedidos de desayunos';
    }
    return 'Accede a tu cuenta de EGO HOUSE';
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title={`${getPageTitle()} - EGO HOUSE Madrid`}
        description={`${getPageDescription()}. Inicia sesión o regístrate en EGO HOUSE Madrid.`}
        keywords="login ego house, registro madrid, acceso usuario, desayunos madrid, admin ego house"
        url="https://www.egohousebynavs.com/auth"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image - Using bar/hookah atmosphere */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hookas.jpg)',
          }}
        />

        {/* Overlay - More transparent to show the bar atmosphere */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {renderFloatingIcon(Coffee, 0, "top-10 left-10")}
          {renderFloatingIcon(Wine, 1, "top-20 right-16")}
          {renderFloatingIcon(UtensilsCrossed, 2, "bottom-20 left-16")}
          {renderFloatingIcon(Coffee, 3, "bottom-10 right-10")}
          {renderFloatingIcon(Wine, 4, "top-1/3 left-1/4")}
          {renderFloatingIcon(UtensilsCrossed, 5, "bottom-1/3 right-1/4")}
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light">Volver</span>
        </button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          {/* Card Container */}
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <UtensilsCrossed className="text-yellow-400" size={32} />
                  <h2 className="text-2xl font-bold text-white">EGO HOUSE</h2>
                </div>
                <p className="text-gray-300">
                  {getPageTitle()}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {getPageDescription()}
                </p>
              </div>

              {/* User Type Toggle - Removido: tipo fijo según origen */}

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
                      {origin === 'desayunos' ? 'Para realizar pedidos de desayunos' : 'Para pedidos y servicios'}
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

              {/* Mode Switch - Solo para usuarios desde desayunos */}
              {origin === 'desayunos' && (
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
                      : origin === 'desayunos'
                        ? 'Requerido para realizar pedidos'
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
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;