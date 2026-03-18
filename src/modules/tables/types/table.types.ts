/**
 * Tipos de mesa
 */
export type TableType = 'regular' | 'vip' | 'bar' | 'lounge';

/**
 * Estados de mesa
 */
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning' | 'maintenance';

/**
 * Zonas del local
 */
export type TableZone = 'interior' | 'terraza' | 'vip' | 'bar';

/**
 * Estados de reserva
 */
export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';

/**
 * Interface de Reserva
 */
export interface Reservation {
  id: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  timeSlot: string;
  duration: number; // en horas
  partySize: number;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  notes?: string;
  depositPaid?: boolean;
  totalAmount?: number;
}

/**
 * Interface de Mesa
 */
export interface Table {
  id: string;
  number: number;
  seats: number;
  x: number; // Posición X en el plano
  y: number; // Posición Y en el plano
  width: number;
  height: number;
  type: TableType;
  status: TableStatus;
  currentReservation?: Reservation;
  zone: TableZone;
}

/**
 * Interface de TimeSlot
 */
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  maxCapacity: number;
  currentBookings: number;
}

/**
 * Interface de Zona
 */
export interface Zone {
  id: string;
  name: string;
  color: string;
}

/**
 * Interface de Estado
 */
export interface Status {
  id: string;
  name: string;
}

/**
 * Estadísticas de mesas
 */
export interface TableStats {
  total: number;
  available: number;
  occupied: number;
  reserved: number;
  occupancyRate: number;
}
