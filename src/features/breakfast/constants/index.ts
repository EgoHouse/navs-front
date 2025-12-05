import { ORDER_CONFIG } from '@modules/order/constants';
import type { OrderType } from '@modules/order/types';

/**
 * Interface para los menús de desayuno
 */
export interface BreakfastMenu {
  type: OrderType;
  name: string;
  description: string;
  price: number;
  items: readonly string[];
}

/**
 * Menús de desayuno disponibles
 */
export const BREAKFAST_MENUS: BreakfastMenu[] = [
  {
    type: 'classic',
    name: 'Desayuno Clásico',
    description: 'La combinación perfecta para empezar el día',
    price: ORDER_CONFIG['classic'].price,
    items: ORDER_CONFIG['classic'].food,
  },
  {
    type: 'traditional',
    name: 'Desayuno Tradicional',
    description: 'Sabor auténtico con mollete de jamón',
    price: ORDER_CONFIG['traditional'].price,
    items: ORDER_CONFIG['traditional'].food,
  },
  {
    type: 'premium',
    name: 'Desayuno Premium',
    description: 'Una experiencia gourmet para paladares exigentes',
    price: ORDER_CONFIG['premium'].price,
    items: ORDER_CONFIG['premium'].food,
  },
];
