import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Table } from '../../data/tableData';
import { getTableStatusColor, getTableTypeColor } from '../../data/tableData';
import { Users, Clock, MapPin } from 'lucide-react';

interface TableComponentProps {
  table: Table;
  isSelected: boolean;
  onSelect: (table: Table) => void;
  scale: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  table,
  isSelected,
  onSelect,
  scale
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = getTableStatusColor(table.status);
  const typeColor = getTableTypeColor(table.type);

  const getStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'Libre';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'cleaning': return 'Limpieza';
      case 'maintenance': return 'Mantenimiento';
      default: return status;
    }
  };

  const getTypeText = (type: Table['type']) => {
    switch (type) {
      case 'regular': return 'Regular';
      case 'vip': return 'VIP';
      case 'bar': return 'Barra';
      case 'lounge': return 'Lounge';
      default: return type;
    }
  };

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
          className="w-full h-full rounded-lg border-2 flex items-center justify-center relative overflow-hidden"
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
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
              }}
            />
          )}

          {/* Número de mesa */}
          <span
            className="font-bold text-white text-center relative z-10"
            style={{ fontSize: Math.max(12 * scale, 10) }}
          >
            {table.number}
          </span>

          {/* Indicador de reserva */}
          {table.status === 'reserved' && (
            <div
              className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse"
              style={{ width: 6 * scale, height: 6 * scale }}
            />
          )}
        </div>

        {/* Información adicional al hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-50 shadow-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Mesa {table.number} - {getTypeText(table.type)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                <span>{table.seats} personas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{getStatusText(table.status)}</span>
              </div>
              {table.currentReservation && (
                <div className="text-yellow-300 text-xs">
                  {table.currentReservation.customerName} - {table.currentReservation.timeSlot}
                </div>
              )}
            </div>
            {/* Flecha hacia abajo */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default TableComponent;
