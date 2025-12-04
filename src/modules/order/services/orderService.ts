import { orderApi } from '../api/orderApi';
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderStats,
  OrderFilters,
} from '../types/order.types';

/**
 * Servicio de lógica de negocio para pedidos
 */
export const orderService = {
  /**
   * Buscar pedido por número de seguimiento (público)
   */
  async trackOrder(trackingNumber: string): Promise<Order> {
    if (!trackingNumber.trim()) {
      throw new Error('El número de seguimiento es requerido');
    }
    return orderApi.getOrderByTracking(trackingNumber);
  },

  /**
   * Crear un nuevo pedido
   */
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    // Validaciones básicas
    if (!orderData.name.trim()) {
      throw new Error('El nombre es requerido');
    }
    if (!orderData.phone.trim()) {
      throw new Error('El teléfono es requerido');
    }
    if (!orderData.email.trim()) {
      throw new Error('El email es requerido');
    }
    if (orderData.quantity < 1) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    return orderApi.createOrder(orderData);
  },

  /**
   * Obtener todos los pedidos (admin)
   */
  async getAllOrders(filters?: OrderFilters): Promise<Order[]> {
    return orderApi.getAllOrders(filters);
  },

  /**
   * Obtener pedido por ID (admin)
   */
  async getOrderById(id: string): Promise<Order> {
    return orderApi.getOrderById(id);
  },

  /**
   * Actualizar pedido (admin)
   */
  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order> {
    return orderApi.updateOrder(id, orderData);
  },

  /**
   * Eliminar pedido (admin)
   */
  async deleteOrder(id: string): Promise<void> {
    return orderApi.deleteOrder(id);
  },

  /**
   * Obtener estadísticas (admin)
   */
  async getOrderStats(): Promise<OrderStats> {
    return orderApi.getOrderStats();
  },

  /**
   * Cerrar pedido (admin)
   */
  async closeOrder(id: string): Promise<Order> {
    return orderApi.closeOrder(id);
  },

  /**
   * Reabrir pedido (admin)
   */
  async reopenOrder(id: string): Promise<Order> {
    return orderApi.reopenOrder(id);
  },

  /**
   * Avanzar estado del evento (admin)
   */
  async advanceOrderEventStatus(id: string, newEventStatus: string): Promise<Order> {
    return orderApi.advanceOrderEventStatus(id, newEventStatus);
  },
};
