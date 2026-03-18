import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, UtensilsCrossed, User, Shield } from 'lucide-react';

import SEO from '@components/common/SEO';
import { ROUTES } from '@lib/utils/routes';
import { useAuth } from '@modules/auth/hooks';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateSpanishPhone,
} from '@modules/auth/utils';

import { AuthForm, FloatingIcons } from '../components';
import { getAuthSEO } from '../constants';

type AuthMode = 'login' | 'register';
type UserType = 'admin' | 'user';

interface AuthPageProps {
  userType: UserType;
}

/**
 * Página de autenticación (login/registro)
 */
const AuthPage = ({ userType }: AuthPageProps) => {
  const { login, register, isAuthenticated, isLoading, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
    confirmPassword: '',
  });
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  // Asegurar que los admin solo puedan hacer login
  useEffect(() => {
    if (userType === 'admin') {
      setAuthMode('login');
    }
  }, [userType]);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      if (userType === 'admin') {
        if (user.role === 'ADMIN') {
          navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
        }
      } else if (userType === 'user') {
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

    // Validar email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error!;
    }

    // Validaciones específicas para registro
    if (authMode === 'register') {
      // Validar nombre
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

      // Validar teléfono
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
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        const registerData: any = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
        };
        if (formData.address) {
          registerData.address = formData.address;
        }
        await register(registerData);
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
    }
  };

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setLocalErrors({});
    clearError();
  };

  const handleBack = () => {
    navigate(ROUTES.HOME, { replace: true });
  };

  const getPageTitle = () => {
    if (userType === 'user') {
      return authMode === 'login' ? 'Accede para ordenar' : 'Regístrate para ordenar';
    }
    return 'Acceso Administrativo';
  };

  const getPageDescription = () => {
    if (userType === 'user') {
      return 'Necesitas una cuenta para realizar pedidos';
    }
    return 'Panel de administración de EGO HOUSE';
  };

  const getOriginMessage = () => {
    const from = searchParams.get('from');
    if (from === 'desayunos') {
      return 'Para realizar pedidos de desayunos';
    }
    return 'Para pedidos y servicios';
  };

  return (
    <>
      <SEO {...getAuthSEO(userType, authMode)} />

      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hookas.jpg)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Floating Background Icons */}
        <FloatingIcons />

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
          className="relative z-10 max-w-[600px] w-full mx-auto"
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
                <p className="text-gray-400 text-sm mt-2">{getPageDescription()}</p>
              </div>

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
                      {getOriginMessage()}
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
              <AuthForm
                authMode={authMode}
                userType={userType}
                formData={formData}
                onFormDataChange={handleFormDataChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                localErrors={localErrors}
                onLocalErrorsChange={setLocalErrors}
              />

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
