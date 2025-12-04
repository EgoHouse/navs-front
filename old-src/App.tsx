import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import GaleriaCachimbas from './pages/GaleriaCachimbas';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TableManagement from './pages/TableManagement';
import DesayunosPage from './pages/DesayunosPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Rutas públicas - accesibles sin autenticación */}
          <Route path="/tracking" element={<OrderTrackingPage />} />
          <Route path="/tracking/:trackingNumber" element={<OrderTrackingPage />} />

          {/* Ruta de autenticación para usuarios normales */}
          <Route path="/auth" element={<AuthPage userType="user" />} />

          {/* Ruta de autenticación para administradores */}
          <Route path="/admin" element={<AuthPage userType="admin" />} />

          {/* Rutas protegidas para usuarios normales */}
          <Route
            path="/desayunos"
            element={
              <ProtectedRoute requireUser={true}>
                <DesayunosPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas - requieren autenticación de admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tables"
            element={
              <ProtectedRoute requireAdmin={true}>
                <TableManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
