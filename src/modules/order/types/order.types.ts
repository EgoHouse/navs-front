/**
 * Estados del evento de seguimiento del pedido
 */
export type OrderEventStatus = 'recibido' | 'en_preparacion' | 'en_camino' | 'entregado';

export const OrderEventStatus = {
  RECIBIDO: 'recibido' as const,
  EN_PREPARACION: 'en_preparacion' as const,
  EN_CAMINO: 'en_camino' as const,
  ENTREGADO: 'entregado' as const,
} as const;

/**
 * Tipos de pedido disponibles
 */
export type OrderType = 'classic' | 'traditional' | 'premium';

export const OrderType = {
  CLASSIC: 'classic' as const,
  TRADITIONAL: 'traditional' as const,
  PREMIUM: 'premium' as const,
} as const;

/**
 * Interface principal de un pedido
 */
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
  status: 'pending' | 'open' | 'closed';
  trackingNumber: string;
  eventStatus: OrderEventStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO para crear un nuevo pedido
 */
export interface CreateOrderDto {
  name: string;
  phone: string;
  email: string;
  address?: string;
  quantity: number;
  observations?: string;
  type: OrderType;
  status?: 'pending' | 'open' | 'closed';
}

/**
 * DTO para actualizar un pedido existente
 */
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

/**
 * Estadísticas de pedidos (admin)
 */
export interface OrderStats {
  totalOrders: number;
  ordersByType: {
    type: string;
    count: number;
    totalRevenue: number;
  }[];
  totalRevenue: number;
}

/**
 * Filtros para búsqueda de pedidos (admin)
 */
export interface OrderFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  status?: string;
}
