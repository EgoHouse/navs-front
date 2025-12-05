import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@modules/auth';
import { orderService } from '@modules/order';
import { ORDER_CONFIG } from '@modules/order/constants';
import type { CreateOrderDto, OrderType } from '@modules/order/types';

interface OrderFormProps {
  selectedMenuType: OrderType;
  onSuccess: () => void;
}

const OrderForm = ({ selectedMenuType, onSuccess }: OrderFormProps) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<CreateOrderDto>({
    name: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    observations: '',
    type: selectedMenuType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Autocompletar datos del usuario si está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        phone: user.phoneNumber || '',
        email: user.email || '',
        address: user.address || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (field: keyof CreateOrderDto, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      className="rounded-lg border border-white/20 bg-white/5 p-8 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-center text-2xl font-light text-white">
        Datos del pedido
      </h3>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/20 p-4">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* Resumen del pedido */}
      <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h4 className="mb-2 font-light text-white">Resumen del pedido:</h4>
        <div className="flex items-center justify-between text-white/80">
          <span>
            {getMenuLabel()} x {formData.quantity}
          </span>
          <span className="font-medium">{getTotalPrice()}€</span>
        </div>
        <div className="mt-2 text-sm text-white/60">
          <p>Incluye:</p>
          <ul className="ml-2 list-inside list-disc">
            {ORDER_CONFIG[selectedMenuType].food.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primera fila - Datos personales */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Nombre completo *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white focus:outline-none"
            placeholder="Tu nombre"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Teléfono *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white focus:outline-none"
            placeholder="+34 600 000 000"
          />
        </div>
      </div>

      {/* Segunda fila - Email y cantidad */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white focus:outline-none"
            placeholder="tu@email.com"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Cantidad</label>
          <select
            value={formData.quantity}
            onChange={(e) =>
              handleInputChange('quantity', parseInt(e.target.value))
            }
            className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
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
          <label className="mb-2 block text-sm text-white/70">
            Dirección <span className="text-white/50">(opcional)</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full rounded border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white focus:outline-none"
            placeholder="Tu dirección de entrega"
          />
        </div>
      </div>

      {/* Observations */}
      <div className="mb-8">
        <label className="mb-2 block text-sm text-white/70">
          Observaciones (opcional)
        </label>
        <textarea
          value={formData.observations}
          onChange={(e) => handleInputChange('observations', e.target.value)}
          rows={3}
          className="w-full resize-none rounded border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition-colors focus:border-white focus:outline-none"
          placeholder="Alguna preferencia o comentario..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white px-8 py-3 font-light text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-black" />
              <span>Enviando pedido...</span>
            </span>
          ) : (
            'Realizar pedido'
          )}
        </button>
        <p className="mt-4 text-sm text-white/50">
          * Tu pedido será revisado por nuestro equipo
        </p>
      </div>
    </motion.form>
  );
};

export default OrderForm;
