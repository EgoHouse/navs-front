import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  Plus,
  BarChart3,
} from 'lucide-react';

//* Libs
import { useSuccessMessage } from '@lib/hooks';

//* Modules
import type { Table, TableStatus } from '@modules/tables/types';
import {
  mockTables,
  mockReservations,
  ZONES,
  STATUSES,
} from '@modules/tables/constants';
import { calculateTableStats, getStatusSpanishText } from '@modules/tables/utils';

//* Components
import SuccessMessage from '@components/common/SuccessMessage';

//* Feature components
import TableCard from '../components/TableCard';
import TableStats from '../components/TableStats';
import TableFilters from '../components/TableFilters';
import TableInfo from '../components/TableInfo';
import ReservationList from '../components/ReservationList';

const TableManagementPage = () => {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [scale, setScale] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0] || ''
  );
  const [filterZone, setFilterZone] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStats, setShowStats] = useState(false);
  const {
    isVisible: successVisible,
    message: successMessage,
    showSuccess,
    hideSuccess,
  } = useSuccessMessage();

  const filteredTables = tables.filter((table) => {
    const matchesZone = filterZone === 'all' || table.zone === filterZone;
    const matchesStatus = filterStatus === 'all' || table.status === filterStatus;
    const matchesSearch =
      table.number.toString().includes(searchTerm) ||
      table.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesStatus && matchesSearch;
  });

  const stats = calculateTableStats(tables);

  const handleTableSelect = (table: Table) => {
    setSelectedTable(selectedTable?.id === table.id ? null : table);
  };

  const handleTableStatusChange = (tableId: string, newStatus: TableStatus) => {
    const table = tables.find((t) => t.id === tableId);
    if (table) {
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t))
      );

      showSuccess(`Mesa ${table.number} marcada como ${getStatusSpanishText(newStatus)}`);
    }
  };

  const todayReservations = mockReservations.filter(
    (res) => res.date === selectedDate
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Mesas
              </h1>
              <p className="text-gray-600">
                EGO HOUSE Madrid - Panel de Administración
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <BarChart3 className="h-4 w-4" />
                Estadísticas
              </button>
              <button
                onClick={() =>
                  showSuccess('Función de nueva reserva en desarrollo')
                }
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Nueva Reserva
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <SuccessMessage
          message={successMessage}
          isVisible={successVisible}
          onClose={hideSuccess}
          size="md"
          position="relative"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Panel de Control */}
          <div className="space-y-6 lg:col-span-1">
            {/* Estadísticas Rápidas */}
            <AnimatePresence>
              {showStats && <TableStats stats={stats} />}
            </AnimatePresence>

            {/* Filtros */}
            <TableFilters
              selectedDate={selectedDate}
              searchTerm={searchTerm}
              filterZone={filterZone}
              filterStatus={filterStatus}
              zones={ZONES}
              statuses={STATUSES}
              onDateChange={setSelectedDate}
              onSearchChange={setSearchTerm}
              onZoneChange={setFilterZone}
              onStatusChange={setFilterStatus}
            />

            {/* Información de Mesa Seleccionada */}
            {selectedTable && (
              <TableInfo
                table={selectedTable}
                onStatusChange={handleTableStatusChange}
              />
            )}
          </div>

          {/* Plano del Local */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Plano del Local</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    className="rounded-md bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="min-w-[60px] text-center text-sm text-gray-600">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale(Math.min(2, scale + 0.1))}
                    className="rounded-md bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Leyenda */}
              <div className="mb-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span>Ocupada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-yellow-500"></div>
                  <span>Reservada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-500"></div>
                  <span>Limpieza</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-purple-700 bg-purple-500"></div>
                  <span>VIP</span>
                </div>
              </div>

              {/* Plano */}
              <div
                className="relative overflow-auto rounded-lg border-2 border-gray-200 bg-gray-50"
                style={{ height: '600px' }}
              >
                {/* Etiquetas de Zonas */}
                <div className="absolute left-4 top-4 rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Interior
                </div>
                <div className="absolute right-1/4 top-4 rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  VIP
                </div>
                <div className="absolute bottom-20 left-4 rounded-lg bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-800">
                  Barra
                </div>
                <div className="absolute right-4 top-4 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Terraza
                </div>

                {/* Mesas */}
                {filteredTables.map((table) => (
                  <TableCard
                    key={table.id}
                    table={table}
                    isSelected={selectedTable?.id === table.id}
                    onSelect={handleTableSelect}
                    scale={scale}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reservas del Día */}
        <div className="mt-6">
          <ReservationList
            reservations={todayReservations}
            tables={tables}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default TableManagementPage;
