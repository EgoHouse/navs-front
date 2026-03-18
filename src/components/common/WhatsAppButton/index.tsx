import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import WhatsAppForm from './WhatsAppForm';
import { DEFAULT_PHONE, DEFAULT_MESSAGE } from './constants';
import type { WhatsAppButtonProps } from './types';

const WhatsAppButton = ({
  phoneNumber = DEFAULT_PHONE,
  defaultMessage = DEFAULT_MESSAGE,
}: WhatsAppButtonProps) => {
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
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <WhatsAppForm
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onClose={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-200 hover:bg-green-600 justify-self-end"
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
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-20" />
          )}
        </motion.button>

        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
