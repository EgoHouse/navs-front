interface PasswordStrengthIndicatorProps {
  password: string;
  strength: 'weak' | 'medium' | 'strong' | null;
}

/**
 * Indicador visual de fortaleza de contraseña
 */
const PasswordStrengthIndicator = ({ password, strength }: PasswordStrengthIndicatorProps) => {
  if (!strength || !password) return null;

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

  const config = strengthConfig[strength];

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs ${config.color}`}>Fortaleza: {config.label}</span>
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

export default PasswordStrengthIndicator;
