import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Query Client
import { queryClient } from '@lib/api/queryClient';

// Routes constants
import { ROUTES } from '@lib/utils/routes';

// Public Pages
import LandingPage from './pages/LandingPage';

// Shared Components
import ProtectedRoute from '@components/shared/ProtectedRoute';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>

          <Route path={ROUTES.HOME} element={<LandingPage />} />
        </Routes>
      </Router>

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
