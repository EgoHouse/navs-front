import { Search } from 'lucide-react';
import type { Zone, Status } from '@modules/tables/types';

interface TableFiltersProps {
  selectedDate: string;
  searchTerm: string;
  filterZone: string;
  filterStatus: string;
  zones: Zone[];
  statuses: Status[];
  onDateChange: (date: string) => void;
  onSearchChange: (term: string) => void;
  onZoneChange: (zone: string) => void;
  onStatusChange: (status: string) => void;
}

const TableFilters = ({
  selectedDate,
  searchTerm,
  filterZone,
  filterStatus,
  zones,
  statuses,
  onDateChange,
  onSearchChange,
  onZoneChange,
  onStatusChange,
}: TableFiltersProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold">Filtros</h3>

      {/* Fecha */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Búsqueda */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Buscar Mesa
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Número o zona..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Zona */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Zona
        </label>
        <select
          value={filterZone}
          onChange={(e) => onZoneChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        >
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      {/* Estado */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableFilters;
