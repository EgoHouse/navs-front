import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { QUICK_MESSAGES } from './constants';

interface WhatsAppFormProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onClose: () => void;
}

const WhatsAppForm = ({ message, onMessageChange, onSend, onClose }: WhatsAppFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.2 }}
      className="mb-4 w-80 max-w-[calc(100vw-3rem)] rounded-2xl bg-white p-6 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-13 items-center justify-center rounded-full bg-green-500">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">EGO HOUSE</h3>
            <p className="text-sm text-gray-500">Generalmente responde en minutos</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tu mensaje:
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-black focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <motion.button
          onClick={onSend}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" />
          Enviar mensaje
        </motion.button>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="mb-2 text-xs text-gray-500">Mensajes rápidos:</p>
        <div className="space-y-1">
          {QUICK_MESSAGES.map((quickMessage, index) => (
            <button
              key={index}
              onClick={() => onMessageChange(quickMessage)}
              className="cursor-pointer block w-full py-1 text-left text-xs text-gray-600 transition-colors hover:text-green-600"
            >
              • {quickMessage}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WhatsAppForm;
