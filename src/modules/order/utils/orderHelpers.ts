import { OrderEventStatus } from '../types/order.types';

/**
 * Obtiene el orden numérico de un estado de evento
 */
export const getEventOrder = (eventStatus: OrderEventStatus): number => {
  switch (eventStatus) {
    case OrderEventStatus.RECIBIDO:
      return 1;
    case OrderEventStatus.EN_PREPARACION:
      return 2;
    case OrderEventStatus.EN_CAMINO:
      return 3;
    case OrderEventStatus.ENTREGADO:
      return 4;
    default:
      return 0;
  }
};

/**
 * Obtiene la etiqueta legible de un estado de evento
 */
export const getEventLabel = (eventStatus: OrderEventStatus): string => {
  switch (eventStatus) {
    case OrderEventStatus.RECIBIDO:
      return 'Pedido Recibido';
    case OrderEventStatus.EN_PREPARACION:
      return 'En Preparación';
    case OrderEventStatus.EN_CAMINO:
      return 'En Camino';
    case OrderEventStatus.ENTREGADO:
      return 'Entregado';
    default:
      return 'Estado Desconocido';
  }
};

/**
 * Obtiene la descripción de un estado de evento
 */
export const getEventDescription = (eventStatus: OrderEventStatus): string => {
  switch (eventStatus) {
    case OrderEventStatus.RECIBIDO:
      return 'Hemos recibido tu pedido y lo estamos procesando';
    case OrderEventStatus.EN_PREPARACION:
      return 'Tu pedido está siendo preparado con cuidado';
    case OrderEventStatus.EN_CAMINO:
      return 'Tu pedido está en camino hacia ti';
    case OrderEventStatus.ENTREGADO:
      return 'Tu pedido ha sido entregado exitosamente';
    default:
      return '';
  }
};

/**
 * Obtiene el estilo de color para eventos completados
 */
export const getCompletedEventStyle = (eventStatus: OrderEventStatus): string => {
  switch (eventStatus) {
    case OrderEventStatus.RECIBIDO:
      return 'bg-blue-500 border-2 border-blue-400';
    case OrderEventStatus.EN_PREPARACION:
      return 'bg-yellow-500 border-2 border-yellow-400';
    case OrderEventStatus.EN_CAMINO:
      return 'bg-purple-500 border-2 border-purple-400';
    case OrderEventStatus.ENTREGADO:
      return 'bg-green-500 border-2 border-green-400';
    default:
      return 'bg-gray-500 border-2 border-gray-400';
  }
};

/**
 * Obtiene el estilo de color para eventos pendientes
 */
export const getPendingEventStyle = (): string => {
  return 'bg-gray-700 border-2 border-gray-600';
};

/**
 * Obtiene el color de texto para eventos completados
 */
export const getCompletedEventTextColor = (eventStatus: OrderEventStatus): string => {
  switch (eventStatus) {
    case OrderEventStatus.RECIBIDO:
      return 'text-blue-400';
    case OrderEventStatus.EN_PREPARACION:
      return 'text-yellow-400';
    case OrderEventStatus.EN_CAMINO:
      return 'text-purple-400';
    case OrderEventStatus.ENTREGADO:
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};

/**
 * Obtiene el color de texto para eventos pendientes
 */
export const getPendingEventTextColor = (): string => {
  return 'text-gray-500';
};

/**
 * Formatea una fecha en formato español
 */
export const formatOrderDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formatea un precio en euros
 */
export const formatPrice = (price: number): string => {
  return `€${price.toFixed(2)}`;
};

/**
 * Lista ordenada de estados de evento
 */
export const EVENT_STATUSES = [
  OrderEventStatus.RECIBIDO,
  OrderEventStatus.EN_PREPARACION,
  OrderEventStatus.EN_CAMINO,
  OrderEventStatus.ENTREGADO,
] as const;
