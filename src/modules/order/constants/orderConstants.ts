import { OrderType } from '../types/order.types';

/**
 * Configuración de tipos de pedido con precios y contenido
 */
export const ORDER_CONFIG = {
  [OrderType.CLASSIC]: {
    price: 4,
    food: ['Café', 'Zumo de naranja', 'Croissant'],
    label: 'Clásico',
  },
  [OrderType.TRADITIONAL]: {
    price: 5,
    food: ['Café', 'Zumo de naranja', 'Mollete de jamón'],
    label: 'Tradicional',
  },
  [OrderType.PREMIUM]: {
    price: 6,
    food: ['Café', 'Zumo de naranja', 'Mollete de aguacate y salmón'],
    label: 'Premium',
  },
} as const;
