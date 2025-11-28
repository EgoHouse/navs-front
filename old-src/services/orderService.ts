import { apiClient } from '../utils/api';
import type { Order, CreateOrderDto, UpdateOrderDto, OrderStats } from '../types/order.types';

class OrderService {
  // Crear pedido (accesible para cualquier usuario autenticado)
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  }

  // Solo para administradores
  async getAllOrders(filters?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    status?: string;
  }): Promise<Order[]> {
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
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  }

  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}`, orderData);
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  }

  async getOrderStats(): Promise<OrderStats> {
    const response = await apiClient.get('/orders/stats');
    return response.data;
  }

  // Método para cerrar un pedido
  async closeOrder(id: string): Promise<Order> {
    // Use the generic update endpoint to set status to 'closed'
    const response = await this.updateOrder(id, { status: 'closed' });
    return response;
  }

  // Método para reabrir un pedido
  async reopenOrder(id: string): Promise<Order> {
    // Use the generic update endpoint to set status to 'open'
    const response = await this.updateOrder(id, { status: 'open' });
    return response;
  }

  // Get order by tracking number (public endpoint)
  async getOrderByTracking(trackingNumber: string): Promise<Order> {
    const response = await apiClient.get(`/orders/tracking/${trackingNumber}`);
    return response.data;
  }

  // Advance order to next event status
  async advanceOrderEventStatus(id: string, newEventStatus: string): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}/event-status`, {
      eventStatus: newEventStatus
    });
    return response.data;
  }
}

export const orderService = new OrderService();