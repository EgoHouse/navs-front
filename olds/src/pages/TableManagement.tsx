import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Table } from '../data/tableData';
import { mockTables, mockReservations } from '../data/tableData';
import TableComponent from '../components/admin/TableComponent';
import { useSuccessMessage } from '../hooks';
import SuccessMessage from '../components/SuccessMessage';
import {
  ZoomIn,
  ZoomOut,
  Clock,
  Users,
  Phone,
  DollarSign,
  Search,
  Plus,
  BarChart3,
  MapPin
} from 'lucide-react';

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [scale, setScale] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterZone, setFilterZone] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStats, setShowStats] = useState(false);
  const { isVisible: successVisible, message: successMessage, showSuccess, hideSuccess } = useSuccessMessage();

  const zones = [
    { id: 'all', name: 'Todas las zonas', color: '#6B7280' },
    { id: 'interior', name: 'Interior', color: '#3B82F6' },
    { id: 'terraza', name: 'Terraza', color: '#10B981' },
    { id: 'vip', name: 'VIP', color: '#8B5CF6' },
    { id: 'bar', name: 'Barra', color: '#06B6D4' },
  ];

  const statuses = [
    { id: 'all', name: 'Todos los estados' },
    { id: 'available', name: 'Disponible' },
    { id: 'occupied', name: 'Ocupada' },
    { id: 'reserved', name: 'Reservada' },
    { id: 'cleaning', name: 'Limpieza' },
  ];

  const filteredTables = tables.filter(table => {
    const matchesZone = filterZone === 'all' || table.zone === filterZone;
    const matchesStatus = filterStatus === 'all' || table.status === filterStatus;
    const matchesSearch = table.number.toString().includes(searchTerm) ||
                         table.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesStatus && matchesSearch;
  });

  const getStats = () => {
    const total = tables.length;
    const available = tables.filter(t => t.status === 'available').length;
    const occupied = tables.filter(t => t.status === 'occupied').length;
    const reserved = tables.filter(t => t.status === 'reserved').length;
    const occupancyRate = ((occupied + reserved) / total) * 100;

    return { total, available, occupied, reserved, occupancyRate };
  };

  const stats = getStats();

  const handleTableSelect = (table: Table) => {
    setSelectedTable(selectedTable?.id === table.id ? null : table);
  };

  const handleTableStatusChange = (tableId: string, newStatus: Table['status']) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      setTables(prev => prev.map(t =>
        t.id === tableId ? { ...t, status: newStatus } : t
      ));
      
      const statusText = {
        'available': 'disponible',
        'occupied': 'ocupada',
        'reserved': 'reservada',
        'cleaning': 'en limpieza',
        'maintenance': 'en mantenimiento'
      }[newStatus] || newStatus;
      
      showSuccess(`Mesa ${table.number} marcada como ${statusText}`);
    }
  };

  const todayReservations = mockReservations.filter(res => res.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Mesas</h1>
              <p className="text-gray-600">EGO HOUSE Madrid - Panel de Administración</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Estadísticas
              </button>
              <button
                onClick={() => showSuccess('Función de nueva reserva en desarrollo')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nueva Reserva
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SuccessMessage
          message={successMessage}
          isVisible={successVisible}
          onClose={hideSuccess}
          size="md"
          position="relative"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-6">
            {/* Estadísticas Rápidas */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <h3 className="text-lg font-semibold mb-4">Estadísticas del Día</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Mesas:</span>
                      <span className="font-bold">{stats.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600">Disponibles:</span>
                      <span className="font-bold text-green-600">{stats.available}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600">Ocupadas:</span>
                      <span className="font-bold text-red-600">{stats.occupied}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-600">Reservadas:</span>
                      <span className="font-bold text-yellow-600">{stats.reserved}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ocupación:</span>
                        <span className="font-bold text-blue-600">{stats.occupancyRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>

              {/* Fecha */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Búsqueda */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Mesa
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Número o zona..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Zona */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona
                </label>
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Información de Mesa Seleccionada */}
            {selectedTable && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Mesa {selectedTable.number}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="capitalize">{selectedTable.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacidad:</span>
                    <span>{selectedTable.seats} personas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zona:</span>
                    <span className="capitalize">{selectedTable.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`capitalize ${
                      selectedTable.status === 'available' ? 'text-green-600' :
                      selectedTable.status === 'occupied' ? 'text-red-600' :
                      selectedTable.status === 'reserved' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {selectedTable.status === 'available' ? 'Disponible' :
                       selectedTable.status === 'occupied' ? 'Ocupada' :
                       selectedTable.status === 'reserved' ? 'Reservada' :
                       selectedTable.status === 'cleaning' ? 'Limpieza' : selectedTable.status}
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleTableStatusChange(selectedTable.id, 'available')}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Marcar Disponible
                  </button>
                  <button
                    onClick={() => handleTableStatusChange(selectedTable.id, 'occupied')}
                    className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    Marcar Ocupada
                  </button>
                  <button
                    onClick={() => handleTableStatusChange(selectedTable.id, 'cleaning')}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                  >
                    Marcar Limpieza
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Plano del Local */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Plano del Local</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale(Math.min(2, scale + 0.1))}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Leyenda */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Ocupada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Reservada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span>Limpieza</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded border-2 border-purple-700"></div>
                  <span>VIP</span>
                </div>
              </div>

              {/* Plano */}
              <div
                className="relative bg-gray-50 border-2 border-gray-200 rounded-lg overflow-auto"
                style={{ height: '600px' }}
              >
                {/* Etiquetas de Zonas */}
                <div className="absolute top-4 left-4 bg-blue-100 px-3 py-1 rounded-lg text-blue-800 font-medium text-sm">
                  Interior
                </div>
                <div className="absolute top-4 right-1/4 bg-purple-100 px-3 py-1 rounded-lg text-purple-800 font-medium text-sm">
                  VIP
                </div>
                <div className="absolute bottom-20 left-4 bg-cyan-100 px-3 py-1 rounded-lg text-cyan-800 font-medium text-sm">
                  Barra
                </div>
                <div className="absolute top-4 right-4 bg-green-100 px-3 py-1 rounded-lg text-green-800 font-medium text-sm">
                  Terraza
                </div>

                {/* Mesas */}
                {filteredTables.map(table => (
                  <TableComponent
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
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Reservas de Hoy ({selectedDate})</h3>
          {todayReservations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay reservas para esta fecha</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayReservations.map(reservation => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{reservation.customerName}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {reservation.status === 'confirmed' ? 'Confirmada' :
                       reservation.status === 'pending' ? 'Pendiente' : reservation.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Mesa {tables.find(t => t.id === reservation.tableId)?.number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{reservation.timeSlot} ({reservation.duration}h)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{reservation.partySize} personas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{reservation.customerPhone}</span>
                    </div>
                    {reservation.totalAmount && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{reservation.totalAmount}€</span>
                      </div>
                    )}
                  </div>
                  {reservation.specialRequests && (
                    <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      {reservation.specialRequests}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
