import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

interface OrderSearchFormProps {
  trackingNumber: string;
  onTrackingNumberChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

/**
 * Formulario de búsqueda por número de seguimiento
 */
const OrderSearchForm = ({
  trackingNumber,
  onTrackingNumberChange,
  onSearch,
  loading,
}: OrderSearchFormProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-auto mb-12"
    >
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Ingresa tu número de seguimiento
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Número de seguimiento"
              value={trackingNumber}
              onChange={(e) => onTrackingNumberChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <motion.button
            onClick={onSearch}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Buscar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSearchForm;
