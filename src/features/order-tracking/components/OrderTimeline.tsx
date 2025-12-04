import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import type { Order, OrderEventStatus } from '@modules/order';
import {
  EVENT_STATUSES,
  getEventOrder,
  getEventLabel,
  getEventDescription,
  getCompletedEventStyle,
  getPendingEventStyle,
  getCompletedEventTextColor,
  getPendingEventTextColor,
  formatOrderDate,
} from '@modules/order';

interface OrderTimelineProps {
  order: Order;
}

/**
 * Obtiene el icono correspondiente al estado del evento
 */
const getEventIcon = (
  eventStatus: OrderEventStatus,
  currentStatus: OrderEventStatus
) => {
  const isCompleted = getEventOrder(eventStatus) <= getEventOrder(currentStatus);
  const iconClass = isCompleted ? 'w-6 h-6 text-white' : 'w-6 h-6 text-gray-400';

  switch (eventStatus) {
    case 'recibido':
      return <Package className={iconClass} />;
    case 'en_preparacion':
      return <Clock className={iconClass} />;
    case 'en_camino':
      return <Truck className={iconClass} />;
    case 'entregado':
      return <CheckCircle className={iconClass} />;
    default:
      return <CheckCircle className={iconClass} />;
  }
};

/**
 * Timeline visual del estado del pedido
 */
const OrderTimeline = ({ order }: OrderTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        Estado del Pedido
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600" />

        <div className="space-y-8">
          {EVENT_STATUSES.map((eventStatus, index) => {
            const isCompleted =
              getEventOrder(eventStatus) <= getEventOrder(order.eventStatus);
            const isCurrent = eventStatus === order.eventStatus;

            return (
              <motion.div
                key={eventStatus}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center gap-6"
              >
                {/* Icon */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? getCompletedEventStyle(eventStatus)
                      : isCurrent
                      ? 'bg-yellow-500 border-2 border-yellow-400'
                      : getPendingEventStyle()
                  }`}
                >
                  {getEventIcon(eventStatus, order.eventStatus)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4
                    className={`text-lg font-semibold ${
                      isCompleted
                        ? getCompletedEventTextColor(eventStatus)
                        : isCurrent
                        ? 'text-yellow-400'
                        : getPendingEventTextColor()
                    }`}
                  >
                    {getEventLabel(eventStatus)}
                  </h4>
                  <p
                    className={
                      isCompleted
                        ? 'text-gray-300'
                        : isCurrent
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }
                  >
                    {getEventDescription(eventStatus)}
                  </p>
                  {isCompleted && eventStatus === order.eventStatus && (
                    <p className="text-sm text-gray-500 mt-1">
                      Actualizado: {formatOrderDate(order.updatedAt)}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderTimeline;
