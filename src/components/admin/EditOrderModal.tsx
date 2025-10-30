import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle, Save } from 'lucide-react';
import { orderService } from '../../services';
import type { Order, UpdateOrderDto, OrderType } from '../../types';
import { ORDER_CONFIG } from '../../types/order.types';

interface EditOrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState<UpdateOrderDto>({
    name: order.name,
    phone: order.phone,
    email: order.email,
    quantity: order.quantity,
    observations: order.observations || '',
    type: order.type
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Resetear form cuando cambie el pedido
  useEffect(() => {
    setFormData({
      name: order.name,
      phone: order.phone,
      email: order.email,
      quantity: order.quantity,
      observations: order.observations || '',
      type: order.type
    });
    setError('');
  }, [order]);

  // Bloquear scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll del body agregando overflow hidden
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restaurar el scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Manejar tecla Escape para cerrar modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await orderService.updateOrder(order.id, formData);
      onUpdate();
      onClose();
    } catch (error: any) {
      setError(error.message || 'Error al actualizar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateOrderDto, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getOrderTypeLabel = (type: OrderType) => {
    return ORDER_CONFIG[type]?.label || type;
  };

  const calculateTotalPrice = () => {
    const pricePerUnit = ORDER_CONFIG[formData.type!]?.price || 0;
    return pricePerUnit * formData.quantity!;
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto z-10">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Editar Pedido
                </h3>
                <p className="text-gray-400 text-sm">Modifica la información del pedido</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Información del cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>

              {/* Detalles del pedido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Pedido *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as OrderType)}
                  >
                    <option value="classic">Clásico - 4€</option>
                    <option value="traditional">Tradicional - 5€</option>
                    <option value="premium">Premium - 6€</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* Precio calculado */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-300">
                    Precio Total:
                  </span>
                  <span className="text-xl font-bold text-yellow-400">
                    {calculateTotalPrice()}€
                  </span>
                </div>
                {formData.type && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      {getOrderTypeLabel(formData.type)} - {ORDER_CONFIG[formData.type].price}€ x {formData.quantity}
                    </p>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Incluye:</p>
                      <div className="space-y-1">
                        {ORDER_CONFIG[formData.type].food.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                            <span className="text-xs text-gray-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Observaciones
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
                  placeholder="Observaciones especiales..."
                  value={formData.observations}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-3 justify-end mt-8 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};