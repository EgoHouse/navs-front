// types/order.types.ts
export type OrderEventStatus = 'recibido' | 'en_preparacion' | 'en_camino' | 'entregado';

export const OrderEventStatus = {
  RECIBIDO: 'recibido' as const,
  EN_PREPARACION: 'en_preparacion' as const,
  EN_CAMINO: 'en_camino' as const,
  ENTREGADO: 'entregado' as const
} as const;

export interface Order {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  quantity: number;
  observations?: string;
  type: OrderType;
  price: number;
  food: string[];
  // 'pending' -> initial state, 'open' -> active, 'closed' -> finished
  status: 'pending' | 'open' | 'closed';
  trackingNumber: string;
  eventStatus: OrderEventStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderType = 'classic' | 'traditional' | 'premium';

export const OrderType = {
  CLASSIC: 'classic' as const,
  TRADITIONAL: 'traditional' as const,
  PREMIUM: 'premium' as const
} as const;

export interface CreateOrderDto {
  name: string;
  phone: string;
  email: string;
  address?: string;
  quantity: number;
  observations?: string;
  type: OrderType;
  // When creating we usually start in 'pending', server can set default so optional
  status?: 'pending' | 'open' | 'closed';
}

export interface UpdateOrderDto {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  quantity?: number;
  observations?: string;
  type?: OrderType;
  status?: 'pending' | 'open' | 'closed';
  eventStatus?: OrderEventStatus;
}

export interface OrderStats {
  totalOrders: number;
  ordersByType: {
    type: string;
    count: number;
    totalRevenue: number;
  }[];
  totalRevenue: number;
}

// Configuración de tipos de pedido
export const ORDER_CONFIG = {
  [OrderType.CLASSIC]: {
    price: 4,
    food: ['Café', 'Zumo de naranja', 'Croissant'],
    label: 'Clásico'
  },
  [OrderType.TRADITIONAL]: {
    price: 5,
    food: ['Café', 'Zumo de naranja', 'Mollete de jamón'],
    label: 'Tradicional'
  },
  [OrderType.PREMIUM]: {
    price: 6,
    food: ['Café', 'Zumo de naranja', 'Mollete de aguacate y salmón'],
    label: 'Premium'
  }
} as const;