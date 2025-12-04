import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { validateEmail, validateSpanishPhone } from '@modules/auth/utils';

interface ValidationIconProps {
  field: 'email' | 'phoneNumber';
  value: string;
  error?: string | undefined;
  isValidating: boolean;
}

/**
 * Icono de validación en tiempo real para campos de formulario
 */
const ValidationIcon = ({ field, value, error, isValidating }: ValidationIconProps) => {
  if (isValidating) {
    return <Loader2 size={16} className="animate-spin text-yellow-400" />;
  }

  if (error) {
    return <XCircle size={16} className="text-red-400" />;
  }

  if (value && !error) {
    if (field === 'email') {
      const validation = validateEmail(value);
      return validation.isValid ? (
        <CheckCircle size={16} className="text-green-400" />
      ) : null;
    }
    if (field === 'phoneNumber') {
      const validation = validateSpanishPhone(value);
      return validation.isValid ? (
        <CheckCircle size={16} className="text-green-400" />
      ) : null;
    }
  }

  return null;
};

export default ValidationIcon;
