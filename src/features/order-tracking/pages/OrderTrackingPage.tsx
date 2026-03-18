import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

import SEO from '@components/common/SEO';
import { BackButton } from '@components/shared';
import { RouteHelpers } from '@lib/utils/routes';
import { orderService } from '@modules/order';
import type { Order } from '@modules/order';

import {
  OrderSearchForm,
  OrderInfo,
  OrderTimeline,
  OrderItems,
} from '../components';
import { TRACKING_SEO } from '../constants';

/**
 * Página de seguimiento de pedidos
 * Permite buscar un pedido por número de seguimiento y ver su estado
 */
const OrderTrackingPage = () => {
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
      const orderData = await orderService.trackOrder(numToTrack);
      setOrder(orderData);

      // Update URL if not already there
      if (!urlTrackingNumber) {
        navigate(RouteHelpers.tracking(numToTrack), { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Error al buscar el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO {...TRACKING_SEO} />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6 py-8">
          <BackButton />

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
          <OrderSearchForm
            trackingNumber={trackingNumber}
            onTrackingNumberChange={setTrackingNumber}
            onSearch={() => handleTrackOrder()}
            loading={loading}
          />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-auto mb-8"
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
              <div className="max-w-4xl mx-auto space-y-8">
                <OrderInfo order={order} />
                <OrderTimeline order={order} />
                <OrderItems order={order} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPage;
