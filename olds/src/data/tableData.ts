export interface Table {
  id: string;
  number: number;
  seats: number;
  x: number; // Posición X en el plano
  y: number; // Posición Y en el plano
  width: number;
  height: number;
  type: 'regular' | 'vip' | 'bar' | 'lounge';
  status: 'available' | 'occupied' | 'reserved' | 'cleaning' | 'maintenance';
  currentReservation?: Reservation;
  zone: 'interior' | 'terraza' | 'vip' | 'bar';
}

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
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
  createdAt: string;
  notes?: string;
  depositPaid?: boolean;
  totalAmount?: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  maxCapacity: number;
  currentBookings: number;
}

// Datos de ejemplo de mesas
export const mockTables: Table[] = [
  // Zona Interior
  {
    id: 't1',
    number: 1,
    seats: 4,
    x: 100,
    y: 100,
    width: 80,
    height: 80,
    type: 'regular',
    status: 'available',
    zone: 'interior',
  },
  {
    id: 't2',
    number: 2,
    seats: 4,
    x: 220,
    y: 100,
    width: 80,
    height: 80,
    type: 'regular',
    status: 'occupied',
    zone: 'interior',
  },
  {
    id: 't3',
    number: 3,
    seats: 6,
    x: 340,
    y: 100,
    width: 100,
    height: 80,
    type: 'regular',
    status: 'reserved',
    zone: 'interior',
  },
  {
    id: 't4',
    number: 4,
    seats: 2,
    x: 100,
    y: 220,
    width: 60,
    height: 60,
    type: 'regular',
    status: 'available',
    zone: 'interior',
  },
  {
    id: 't5',
    number: 5,
    seats: 2,
    x: 200,
    y: 220,
    width: 60,
    height: 60,
    type: 'regular',
    status: 'cleaning',
    zone: 'interior',
  },
  {
    id: 't6',
    number: 6,
    seats: 8,
    x: 300,
    y: 220,
    width: 120,
    height: 100,
    type: 'regular',
    status: 'available',
    zone: 'interior',
  },

  // Zona VIP
  {
    id: 'vip1',
    number: 101,
    seats: 6,
    x: 500,
    y: 100,
    width: 120,
    height: 100,
    type: 'vip',
    status: 'reserved',
    zone: 'vip',
  },
  {
    id: 'vip2',
    number: 102,
    seats: 8,
    x: 500,
    y: 220,
    width: 140,
    height: 120,
    type: 'vip',
    status: 'available',
    zone: 'vip',
  },

  // Zona Bar
  {
    id: 'bar1',
    number: 201,
    seats: 3,
    x: 100,
    y: 380,
    width: 100,
    height: 40,
    type: 'bar',
    status: 'occupied',
    zone: 'bar',
  },
  {
    id: 'bar2',
    number: 202,
    seats: 3,
    x: 220,
    y: 380,
    width: 100,
    height: 40,
    type: 'bar',
    status: 'available',
    zone: 'bar',
  },
  {
    id: 'bar3',
    number: 203,
    seats: 4,
    x: 340,
    y: 380,
    width: 120,
    height: 40,
    type: 'bar',
    status: 'available',
    zone: 'bar',
  },

  // Zona Terraza
  {
    id: 'ter1',
    number: 301,
    seats: 4,
    x: 700,
    y: 100,
    width: 80,
    height: 80,
    type: 'regular',
    status: 'available',
    zone: 'terraza',
  },
  {
    id: 'ter2',
    number: 302,
    seats: 6,
    x: 700,
    y: 220,
    width: 100,
    height: 80,
    type: 'regular',
    status: 'reserved',
    zone: 'terraza',
  },
  {
    id: 'ter3',
    number: 303,
    seats: 4,
    x: 820,
    y: 100,
    width: 80,
    height: 80,
    type: 'lounge',
    status: 'available',
    zone: 'terraza',
  },
  {
    id: 'ter4',
    number: 304,
    seats: 8,
    x: 820,
    y: 220,
    width: 120,
    height: 100,
    type: 'lounge',
    status: 'occupied',
    zone: 'terraza',
  },
];

// Datos de ejemplo de reservas
export const mockReservations: Reservation[] = [
  {
    id: 'res1',
    tableId: 't3',
    customerName: 'María García',
    customerPhone: '+34 666 777 888',
    customerEmail: 'maria@email.com',
    date: '2025-08-16',
    timeSlot: '20:00',
    duration: 3,
    partySize: 6,
    status: 'confirmed',
    createdAt: '2025-08-15T10:30:00Z',
    specialRequests: 'Celebración cumpleaños',
    depositPaid: true,
    totalAmount: 250,
  },
  {
    id: 'res2',
    tableId: 'vip1',
    customerName: 'Carlos Ruiz',
    customerPhone: '+34 699 888 999',
    date: '2025-08-16',
    timeSlot: '21:30',
    duration: 4,
    partySize: 6,
    status: 'confirmed',
    createdAt: '2025-08-14T15:20:00Z',
    notes: 'Cliente VIP - servicio premium',
    depositPaid: true,
    totalAmount: 450,
  },
  {
    id: 'res3',
    tableId: 'ter2',
    customerName: 'Ana López',
    customerPhone: '+34 677 555 444',
    date: '2025-08-16',
    timeSlot: '19:00',
    duration: 2,
    partySize: 4,
    status: 'pending',
    createdAt: '2025-08-16T08:15:00Z',
    specialRequests: 'Mesa en terraza, preferiblemente al aire libre',
  },
];

export const timeSlots: TimeSlot[] = [
  {
    id: '1',
    time: '18:00',
    available: true,
    maxCapacity: 50,
    currentBookings: 12,
  },
  {
    id: '2',
    time: '18:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 18,
  },
  {
    id: '3',
    time: '19:00',
    available: true,
    maxCapacity: 50,
    currentBookings: 25,
  },
  {
    id: '4',
    time: '19:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 32,
  },
  {
    id: '5',
    time: '20:00',
    available: true,
    maxCapacity: 50,
    currentBookings: 38,
  },
  {
    id: '6',
    time: '20:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 45,
  },
  {
    id: '7',
    time: '21:00',
    available: false,
    maxCapacity: 50,
    currentBookings: 50,
  },
  {
    id: '8',
    time: '21:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 42,
  },
  {
    id: '9',
    time: '22:00',
    available: true,
    maxCapacity: 50,
    currentBookings: 35,
  },
  {
    id: '10',
    time: '22:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 28,
  },
  {
    id: '11',
    time: '23:00',
    available: true,
    maxCapacity: 50,
    currentBookings: 20,
  },
  {
    id: '12',
    time: '23:30',
    available: true,
    maxCapacity: 50,
    currentBookings: 15,
  },
];

export const getTableStatusColor = (status: Table['status']) => {
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

export const getTableTypeColor = (type: Table['type']) => {
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
