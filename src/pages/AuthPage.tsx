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
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import {
  validateEmail,
  validateSpanishPhone,
  validatePassword,
  validateName,
  formatSpanishPhone,
} from '../utils/validation';

type AuthMode = 'login' | 'register';
type UserType = 'admin' | 'user';
type Origin = 'home' | 'desayunos' | 'other';

interface AuthPageProps {
  userType: UserType;
}

const AuthPage: React.FC<AuthPageProps> = ({ userType: propUserType }) => {
  const {
    login,
    register,
    isAuthenticated,
    isLoading,
    error,
    clearError,
    user,
  } = useAuthWithServices();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const userType = propUserType; // Usar el prop directamente
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
    confirmPassword: '',
  });
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | null
  >(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [isValidatingPhone, setIsValidatingPhone] = useState(false);

  // Detectar origen desde query parameters o location state para retrocompatibilidad
  const getOrigin = (): Origin => {
    const fromQuery = searchParams.get('from');
    const fromState = location.state?.from?.pathname;

    if (fromQuery === 'home' || fromState === '/') return 'home';
    if (fromQuery === 'desayunos' || fromState === '/desayunos')
      return 'desayunos';
    return 'other';
  };

  const origin = getOrigin();

  // Asegurar que los admin solo puedan hacer login
  useEffect(() => {
    if (userType === 'admin') {
      setAuthMode('login');
    }
  }, [userType]);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Usuario autenticado:', user);

      // Determinar dónde redirigir basado en el tipo de auth page y rol del usuario
      if (userType === 'admin') {
        if (user.role === 'ADMIN') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          // Usuario normal intentando acceder a admin auth - error
          console.error('Usuario sin permisos de admin intentando acceder');
        }
      } else if (userType === 'user') {
        // Para auth de usuario, siempre ir a desayunos independientemente del rol
        navigate('/desayunos', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, userType]);

  // Limpiar errores cuando cambia el modo
  useEffect(() => {
    clearError();
    setLocalErrors({});
  }, [authMode, userType, clearError]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Validar email con función mejorada
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }

    // Validar contraseña con función mejorada
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error!;
    }

    // Validaciones específicas para registro
    if (authMode === 'register') {
      // Validar nombre con función mejorada
      const nameValidation = validateName(formData.name);
      if (!nameValidation.isValid) {
        errors.name = nameValidation.error!;
      }

      // Validar confirmación de contraseña
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }

      // Validar teléfono español con función mejorada
      const phoneValidation = validateSpanishPhone(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        errors.phoneNumber = phoneValidation.error!;
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
          password: formData.password,
        });
      } else {
        console.log('Intentando registrar usuario...');
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          address: formData.address || undefined,
        });
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    // Procesar el valor según el campo
    if (field === 'phoneNumber') {
      // Formatear teléfono en tiempo real
      setIsValidatingPhone(true);
      setTimeout(() => {
        setIsValidatingPhone(false);
      }, 500);
    } else if (field === 'email') {
      // Validar email en tiempo real
      setIsValidatingEmail(true);
      setTimeout(() => {
        setIsValidatingEmail(false);
        if (value) {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) {
            setLocalErrors((prev) => ({
              ...prev,
              email: emailValidation.error!,
            }));
          } else {
            setLocalErrors((prev) => ({ ...prev, email: '' }));
          }
        }
      }, 800);
    } else if (field === 'password') {
      // Evaluar fortaleza de contraseña en tiempo real
      const passwordValidation = validatePassword(value);
      setPasswordStrength(passwordValidation.strength || null);
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (localErrors[field] && field !== 'email') {
      setLocalErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setLocalErrors({});
    clearError();
  };

  const handleBack = () => {
    if (userType === 'user') {
      // Si viene de /auth (usuarios), volver a home
      navigate('/', { replace: true });
    } else if (userType === 'admin') {
      // Si viene de /admin (admin auth), volver a home
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const renderFloatingIcon = (
    Icon: React.ElementType,
    delay: number,
    position: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute ${position} text-yellow-400/20`}
    >
      <Icon size={24} />
    </motion.div>
  );

  const getPageTitle = () => {
    if (userType === 'user') {
      return authMode === 'login'
        ? 'Accede para ordenar'
        : 'Regístrate para ordenar';
    } else {
      return 'Acceso Administrativo';
    }
  };

  const getPageDescription = () => {
    if (userType === 'user') {
      return 'Necesitas una cuenta para realizar pedidos';
    } else {
      return 'Panel de administración de EGO HOUSE';
    }
  };

  const renderPasswordStrengthIndicator = () => {
    if (!passwordStrength || !formData.password) return null;

    const strengthConfig = {
      weak: {
        color: 'text-red-400',
        bg: 'bg-red-400',
        label: 'Débil',
        width: '33%',
      },
      medium: {
        color: 'text-yellow-400',
        bg: 'bg-yellow-400',
        label: 'Media',
        width: '66%',
      },
      strong: {
        color: 'text-green-400',
        bg: 'bg-green-400',
        label: 'Fuerte',
        width: '100%',
      },
    };

    const config = strengthConfig[passwordStrength];

    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs ${config.color}`}>
            Fortaleza: {config.label}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${config.bg}`}
            style={{ width: config.width }}
          />
        </div>
      </div>
    );
  };

  const renderValidationIcon = (field: string, isValidating: boolean) => {
    if (isValidating) {
      return <Loader2 size={16} className="animate-spin text-yellow-400" />;
    }

    if (localErrors[field]) {
      return <XCircle size={16} className="text-red-400" />;
    }

    if (formData[field as keyof typeof formData] && !localErrors[field]) {
      if (field === 'email') {
        const validation = validateEmail(formData.email);
        return validation.isValid ? (
          <CheckCircle size={16} className="text-green-400" />
        ) : null;
      }
      if (field === 'phoneNumber' && authMode === 'register') {
        const validation = validateSpanishPhone(formData.phoneNumber);
        return validation.isValid ? (
          <CheckCircle size={16} className="text-green-400" />
        ) : null;
      }
    }

    return null;
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
          {renderFloatingIcon(Coffee, 0, 'top-10 left-10')}
          {renderFloatingIcon(Wine, 1, 'top-20 right-16')}
          {renderFloatingIcon(UtensilsCrossed, 2, 'bottom-20 left-16')}
          {renderFloatingIcon(Coffee, 3, 'bottom-10 right-10')}
          {renderFloatingIcon(Wine, 4, 'top-1/3 left-1/4')}
          {renderFloatingIcon(UtensilsCrossed, 5, 'bottom-1/3 right-1/4')}
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
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
                <p className="text-gray-300">{getPageTitle()}</p>
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
                        <span className="text-white font-medium">
                          Acceso Administrativo
                        </span>
                      </>
                    ) : (
                      <>
                        <User size={16} className="text-yellow-400" />
                        <span className="text-white font-medium">
                          {authMode === 'login'
                            ? 'Acceso de Usuario'
                            : 'Crear Cuenta de Usuario'}
                        </span>
                      </>
                    )}
                  </div>
                  {userType === 'user' && (
                    <p className="text-gray-400 text-xs mt-1">
                      {origin === 'desayunos'
                        ? 'Para realizar pedidos de desayunos'
                        : 'Para pedidos y servicios'}
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
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                          localErrors.name
                            ? 'border-red-500'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    {localErrors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {localErrors.name}
                      </p>
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
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange('phoneNumber', e.target.value)
                        }
                        className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                          localErrors.phoneNumber
                            ? 'border-red-500'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="+34 600 000 000"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {renderValidationIcon('phoneNumber', isValidatingPhone)}
                      </div>
                    </div>
                    {localErrors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {localErrors.phoneNumber}
                      </p>
                    )}
                    {!localErrors.phoneNumber && formData.phoneNumber && (
                      <p className="text-green-400 text-xs mt-1">
                        ✓ Formato válido:{' '}
                        {formatSpanishPhone(formData.phoneNumber)}
                      </p>
                    )}
                  </div>
                )}

                {/* Address field - solo en registro de usuario (opcional) */}
                {authMode === 'register' && userType === 'user' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dirección{' '}
                      <span className="text-gray-500">(opcional)</span>
                    </label>
                    <AddressAutocomplete
                      value={formData.address}
                      onChange={(address) =>
                        handleInputChange('address', address)
                      }
                      onSelect={(address, placeId, coordinates) => {
                        console.log('Dirección seleccionada:', {
                          address,
                          placeId,
                          coordinates,
                        });
                        setFormData((prev) => ({ ...prev, address }));
                      }}
                      placeholder="Escribe tu dirección en Madrid..."
                    />
                    {formData.address && (
                      <p className="text-gray-400 text-xs mt-1">
                        💡 Selecciona de las sugerencias para mayor precisión
                      </p>
                    )}
                  </div>
                )}

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                        localErrors.email
                          ? 'border-red-500'
                          : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="ejemplo@gmail.com"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderValidationIcon('email', isValidatingEmail)}
                    </div>
                  </div>
                  {localErrors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {localErrors.email}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange('password', e.target.value)
                      }
                      className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                        localErrors.password
                          ? 'border-red-500'
                          : 'border-gray-600 focus:border-yellow-400'
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
                    <p className="text-red-400 text-sm mt-1">
                      {localErrors.password}
                    </p>
                  )}
                  {authMode === 'register' && renderPasswordStrengthIndicator()}
                </div>

                {/* Confirm Password field - solo en registro de usuario */}
                {authMode === 'register' && userType === 'user' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange('confirmPassword', e.target.value)
                        }
                        className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                          localErrors.confirmPassword
                            ? 'border-red-500'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {localErrors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">
                        {localErrors.confirmPassword}
                      </p>
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

              {/* Mode Switch - Solo para usuarios normales, los admins solo pueden hacer login */}
              {userType === 'user' && (
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    {authMode === 'login'
                      ? '¿No tienes cuenta?'
                      : '¿Ya tienes cuenta?'}
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
                      : 'Requerido para realizar pedidos'}
                  </strong>
                </p>
                {userType === 'admin' && (
                  <p className="text-yellow-400/70 text-xs mt-1 text-center">
                    Solo inicio de sesión disponible
                  </p>
                )}
              </div>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-xs">
                  {userType === 'admin'
                    ? 'Panel de administración - EGO HOUSE'
                    : 'Servicios de usuario - EGO HOUSE'}
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
