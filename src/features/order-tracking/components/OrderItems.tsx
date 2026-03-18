import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import type { Order } from '@modules/order';

interface OrderItemsProps {
  order: Order;
}

/**
 * Muestra los items del pedido
 */
const OrderItems = ({ order }: OrderItemsProps) => {
  if (!order.food || order.food.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Contenido del Pedido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {order.food.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg"
          >
            <Package className="w-5 h-5 text-yellow-400" />
            <span className="text-white">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Cantidad:</span>
          <span className="text-white font-semibold">{order.quantity}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderItems;
