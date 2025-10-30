import React from 'react';
import { OrderManagement } from '../components/admin/OrderManagement';

export const OrderManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrderManagement />
    </div>
  );
};