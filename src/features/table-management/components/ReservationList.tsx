import { motion } from 'framer-motion';
import { Clock, Users, Phone, DollarSign, MapPin } from 'lucide-react';
import type { Reservation, Table } from '@modules/tables/types';

interface ReservationListProps {
  reservations: Reservation[];
  tables: Table[];
  selectedDate: string;
}

const ReservationList = ({
  reservations,
  tables,
  selectedDate,
}: ReservationListProps) => {
  if (reservations.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">
          Reservas de Hoy ({selectedDate})
        </h3>
        <p className="py-8 text-center text-gray-500">
          No hay reservas para esta fecha
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold">
        Reservas de Hoy ({selectedDate})
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border p-4 transition-shadow hover:shadow-md"
          >
            <div className="mb-2 flex items-start justify-between">
              <h4 className="font-semibold">{reservation.customerName}</h4>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  reservation.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : reservation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {reservation.status === 'confirmed'
                  ? 'Confirmada'
                  : reservation.status === 'pending'
                    ? 'Pendiente'
                    : reservation.status}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  Mesa {tables.find((t) => t.id === reservation.tableId)?.number}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {reservation.timeSlot} ({reservation.duration}h)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{reservation.partySize} personas</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{reservation.customerPhone}</span>
              </div>
              {reservation.totalAmount && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{reservation.totalAmount}€</span>
                </div>
              )}
            </div>
            {reservation.specialRequests && (
              <div className="mt-2 rounded bg-gray-50 p-2 text-xs text-gray-500">
                {reservation.specialRequests}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
