import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin } from 'lucide-react';
import type { Table } from '@modules/tables/types';
import {
  getTableStatusColor,
  getTableTypeColor,
  getStatusText,
  getTypeText,
} from '@modules/tables/utils';

interface TableCardProps {
  table: Table;
  isSelected: boolean;
  onSelect: (table: Table) => void;
  scale: number;
}

const TableCard = ({ table, isSelected, onSelect, scale }: TableCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = getTableStatusColor(table.status);
  const typeColor = getTableTypeColor(table.type);

  return (
    <>
      <motion.div
        className="absolute cursor-pointer select-none"
        style={{
          left: table.x * scale,
          top: table.y * scale,
          width: table.width * scale,
          height: table.height * scale,
        }}
        onClick={() => onSelect(table)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isSelected
            ? '0 0 0 3px #3B82F6, 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Mesa */}
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2"
          style={{
            backgroundColor: statusColor,
            borderColor: table.type === 'vip' ? typeColor : statusColor,
            opacity: table.status === 'maintenance' ? 0.6 : 1,
          }}
        >
          {/* Patrón de fondo para VIP */}
          {table.type === 'vip' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
              }}
            />
          )}

          {/* Número de mesa */}
          <span
            className="relative z-10 text-center font-bold text-white"
            style={{ fontSize: Math.max(12 * scale, 10) }}
          >
            {table.number}
          </span>

          {/* Indicador de reserva */}
          {table.status === 'reserved' && (
            <div
              className="absolute right-1 top-1 animate-pulse rounded-full bg-white"
              style={{ width: 6 * scale, height: 6 * scale }}
            />
          )}
        </div>

        {/* Información adicional al hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>
                  Mesa {table.number} - {getTypeText(table.type)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span>{table.seats} personas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{getStatusText(table.status)}</span>
              </div>
              {table.currentReservation && (
                <div className="text-xs text-yellow-300">
                  {table.currentReservation.customerName} -{' '}
                  {table.currentReservation.timeSlot}
                </div>
              )}
            </div>
            {/* Flecha hacia abajo */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 transform border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default TableCard;
