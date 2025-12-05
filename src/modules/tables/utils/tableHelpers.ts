import type { Table, TableStatus, TableType } from '../types';

/**
 * Obtiene el color según el estado de la mesa
 */
export const getTableStatusColor = (status: TableStatus): string => {
  switch (status) {
    case 'available':
      return '#22C55E'; // Verde
    case 'occupied':
      return '#EF4444'; // Rojo
    case 'reserved':
      return '#F59E0B'; // Amarillo
    case 'cleaning':
      return '#6B7280'; // Gris
    case 'maintenance':
      return '#8B5CF6'; // Púrpura
    default:
      return '#6B7280';
  }
};

/**
 * Obtiene el color según el tipo de mesa
 */
export const getTableTypeColor = (type: TableType): string => {
  switch (type) {
    case 'vip':
      return '#8B5CF6'; // Púrpura
    case 'bar':
      return '#06B6D4'; // Cyan
    case 'lounge':
      return '#EC4899'; // Rosa
    default:
      return '#374151'; // Gris oscuro
  }
};

/**
 * Obtiene el texto del estado de la mesa
 */
export const getStatusText = (status: TableStatus): string => {
  switch (status) {
    case 'available':
      return 'Libre';
    case 'occupied':
      return 'Ocupada';
    case 'reserved':
      return 'Reservada';
    case 'cleaning':
      return 'Limpieza';
    case 'maintenance':
      return 'Mantenimiento';
    default:
      return status;
  }
};

/**
 * Obtiene el texto del tipo de mesa
 */
export const getTypeText = (type: TableType): string => {
  switch (type) {
    case 'regular':
      return 'Regular';
    case 'vip':
      return 'VIP';
    case 'bar':
      return 'Barra';
    case 'lounge':
      return 'Lounge';
    default:
      return type;
  }
};

/**
 * Obtiene el texto en español del estado de la mesa para mensajes
 */
export const getStatusSpanishText = (status: TableStatus): string => {
  const statusMap: Record<TableStatus, string> = {
    available: 'disponible',
    occupied: 'ocupada',
    reserved: 'reservada',
    cleaning: 'en limpieza',
    maintenance: 'en mantenimiento',
  };
  return statusMap[status] || status;
};

/**
 * Calcula estadísticas de las mesas
 */
export const calculateTableStats = (tables: Table[]) => {
  const total = tables.length;
  const available = tables.filter((t) => t.status === 'available').length;
  const occupied = tables.filter((t) => t.status === 'occupied').length;
  const reserved = tables.filter((t) => t.status === 'reserved').length;
  const occupancyRate = ((occupied + reserved) / total) * 100;

  return { total, available, occupied, reserved, occupancyRate };
};
