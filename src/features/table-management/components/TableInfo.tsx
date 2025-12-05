import { motion } from 'framer-motion';
import type { Table, TableStatus } from '@modules/tables/types';
import { getStatusSpanishText } from '@modules/tables/utils';

interface TableInfoProps {
  table: Table;
  onStatusChange: (tableId: string, newStatus: TableStatus) => void;
}

const TableInfo = ({ table, onStatusChange }: TableInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-white p-6 shadow"
    >
      <h3 className="mb-4 text-lg font-semibold">Mesa {table.number}</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Tipo:</span>
          <span className="capitalize">{table.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Capacidad:</span>
          <span>{table.seats} personas</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Zona:</span>
          <span className="capitalize">{table.zone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estado:</span>
          <span
            className={`capitalize ${
              table.status === 'available'
                ? 'text-green-600'
                : table.status === 'occupied'
                  ? 'text-red-600'
                  : table.status === 'reserved'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
            }`}
          >
            {getStatusSpanishText(table.status)}
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => onStatusChange(table.id, 'available')}
          className="w-full rounded-md bg-green-600 px-3 py-2 text-sm text-white transition-colors hover:bg-green-700"
        >
          Marcar Disponible
        </button>
        <button
          onClick={() => onStatusChange(table.id, 'occupied')}
          className="w-full rounded-md bg-red-600 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700"
        >
          Marcar Ocupada
        </button>
        <button
          onClick={() => onStatusChange(table.id, 'cleaning')}
          className="w-full rounded-md bg-gray-600 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-700"
        >
          Marcar Limpieza
        </button>
      </div>
    </motion.div>
  );
};

export default TableInfo;
