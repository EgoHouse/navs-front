import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { orderService } from '../services';
import { useAuthWithServices } from '../hooks/useAuthWithServices';
import type { CreateOrderDto, OrderType } from '../types';
import { ORDER_CONFIG } from '../types/order.types';

interface OrderFormProps {
  selectedMenuType: OrderType;
  onSuccess: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ selectedMenuType, onSuccess }) => {
  const { user, isAuthenticated } = useAuthWithServices();
  const [formData, setFormData] = useState<CreateOrderDto>({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    observations: '',
    type: selectedMenuType
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Autocompletar datos del usuario si está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phoneNumber || '',
        email: user.email || '',
        address: user.address || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (field: keyof CreateOrderDto, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await orderService.createOrder(formData);
      onSuccess();
    } catch (error: any) {
      setError(error.message || 'Error al crear el pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalPrice = () => {
    return ORDER_CONFIG[selectedMenuType].price * formData.quantity;
  };

  const getMenuLabel = () => {
    return ORDER_CONFIG[selectedMenuType].label;
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/20"
    >
      <h3 className="text-2xl font-light text-white mb-4 text-center">
        Datos del pedido
      </h3>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Resumen del pedido */}
      <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
        <h4 className="text-white font-light mb-2">Resumen del pedido:</h4>
        <div className="flex justify-between items-center text-white/80">
          <span>{getMenuLabel()} x {formData.quantity}</span>
          <span className="font-medium">{getTotalPrice()}€</span>
        </div>
        <div className="mt-2 text-sm text-white/60">
          <p>Incluye:</p>
          <ul className="list-disc list-inside ml-2">
            {ORDER_CONFIG[selectedMenuType].food.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primera fila - Datos personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
            placeholder="+34 600 000 000"
          />
        </div>
      </div>

      {/* Segunda fila - Email y dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Email */}
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Cantidad
          </label>
          <select
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num} className="bg-black">
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tercera fila - Dirección (ancho completo) */}
      <div className="mb-6">
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Dirección <span className="text-white/50">(opcional)</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
            placeholder="Tu dirección de entrega"
          />
        </div>
      </div>

      {/* Observations */}
      <div className="mb-8">
        <label className="block text-white/70 text-sm mb-2">
          Observaciones (opcional)
        </label>
        <textarea
          value={formData.observations}
          onChange={(e) => handleInputChange('observations', e.target.value)}
          rows={3}
          className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors resize-none"
          placeholder="Alguna preferencia o comentario..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black px-8 py-3 font-light hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
              <span>Enviando pedido...</span>
            </span>
          ) : (
            'Realizar pedido'
          )}
        </button>
        <p className="text-white/50 text-sm mt-4">
          * Tu pedido será revisado por nuestro equipo
        </p>
      </div>
    </motion.form>
  );
};