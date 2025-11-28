import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

interface SuccessMessageProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  position?: 'fixed' | 'relative';
  type?: MessageType;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  isVisible,
  onClose,
  autoHideDuration = 3000,
  showCloseButton = false,
  size = 'md',
  position = 'relative',
  type = 'success'
}) => {
  // Auto-hide functionality
  React.useEffect(() => {
    if (isVisible && autoHideDuration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const positionClasses = position === 'fixed' 
    ? 'fixed top-4 right-4 z-50 max-w-md'
    : 'w-full';

  const getMessageConfig = (messageType: MessageType) => {
    switch (messageType) {
      case 'success':
        return {
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          borderLeftColor: 'border-l-green-400',
          textColor: 'text-green-400',
          icon: CheckCircle
        };
      case 'error':
        return {
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          borderLeftColor: 'border-l-red-400',
          textColor: 'text-red-400',
          icon: AlertCircle
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          borderLeftColor: 'border-l-yellow-400',
          textColor: 'text-yellow-400',
          icon: AlertTriangle
        };
      case 'info':
        return {
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          borderLeftColor: 'border-l-blue-400',
          textColor: 'text-blue-400',
          icon: Info
        };
      default:
        return {
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          borderLeftColor: 'border-l-green-400',
          textColor: 'text-green-400',
          icon: CheckCircle
        };
    }
  };

  const config = getMessageConfig(type);
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`
            ${positionClasses}
            ${sizeClasses[size]}
            ${config.bgColor}
            border ${config.borderColor}
            rounded-lg 
            flex items-center space-x-3
            backdrop-blur-sm
            shadow-lg
            border-l-4 ${config.borderLeftColor}
          `}
        >
          {/* Message Icon */}
          <div className="shrink-0">
            <IconComponent 
              className={config.textColor} 
              size={iconSizes[size]} 
            />
          </div>
          
          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className={`${config.textColor} font-medium`}>
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className={`shrink-0 p-1 ${config.textColor}/70 hover:${config.textColor} hover:${config.bgColor} rounded-md transition-colors`}
              aria-label="Cerrar mensaje"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessMessage;