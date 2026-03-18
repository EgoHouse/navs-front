import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, User, UserPlus, Phone } from 'lucide-react';
import AddressAutocomplete from '@components/common/AddressAutocomplete';
import {
  validateEmail,
  validatePassword,
  formatSpanishPhone,
} from '@modules/auth/utils';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import ValidationIcon from './ValidationIcon';

interface AuthFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  confirmPassword: string;
}

interface AuthFormProps {
  authMode: 'login' | 'register';
  userType: 'admin' | 'user';
  formData: AuthFormData;
  onFormDataChange: (field: keyof AuthFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  localErrors: { [key: string]: string };
  onLocalErrorsChange: (errors: { [key: string]: string }) => void;
}

/**
 * Formulario de autenticación (login/registro)
 */
const AuthForm = ({
  authMode,
  userType,
  formData,
  onFormDataChange,
  onSubmit,
  isLoading,
  localErrors,
  onLocalErrorsChange,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | null
  >(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [isValidatingPhone, setIsValidatingPhone] = useState(false);

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    // Procesamiento específico por campo
    if (field === 'phoneNumber') {
      setIsValidatingPhone(true);
      setTimeout(() => setIsValidatingPhone(false), 500);
    } else if (field === 'email') {
      setIsValidatingEmail(true);
      setTimeout(() => {
        setIsValidatingEmail(false);
        if (value) {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) {
            onLocalErrorsChange({
              ...localErrors,
              email: emailValidation.error!,
            });
          } else {
            onLocalErrorsChange({ ...localErrors, email: '' });
          }
        }
      }, 800);
    } else if (field === 'password') {
      const passwordValidation = validatePassword(value);
      setPasswordStrength(passwordValidation.strength || null);
    }

    onFormDataChange(field, value);

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (localErrors[field] && field !== 'email') {
      const newErrors = { ...localErrors };
      delete newErrors[field];
      onLocalErrorsChange(newErrors);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name field - solo en registro de usuario */}
      {authMode === 'register' && userType === 'user' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre completo
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                localErrors.name
                  ? 'border-red-500'
                  : 'border-gray-600 focus:border-yellow-400'
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
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                localErrors.phoneNumber
                  ? 'border-red-500'
                  : 'border-gray-600 focus:border-yellow-400'
              }`}
              placeholder="+34 600 000 000"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ValidationIcon
                field="phoneNumber"
                value={formData.phoneNumber}
                error={localErrors.phoneNumber}
                isValidating={isValidatingPhone}
              />
            </div>
          </div>
          {localErrors.phoneNumber && (
            <p className="text-red-400 text-sm mt-1">{localErrors.phoneNumber}</p>
          )}
          {!localErrors.phoneNumber && formData.phoneNumber && (
            <p className="text-green-400 text-xs mt-1">
              ✓ Formato válido: {formatSpanishPhone(formData.phoneNumber)}
            </p>
          )}
        </div>
      )}

      {/* Address field - solo en registro de usuario (opcional) */}
      {authMode === 'register' && userType === 'user' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dirección <span className="text-gray-500">(opcional)</span>
          </label>
          <AddressAutocomplete
            value={formData.address}
            onChange={(address) => handleInputChange('address', address)}
            onSelect={(address) => handleInputChange('address', address)}
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
              localErrors.email
                ? 'border-red-500'
                : 'border-gray-600 focus:border-yellow-400'
            }`}
            placeholder="ejemplo@gmail.com"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <ValidationIcon
              field="email"
              value={formData.email}
              error={localErrors.email}
              isValidating={isValidatingEmail}
            />
          </div>
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
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {localErrors.password && (
          <p className="text-red-400 text-sm mt-1">{localErrors.password}</p>
        )}
        {authMode === 'register' && (
          <PasswordStrengthIndicator
            password={formData.password}
            strength={passwordStrength}
          />
        )}
      </div>

      {/* Confirm Password field - solo en registro de usuario */}
      {authMode === 'register' && userType === 'user' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
                localErrors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-600 focus:border-yellow-400'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
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
  );
};

export default AuthForm;
