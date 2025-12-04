import { apiClient } from '@lib/api/apiClient';
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderStats,
  OrderFilters,
} from '../types/order.types';

/**
 * API para gestión de pedidos
 */
export const orderApi = {
  /**
   * Crear un nuevo pedido (público/autenticado)
   */
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  /**
   * Obtener pedido por número de seguimiento (público)
   */
  async getOrderByTracking(trackingNumber: string): Promise<Order> {
    const response = await apiClient.get(`/orders/tracking/${trackingNumber}`);
    return response.data;
  },

  /**
   * Obtener todos los pedidos con filtros (admin)
   */
  async getAllOrders(filters?: OrderFilters): Promise<Order[]> {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);

    const queryString = params.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';

    const response = await apiClient.get(url);
    return response.data;
  },

  /**
   * Obtener pedido por ID (admin)
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  /**
   * Actualizar pedido (admin)
   */
  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}`, orderData);
    return response.data;
  },

  /**
   * Eliminar pedido (admin)
   */
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  },

  /**
   * Obtener estadísticas de pedidos (admin)
   */
  async getOrderStats(): Promise<OrderStats> {
    const response = await apiClient.get('/orders/stats');
    return response.data;
  },

  /**
   * Cerrar un pedido (admin)
   */
  async closeOrder(id: string): Promise<Order> {
    return this.updateOrder(id, { status: 'closed' });
  },

  /**
   * Reabrir un pedido (admin)
   */
  async reopenOrder(id: string): Promise<Order> {
    return this.updateOrder(id, { status: 'open' });
  },

  /**
   * Avanzar el estado del evento de un pedido (admin)
   */
  async advanceOrderEventStatus(id: string, newEventStatus: string): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}/event-status`, {
      eventStatus: newEventStatus,
    });
    return response.data;
  },
};
