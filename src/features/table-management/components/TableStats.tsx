import { motion } from 'framer-motion';
import type { TableStats } from '@modules/tables/types';

interface TableStatsProps {
  stats: TableStats;
}

const TableStatsComponent = ({ stats }: TableStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg bg-white p-6 shadow"
    >
      <h3 className="mb-4 text-lg font-semibold">Estadísticas del Día</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Mesas:</span>
          <span className="font-bold">{stats.total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-600">Disponibles:</span>
          <span className="font-bold text-green-600">{stats.available}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-red-600">Ocupadas:</span>
          <span className="font-bold text-red-600">{stats.occupied}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-yellow-600">Reservadas:</span>
          <span className="font-bold text-yellow-600">{stats.reserved}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Ocupación:</span>
            <span className="font-bold text-blue-600">
              {stats.occupancyRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TableStatsComponent;
