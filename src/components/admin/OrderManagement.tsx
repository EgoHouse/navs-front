import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  DollarSign,
  Users,
  Loader2,
  AlertTriangle,
  Lock,
  Unlock,
  ChevronRight,
  Play,
  RefreshCw,
  ChevronLeft,
} from 'lucide-react';
import { orderService } from '../../services';
import { useSuccessMessage } from '../../hooks';
import SuccessMessage from '../SuccessMessage';
import type { Order, OrderStats, OrderType } from '../../types';
import { ORDER_CONFIG, OrderEventStatus } from '../../types/order.types';
import { EditOrderModal } from './EditOrderModal';

interface OrderManagementProps {}

export const OrderManagement: React.FC<OrderManagementProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const {
    isVisible: successVisible,
    message: successMessage,
    showSuccess,
    hideSuccess,
  } = useSuccessMessage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState<Record<string, string>>(
    {}
  ); // {orderId: 'action'}
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    search: '',
    startDate: '',
    endDate: '',
    status: '', // 'open', 'closed', '' (todos)
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [showOnlyToday, setShowOnlyToday] = useState(true); // Nuevo: mostrar solo pedidos de hoy por defecto

  // Función para determinar si un pedido es de "hoy" (jornada desde las 01:01 AM hasta las 01:00 AM del día siguiente)
  const isOrderFromToday = useCallback((orderDate: string) => {
    const order = new Date(orderDate);
    const now = new Date();

    // Determinar cuál es el día de la jornada actual
    let currentJourneyDate = new Date(now);

    // Si estamos entre las 00:00 y 01:00, la jornada pertenece al día anterior
    if (
      now.getHours() === 0 ||
      (now.getHours() === 1 && now.getMinutes() === 0)
    ) {
      currentJourneyDate.setDate(currentJourneyDate.getDate() - 1);
    }

    // Inicio de la jornada: 01:01 AM del día de la jornada
    const journeyStart = new Date(currentJourneyDate);
    journeyStart.setHours(1, 1, 0, 0);

    // Fin de la jornada: 01:00 AM del día siguiente
    const journeyEnd = new Date(currentJourneyDate);
    journeyEnd.setDate(journeyEnd.getDate() + 1);
    journeyEnd.setHours(1, 0, 59, 999);

    return order >= journeyStart && order <= journeyEnd;
  }, []);

  // Función para determinar si un pedido cuenta para los ingresos (jornada desde las 01:01 AM hasta las 05:00 AM del día siguiente)
  const isOrderForRevenue = useCallback((orderDate: string) => {
    const order = new Date(orderDate);
    const now = new Date();

    // Determinar cuál es el día de la jornada actual para ingresos
    let currentJourneyDate = new Date(now);

    // Si estamos entre las 00:00 y 05:00, la jornada pertenece al día anterior
    if (
      now.getHours() < 5 ||
      (now.getHours() === 5 && now.getMinutes() === 0)
    ) {
      currentJourneyDate.setDate(currentJourneyDate.getDate() - 1);
    }

    // Inicio de la jornada: 01:01 AM del día de la jornada
    const journeyStart = new Date(currentJourneyDate);
    journeyStart.setHours(1, 1, 0, 0);

    // Fin de la jornada para ingresos: 01:00 AM del día siguiente
    const journeyEnd = new Date(currentJourneyDate);
    journeyEnd.setDate(journeyEnd.getDate() + 1);
    journeyEnd.setHours(1, 0, 0, 0);

    return order >= journeyStart && order < journeyEnd;
  }, []);

  // Función para filtrar pedidos del lado del cliente
  const filterOrders = useCallback(
    (ordersToFilter: Order[]) => {
      let filteredOrders = [...ordersToFilter];

      // Filtro por "solo hoy" (prioritario)
      if (showOnlyToday) {
        filteredOrders = filteredOrders.filter((order) =>
          isOrderFromToday(order.createdAt)
        );
      }

      // Filtro por término de búsqueda
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        filteredOrders = filteredOrders.filter((order) => {
          const matchesSearch =
            order.name.toLowerCase().includes(searchLower) ||
            order.email.toLowerCase().includes(searchLower) ||
            order.phone.toLowerCase().includes(searchLower) ||
            (order.address &&
              order.address.toLowerCase().includes(searchLower)) ||
            (order.trackingNumber &&
              order.trackingNumber.toLowerCase().includes(searchLower));

          return matchesSearch;
        });
      }

      // Filtro por tipo
      if (filters.type && filters.type !== '') {
        filteredOrders = filteredOrders.filter(
          (order) => order.type === filters.type
        );
      }

      // Filtro por estado
      if (filters.status && filters.status !== '') {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === filters.status
        );
      }

      // Filtro por fecha de inicio
      if (filters.startDate && filters.startDate !== '') {
        const startDate = new Date(filters.startDate);
        startDate.setHours(0, 0, 0, 0); // Inicio del día
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= startDate;
        });
      }

      // Filtro por fecha de fin
      if (filters.endDate && filters.endDate !== '') {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // Final del día
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate <= endDate;
        });
      }

      return filteredOrders;
    },
    [searchTerm, filters, showOnlyToday, isOrderFromToday]
  );

  // Estado para guardar todos los pedidos (sin filtrar)
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  // Función para cargar pedidos
  const loadOrders = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError('');

        // Por ahora, cargamos todos los pedidos y filtramos del lado del cliente
        // para asegurar que el filtrado funcione correctamente
        const data = await orderService.getAllOrders();

        // Guardar todos los pedidos para referencia
        setAllOrders(data);

        // Aplicar filtros del lado del cliente
        const filteredData = filterOrders(data);

        // Ordenar por fecha de creación (más recientes primero)
        const sortedData = filteredData.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setOrders(sortedData);
      } catch (error: any) {
        setError(error.message || 'Error al cargar pedidos');
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [filterOrders]
  );

  // Cargar pedidos y estadísticas al montar el componente
  useEffect(() => {
    const initialLoad = async () => {
      try {
        setLoading(true);
        setError('');
        await loadOrders(false);
        // loadStats se llamará después de que allOrders esté actualizado
      } catch (error: any) {
        setError(error.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    initialLoad();
  }, [loadOrders]);

  // Actualizar estadísticas cuando cambien allOrders
  useEffect(() => {
    if (allOrders.length > 0) {
      loadStats();
    }
  }, [allOrders]);

  // Debounce para el término de búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Resetear página cuando cambien los filtros y recargar pedidos
  useEffect(() => {
    setCurrentPage(1);
    loadOrders(false);
  }, [filters, loadOrders]);

  // Desactivar "Solo hoy" cuando se aplican filtros de fecha manualmente
  useEffect(() => {
    if (filters.startDate || filters.endDate) {
      setShowOnlyToday(false);
    }
  }, [filters.startDate, filters.endDate]);

  // Bloquear scroll del body cuando algún modal esté abierto
  useEffect(() => {
    const isModalOpen = selectedOrder || isEditModalOpen || isDeleteModalOpen;

    if (isModalOpen) {
      // Prevenir scroll del body agregando overflow hidden
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restaurar el scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedOrder, isEditModalOpen, isDeleteModalOpen]);

  // Manejar tecla Escape para cerrar modales
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isDeleteModalOpen) {
          setIsDeleteModalOpen(false);
          setSelectedOrder(null);
        } else if (isEditModalOpen) {
          setIsEditModalOpen(false);
          setSelectedOrder(null);
        } else if (selectedOrder) {
          setSelectedOrder(null);
        }
      }
    };

    if (selectedOrder || isEditModalOpen || isDeleteModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedOrder, isEditModalOpen, isDeleteModalOpen]);

  const loadStats = async () => {
    try {
      const data = await orderService.getOrderStats();

      // Recalcular ingresos totales con base en la jornada actual (01:01 AM - 05:00 AM)
      // Solo contar pedidos cerrados y entregados
      const ordersForRevenue = allOrders.filter(
        (order) =>
          isOrderForRevenue(order.createdAt) &&
          order.status === 'closed' &&
          order.eventStatus === OrderEventStatus.ENTREGADO
      );
      const journeyRevenue = ordersForRevenue.reduce(
        (sum, order) => sum + (order.price || 0),
        0
      );

      setStats({
        ...data,
        totalRevenue: journeyRevenue,
      });
    } catch (error: any) {
      setError(error.message || 'Error al cargar estadísticas');
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError('');
      await loadOrders(false);
      // loadStats se actualizará automáticamente cuando allOrders cambie
      showMessage('Pedidos actualizados correctamente');
    } catch (error: any) {
      showMessage(error.message || 'Error al actualizar pedidos', true);
    } finally {
      setRefreshing(false);
    }
  };

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setError(message);
      setTimeout(() => setError(''), 5000);
    } else {
      showSuccess(message);
    }
  };

  const setOrderLoading = (orderId: string, action: string | null) => {
    setLoadingOrders((prev) => {
      if (action === null) {
        const { [orderId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [orderId]: action };
    });
  };

  const isOrderLoading = (orderId: string) => {
    return orderId in loadingOrders;
  };

  const getOrderLoadingAction = (orderId: string) => {
    return loadingOrders[orderId] || '';
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      setOrderLoading(selectedOrder.id, 'deleting');
      await orderService.deleteOrder(selectedOrder.id);
      setOrders(orders.filter((order) => order.id !== selectedOrder.id));
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
      showMessage('Pedido eliminado exitosamente');
      loadStats(); // Recargar estadísticas
    } catch (error: any) {
      showMessage(error.message || 'Error al eliminar pedido', true);
    } finally {
      if (selectedOrder) {
        setOrderLoading(selectedOrder.id, null);
      }
    }
  };

  const handleToggleOrderStatus = async (order: Order) => {
    try {
      const action = order.status === 'closed' ? 'reopening' : 'closing';
      setOrderLoading(order.id, action);

      // If currently 'closed' => reopen (set to 'open'), otherwise close (set to 'closed')
      if (order.status === 'closed') {
        await orderService.reopenOrder(order.id);
        showMessage('Pedido reabierto exitosamente');
      } else {
        await orderService.closeOrder(order.id);
        showMessage('Pedido cerrado exitosamente');
      }
      loadOrders(false); // Recargar pedidos
    } catch (error: any) {
      showMessage(error.message || 'Error al cambiar estado del pedido', true);
    } finally {
      setOrderLoading(order.id, null);
    }
  };

  const getNextEventStatus = (currentStatus: string): string | null => {
    switch (currentStatus) {
      case OrderEventStatus.RECIBIDO:
        return OrderEventStatus.EN_PREPARACION;
      case OrderEventStatus.EN_PREPARACION:
        return OrderEventStatus.EN_CAMINO;
      case OrderEventStatus.EN_CAMINO:
        return OrderEventStatus.ENTREGADO;
      case OrderEventStatus.ENTREGADO:
        return null; // Ya está en el último estado
      default:
        return OrderEventStatus.RECIBIDO; // Si no tiene estado o es inválido, empezar desde el principio
    }
  };

  const handleAdvanceEventStatus = async (order: Order) => {
    try {
      const nextStatus = getNextEventStatus(order.eventStatus);
      if (!nextStatus) {
        showMessage('El pedido ya está en el estado final', true);
        return;
      }

      setOrderLoading(order.id, 'advancing');

      await orderService.advanceOrderEventStatus(order.id, nextStatus);

      // Si el estado del evento avanza a "entregado", cerrar automáticamente el pedido
      if (nextStatus === OrderEventStatus.ENTREGADO) {
        await orderService.closeOrder(order.id);
        showMessage('Pedido entregado y cerrado automáticamente');
      } else {
        showMessage('Estado del evento avanzado exitosamente');
      }

      loadOrders(false); // Recargar pedidos
    } catch (error: any) {
      showMessage(
        error.message || 'Error al avanzar el estado del evento',
        true
      );
    } finally {
      setOrderLoading(order.id, null);
    }
  };

  const handleStartOrder = async (order: Order) => {
    try {
      setOrderLoading(order.id, 'starting');

      // Abrir el pedido (cambiar status a 'open')
      await orderService.reopenOrder(order.id);

      // Establecer el primer evento (recibido)
      await orderService.advanceOrderEventStatus(
        order.id,
        OrderEventStatus.RECIBIDO
      );

      showMessage('Pedido iniciado exitosamente');
      loadOrders(false); // Recargar pedidos
    } catch (error: any) {
      showMessage(error.message || 'Error al iniciar el pedido', true);
    } finally {
      setOrderLoading(order.id, null);
    }
  };

  const getEventStatusLabel = (eventStatus?: string) => {
    if (!eventStatus) return 'Sin estado';
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO:
        return 'Recibido';
      case OrderEventStatus.EN_PREPARACION:
        return 'En Preparación';
      case OrderEventStatus.EN_CAMINO:
        return 'En Camino';
      case OrderEventStatus.ENTREGADO:
        return 'Entregado';
      default:
        return eventStatus;
    }
  };

  const getEventStatusColor = (eventStatus?: string) => {
    if (!eventStatus) return 'bg-gray-100 text-gray-800';
    switch (eventStatus) {
      case OrderEventStatus.RECIBIDO:
        return 'bg-yellow-100 text-yellow-800';
      case OrderEventStatus.EN_PREPARACION:
        return 'bg-blue-100 text-blue-800';
      case OrderEventStatus.EN_CAMINO:
        return 'bg-orange-100 text-orange-800';
      case OrderEventStatus.ENTREGADO:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canAdvanceEvent = (eventStatus?: string) => {
    return eventStatus && eventStatus !== OrderEventStatus.ENTREGADO;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOrderTypeLabel = (type: OrderType) => {
    return ORDER_CONFIG[type]?.label || type;
  };

  const getOrderTypeColor = (type: OrderType) => {
    switch (type) {
      case 'classic':
        return 'bg-blue-100 text-blue-800';
      case 'traditional':
        return 'bg-green-100 text-green-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helpers para estado del pedido (status ahora es 'pending'|'open'|'closed')
  const getStatusLabel = (status?: string) => {
    if (!status) return 'Desconocido';
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'open':
        return 'Abierto';
      case 'closed':
        return 'Cerrado';
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'open':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-gray-600 text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Cálculos de paginación
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Navegación de páginas
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: '',
      search: '',
      startDate: '',
      endDate: '',
      status: '',
    });
    setShowOnlyToday(true); // Volver a mostrar solo pedidos de hoy
  };

  // Componente Modal para centrar correctamente en el viewport
  const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        {children}
      </div>,
      document.body
    );
  };

  // Messages Component
  const renderMessages = () => (
    <>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
          >
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <SuccessMessage
          message={successMessage}
          isVisible={successVisible}
          onClose={hideSuccess}
          size="md"
          position="relative"
        />
      </div>
    </>
  );

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderMessages()}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Gestión de Pedidos</h3>
          <p className="text-gray-400">Administra los pedidos de desayunos</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refrescar pedidos"
        >
          <RefreshCw
            size={16}
            className={`${refreshing ? 'animate-spin' : ''}`}
          />
          <span>{refreshing ? 'Actualizando...' : 'Refrescar'}</span>
        </button>
      </div>

      {/* Estadísticas */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Pedidos
                </p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalOrders}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 group relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Ingresos Totales (Hoy)
                </p>
                <p className="text-xs text-gray-500 max-h-0 overflow-hidden group-hover:max-h-8 group-hover:mt-0.5 transition-all duration-200">
                  Jornada actual (10:00 AM - 01:00 AM)
                </p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalRevenue}€
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  {showOnlyToday
                    ? 'Abiertos (Hoy)'
                    : searchTerm ||
                      filters.type ||
                      filters.status ||
                      filters.startDate ||
                      filters.endDate
                    ? 'Abiertos (Filtrados)'
                    : 'Pedidos Abiertos'}
                </p>
                <p className="text-2xl font-bold text-white">
                  {orders.filter((order) => order.status !== 'closed').length}
                </p>
              </div>
              <Unlock className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  {showOnlyToday
                    ? 'Cerrados (Hoy)'
                    : searchTerm ||
                      filters.type ||
                      filters.status ||
                      filters.startDate ||
                      filters.endDate
                    ? 'Cerrados (Filtrados)'
                    : 'Pedidos Cerrados'}
                </p>
                <p className="text-2xl font-bold text-white">
                  {orders.filter((order) => order.status === 'closed').length}
                </p>
              </div>
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-white">Filtros</h4>
            {(searchTerm ||
              filters.type ||
              filters.status ||
              filters.startDate ||
              filters.endDate) && (
              <p className="text-sm text-gray-400 mt-1">
                Filtros activos • Mostrando {orders.length} de{' '}
                {allOrders.length} pedidos
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {/* Toggle para mostrar solo hoy o todos */}
            <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-gray-600">
              <button
                onClick={() => setShowOnlyToday(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  showOnlyToday
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Solo hoy
              </button>
              <button
                onClick={() => setShowOnlyToday(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !showOnlyToday
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Todos
              </button>
            </div>

            {(searchTerm ||
              filters.type ||
              filters.status ||
              filters.startDate ||
              filters.endDate) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Indicador de rango de fechas cuando está en modo "Solo hoy" */}
        {showOnlyToday && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-yellow-400">
                Mostrando pedidos de la jornada actual (01:01 AM - 01:00 AM)
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estado
            </label>
            <select
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="open">Abiertos</option>
              <option value="closed">Cerrados</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Pedido
            </label>
            <select
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Todos los tipos</option>
              <option value="classic">Clásico</option>
              <option value="traditional">Tradicional</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>
        </div>
      </motion.div>

      {/* Pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Package className="text-yellow-400" size={24} />
            <div>
              <h4 className="text-xl font-bold text-white">Pedidos</h4>
              <p className="text-gray-400 text-sm">
                {totalOrders} pedidos encontrados
                {showOnlyToday && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                    Solo hoy
                  </span>
                )}
                {allOrders.length > 0 &&
                  totalOrders !== allOrders.length &&
                  !showOnlyToday && (
                    <span className="text-gray-500">
                      {' '}
                      de {allOrders.length} totales
                    </span>
                  )}
                {totalOrders > 0 && (
                  <>
                    {' '}
                    • Mostrando {startIndex + 1}-
                    {Math.min(endIndex, totalOrders)} de {totalOrders}
                  </>
                )}
                {(searchTerm ||
                  filters.type ||
                  filters.status ||
                  filters.startDate ||
                  filters.endDate) && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                    Con filtros
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">
              {showOnlyToday
                ? 'No hay pedidos hoy'
                : searchTerm ||
                  filters.type ||
                  filters.status ||
                  filters.startDate ||
                  filters.endDate
                ? 'No se encontraron pedidos'
                : 'No hay pedidos'}
            </h3>
            <p>
              {showOnlyToday
                ? 'No se han realizado pedidos en la jornada actual'
                : searchTerm ||
                  filters.type ||
                  filters.status ||
                  filters.startDate ||
                  filters.endDate
                ? 'No se encontraron pedidos con los filtros aplicados'
                : 'Aún no se han realizado pedidos'}
            </p>
            {(searchTerm ||
              filters.type ||
              filters.status ||
              filters.startDate ||
              filters.endDate) && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
            {showOnlyToday &&
              !searchTerm &&
              !filters.type &&
              !filters.status && (
                <button
                  onClick={() => setShowOnlyToday(false)}
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Ver todos los pedidos
                </button>
              )}
          </div>
        ) : (
          <div className="grid gap-4">
            {currentOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gray-900/50 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors group ${
                  isOrderLoading(order.id)
                    ? 'opacity-75 pointer-events-none'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h6 className="font-medium text-white truncate">
                            {order.name}
                          </h6>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{order.email}</p>
                        <p className="text-gray-400 text-sm">{order.phone}</p>
                        {order.address && (
                          <p className="text-gray-400 text-sm">
                            {order.address}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrderTypeColor(
                            order.type
                          )}`}
                        >
                          {getOrderTypeLabel(order.type)}
                        </span>
                        <p className="text-white font-bold mt-1">
                          {order.price}€
                        </p>
                        {order.eventStatus && order.status !== 'pending' && (
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getEventStatusColor(
                              order.eventStatus
                            )}`}
                          >
                            {getEventStatusLabel(order.eventStatus)}
                          </span>
                        )}
                        {order.trackingNumber && (
                          <p className="text-gray-400 text-xs mt-1">
                            #{order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-gray-400">
                        <span>Cantidad: {order.quantity}</span>
                        <span>{formatDate(order.createdAt)}</span>
                        {isOrderLoading(order.id) && (
                          <div className="flex items-center space-x-2 text-yellow-400">
                            <Loader2 size={14} className="animate-spin" />
                            <span className="text-xs capitalize">
                              {getOrderLoadingAction(order.id) === 'starting' &&
                                'Iniciando...'}
                              {getOrderLoadingAction(order.id) === 'closing' &&
                                'Cerrando...'}
                              {getOrderLoadingAction(order.id) ===
                                'reopening' && 'Reabriendo...'}
                              {getOrderLoadingAction(order.id) ===
                                'advancing' && 'Avanzando...'}
                              {getOrderLoadingAction(order.id) === 'deleting' &&
                                'Eliminando...'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {order.observations && (
                      <div className="mt-2 p-2 bg-gray-800/50 rounded text-sm text-gray-300">
                        <strong>Observaciones:</strong> {order.observations}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      disabled={isOrderLoading(order.id)}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsEditModalOpen(true);
                      }}
                      disabled={isOrderLoading(order.id)}
                      className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>

                    {/* Mostrar botón "Empezar" solo cuando está en pending */}
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => handleStartOrder(order)}
                        disabled={isOrderLoading(order.id)}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Empezar pedido"
                      >
                        {getOrderLoadingAction(order.id) === 'starting' ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Play size={16} />
                        )}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleToggleOrderStatus(order)}
                          disabled={isOrderLoading(order.id)}
                          className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            order.status === 'closed'
                              ? 'text-green-400 hover:bg-green-500/10'
                              : 'text-orange-400 hover:bg-orange-500/10'
                          }`}
                          title={
                            order.status === 'closed'
                              ? 'Reabrir pedido'
                              : 'Cerrar pedido'
                          }
                        >
                          {getOrderLoadingAction(order.id) === 'reopening' ||
                          getOrderLoadingAction(order.id) === 'closing' ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : order.status === 'closed' ? (
                            <Unlock size={16} />
                          ) : (
                            <Lock size={16} />
                          )}
                        </button>
                        {canAdvanceEvent(order.eventStatus) &&
                          order.status !== 'closed' && (
                            <button
                              onClick={() => handleAdvanceEventStatus(order)}
                              disabled={isOrderLoading(order.id)}
                              className="p-2 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Siguiente Evento"
                            >
                              {getOrderLoadingAction(order.id) ===
                              'advancing' ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>
                          )}
                      </>
                    )}

                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDeleteModalOpen(true);
                      }}
                      disabled={isOrderLoading(order.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-600">
            <div className="text-sm text-gray-400">
              Página {currentPage} de {totalPages}
            </div>

            <div className="flex items-center space-x-2">
              {/* Botón Anterior */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} className="mr-1" />
                Anterior
              </button>

              {/* Números de página */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        pageNumber === currentPage
                          ? 'bg-yellow-600 text-white'
                          : 'text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal de detalles del pedido */}
      <Modal
        isOpen={
          selectedOrder !== null && !isEditModalOpen && !isDeleteModalOpen
        }
        onClose={() => setSelectedOrder(null)}
      >
        <AnimatePresence>
          {selectedOrder && !isEditModalOpen && !isDeleteModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto z-10"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Detalles del Pedido
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Información completa del pedido
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nombre
                    </label>
                    <p className="text-white">{selectedOrder.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Estado
                    </label>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeClass(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Teléfono
                    </label>
                    <p className="text-white">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Tipo de Pedido
                    </label>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getOrderTypeColor(
                        selectedOrder.type
                      )}`}
                    >
                      {getOrderTypeLabel(selectedOrder.type)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <p className="text-white">{selectedOrder.email}</p>
                  </div>
                  {selectedOrder.address && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Dirección
                      </label>
                      <p className="text-white">{selectedOrder.address}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Cantidad
                    </label>
                    <p className="text-white">{selectedOrder.quantity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Precio Total
                    </label>
                    <p className="text-yellow-400 font-bold text-lg">
                      {selectedOrder.price}€
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Fecha de Pedido
                    </label>
                    <p className="text-white">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Última Actualización
                    </label>
                    <p className="text-white">
                      {formatDate(selectedOrder.updatedAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Comida Incluida
                  </label>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <div className="space-y-2">
                      {selectedOrder.food.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedOrder.observations && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Observaciones
                    </label>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                      <p className="text-white">{selectedOrder.observations}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      {/* Modal de edición */}
      {selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdate={() => {
            loadOrders(false);
            loadStats();
          }}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isDeleteModalOpen && selectedOrder !== null}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedOrder(null);
        }}
      >
        <AnimatePresence>
          {isDeleteModalOpen && selectedOrder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl z-10"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Confirmar Eliminación
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Esta acción no se puede deshacer
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="text-red-400" size={24} />
                  <div>
                    <p className="text-white font-medium">
                      ¿Eliminar pedido de {selectedOrder.name}?
                    </p>
                    <p className="text-gray-400 text-sm">
                      {getOrderTypeLabel(selectedOrder.type)} •{' '}
                      {selectedOrder.price}€
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm">
                  Esta acción eliminará permanentemente este pedido y no se
                  puede deshacer.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedOrder(null);
                  }}
                  disabled={selectedOrder && isOrderLoading(selectedOrder.id)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteOrder}
                  disabled={selectedOrder && isOrderLoading(selectedOrder.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedOrder &&
                  getOrderLoadingAction(selectedOrder.id) === 'deleting' ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} className="mr-2" />
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
};
