import { motion } from 'framer-motion';
import { Hash, Package, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import type { Order } from '@modules/order';
import { formatOrderDate, formatPrice } from '@modules/order';

interface OrderInfoProps {
  order: Order;
}

/**
 * Muestra la información detallada del pedido
 */
const OrderInfo = ({ order }: OrderInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información del Pedido */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Información del Pedido</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Número de seguimiento:</span>
              <span className="text-white font-mono">{order.trackingNumber}</span>
            </div>
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Tipo:</span>
              <span className="text-white capitalize">{order.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Fecha del pedido:</span>
              <span className="text-white">{formatOrderDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-bold">€</span>
              <span className="text-gray-400">Total:</span>
              <span className="text-white font-semibold">{formatPrice(order.price)}</span>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-yellow-400">👤</span>
              <span className="text-gray-400">Nombre:</span>
              <span className="text-white">{order.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Teléfono:</span>
              <span className="text-white">{order.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{order.email}</span>
            </div>
            {order.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                <span className="text-gray-400">Dirección:</span>
                <span className="text-white">{order.address}</span>
              </div>
            )}
            {order.observations && (
              <div className="flex flex-col gap-2">
                <span className="text-gray-400">Observaciones:</span>
                <span className="text-white bg-gray-900 p-3 rounded-lg">
                  {order.observations}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderInfo;
