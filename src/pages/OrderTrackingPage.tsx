import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package,
  AlertTriangle,
  Loader2,
  Phone,
  Mail,
  Calendar,
  Hash
} from 'lucide-react';
import { orderService } from '../services/orderService';
import type { Order } from '../types/order.types';
import { OrderEventStatus } from '../types/order.types';
import BackToMenuButton from '../components/BackToMenuButton';
import SEOHead from '../components/SEOHead';

const OrderTrackingPage: React.FC = () => {
  const { trackingNumber: urlTrackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Load order on mount if tracking number is in URL
  useEffect(() => {
    if (urlTrackingNumber) {
      handleTrackOrder(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  const handleTrackOrder = async (trackingNum?: string) => {
    const numToTrack = trackingNum || trackingNumber;
    if (!numToTrack) {
      setError('Por favor ingresa un número de seguimiento');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const orderData = await orderService.getOrderByTracking(numToTrack);
      setOrder(orderData);
      
      // Update URL if not already there
      if (!urlTrackingNumber) {
        navigate(`/tracking/${numToTrack}`, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Error al buscar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventStatus: OrderEventStatus, currentStatus: OrderEventStatus) => {
    const isCompleted = getEventOrder(eventStatus) <= getEventOrder(currentStatus);
    const isCurrent = eventStatus === currentStatus;

    if (isCompleted) {
      switch (eventStatus) {
        case OrderEventStatus.RECIBIDO:
          return <Package className="w-6 h-6 text-white" />;
        case OrderEventStatus.EN_PREPARACION:
          return <Clock className="w-6 h-6 text-white" />;
        case OrderEventStatus.EN_CAMINO:
          return <Truck className="w-6 h-6 text-white" />;
        case OrderEventStatus.ENTREGADO:
          return <CheckCircle className="w-6 h-6 text-white" />;
        default:
          return <CheckCircle className="w-6 h-6 text-white" />;
      }
    } else if (isCurrent) {
      switch (eventStatus) {
        case OrderEventStatus.RECIBIDO:
          return <Package className="w-6 h-6 text-black" />;
        case OrderEventStatus.EN_PREPARACION:
          return <Clock className="w-6 h-6 text-black" />;
        case OrderEventStatus.EN_CAMINO:
          return <Truck className="w-6 h-6 text-black" />;
        case OrderEventStatus.ENTREGADO:
          return <CheckCircle className="w-6 h-6 text-black" />;
        default:
          return <Clock className="w-6 h-6 text-black" />;
      }
    } else {
      // Eventos futuros - iconos en gris
      switch (eventStatus) {
        case OrderEventStatus.RECIBIDO:
          return <Package className="w-6 h-6 text-gray-400" />;
        case OrderEventStatus.EN_PREPARACION:
          return <Clock className="w-6 h-6 text-gray-400" />;
        case OrderEventStatus.EN_CAMINO:
          return <Truck className="w-6 h-6 text-gray-400" />;
        case OrderEventStatus.ENTREGADO:
          return <CheckCircle className="w-6 h-6 text-gray-400" />;
        default:
          return <Clock className="w-6 h-6 text-gray-400" />;
      }
    }
  };

  const getEventOrder = (eventStatus: OrderEventStatus): number => {
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO: return 1;
      case OrderEventStatus.EN_PREPARACION: return 2;
      case OrderEventStatus.EN_CAMINO: return 3;
      case OrderEventStatus.ENTREGADO: return 4;
      default: return 0;
    }
  };

  const getEventLabel = (eventStatus: OrderEventStatus): string => {
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO: return 'Pedido Recibido';
      case OrderEventStatus.EN_PREPARACION: return 'En Preparación';
      case OrderEventStatus.EN_CAMINO: return 'En Camino';
      case OrderEventStatus.ENTREGADO: return 'Entregado';
      default: return 'Estado Desconocido';
    }
  };

  const getEventDescription = (eventStatus: OrderEventStatus): string => {
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO: return 'Hemos recibido tu pedido y lo estamos procesando';
      case OrderEventStatus.EN_PREPARACION: return 'Tu pedido está siendo preparado con cuidado';
      case OrderEventStatus.EN_CAMINO: return 'Tu pedido está en camino hacia ti';
      case OrderEventStatus.ENTREGADO: return 'Tu pedido ha sido entregado exitosamente';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  const eventStatuses = [
    OrderEventStatus.RECIBIDO,
    OrderEventStatus.EN_PREPARACION,
    OrderEventStatus.EN_CAMINO,
    OrderEventStatus.ENTREGADO
  ];

  // Función para obtener el estilo de eventos completados (sin transparencia)
  const getCompletedEventStyle = (eventStatus: OrderEventStatus): string => {
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO: return 'bg-blue-500 border-2 border-blue-400';
      case OrderEventStatus.EN_PREPARACION: return 'bg-yellow-500 border-2 border-yellow-400';
      case OrderEventStatus.EN_CAMINO: return 'bg-purple-500 border-2 border-purple-400';
      case OrderEventStatus.ENTREGADO: return 'bg-green-500 border-2 border-green-400';
      default: return 'bg-gray-500 border-2 border-gray-400';
    }
  };

  // Función para obtener el estilo de eventos pendientes (fondo gris hasta que se alcance el evento)
  const getPendingEventStyle = (): string => {
    return 'bg-gray-700 border-2 border-gray-600';
  };

  // Función para obtener el color de texto de eventos completados
  const getCompletedEventTextColor = (eventStatus: OrderEventStatus): string => {
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO: return 'text-blue-400';
      case OrderEventStatus.EN_PREPARACION: return 'text-yellow-400';
      case OrderEventStatus.EN_CAMINO: return 'text-purple-400';
      case OrderEventStatus.ENTREGADO: return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Función para obtener el color de texto de eventos pendientes (gris hasta que se alcance)
  const getPendingEventTextColor = (): string => {
    return 'text-gray-500';
  };

  return (
    <>
      <SEOHead 
        title="Seguimiento de Pedido - EGO HOUSE"
        description="Rastrea el estado de tu pedido en tiempo real"
      />
      
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6 py-8">
          <BackToMenuButton />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Seguimiento de Pedido
            </h1>
            <p className="text-gray-400 text-lg">
              Rastrea el estado de tu pedido en tiempo real
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
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
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <motion.button
                  onClick={() => handleTrackOrder()}
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

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
                  <AlertTriangle className="text-red-400 shrink-0" size={20} />
                  <span className="text-red-400">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order Details */}
          <AnimatePresence>
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Order Info */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Información del Pedido
                      </h3>
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
                          <span className="text-white">{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-yellow-400 font-bold">€</span>
                          <span className="text-gray-400">Total:</span>
                          <span className="text-white font-semibold">{formatPrice(order.price)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Información de Contacto
                      </h3>
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
                </div>

                {/* Timeline */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">
                    Estado del Pedido
                  </h3>
                  
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                    
                    <div className="space-y-8">
                      {eventStatuses.map((eventStatus, index) => {
                        const isCompleted = getEventOrder(eventStatus) <= getEventOrder(order.eventStatus);
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
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? getCompletedEventStyle(eventStatus)
                                : isCurrent
                                ? 'bg-yellow-500 border-2 border-yellow-400'
                                : getPendingEventStyle()
                            }`}>
                              {getEventIcon(eventStatus, order.eventStatus)}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h4 className={`text-lg font-semibold ${
                                isCompleted ? getCompletedEventTextColor(eventStatus) : isCurrent ? 'text-yellow-400' : getPendingEventTextColor()
                              }`}>
                                {getEventLabel(eventStatus)}
                              </h4>
                              <p className={
                                isCompleted ? 'text-gray-300' : isCurrent ? 'text-gray-400' : 'text-gray-600'
                              }>
                                {getEventDescription(eventStatus)}
                              </p>
                              {isCompleted && eventStatus === order.eventStatus && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Actualizado: {formatDate(order.updatedAt)}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Food Items */}
                {order.food && order.food.length > 0 && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Contenido del Pedido
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {order.food.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg">
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
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPage;