import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '34646149112', // Formato internacional sin +
  defaultMessage = '¡Hola! Me interesa conocer más sobre EGO HOUSE Madrid. ¿Podrían darme información sobre reservas y servicios?',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Button Container */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6 mb-4 w-80 max-w-[calc(100vw-3rem)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">EGO HOUSE</h3>
                    <p className="text-sm text-gray-500">
                      Generalmente responde en minutos
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu mensaje:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                {/* Send Button */}
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar mensaje
                </motion.button>
              </div>

              {/* Quick Messages */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Mensajes rápidos:</p>
                <div className="space-y-1">
                  {[
                    '¿Cuál es el horario?',
                    'Quiero hacer una reserva',
                    '¿Qué servicios ofrecen?',
                  ].map((quickMessage, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(quickMessage)}
                      className="block w-full text-left text-xs text-gray-600 hover:text-green-600 transition-colors py-1"
                    >
                      • {quickMessage}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 group"
          aria-label="Abrir chat de WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          {!isExpanded && (
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          )}
        </motion.button>

        {/* Tooltip */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            ¿Necesitas ayuda?
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default WhatsAppButton;
