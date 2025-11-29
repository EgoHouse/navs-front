import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

//* Libs
import { queryClient } from '@lib/api/queryClient';
import { ROUTES } from '@lib/utils/routes';

//* Modules
import AuthProvider from '@modules/auth/providers/AuthProvider';

//* Eager-loaded pages (critical for initial render)
import Landing from '@features/landing';

//* Lazy-loaded pages (code-splitting for better performance)
const MenuPage = lazy(() => import('@features/menu').then(m => ({ default: m.MenuPage })));
const NotFound = lazy(() => import('@features/not-found'));

/**
 * Loading fallback component
 */
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
      <p className="text-white text-lg">Cargando...</p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Landing />} />
              <Route path={ROUTES.MENU.GENERAL} element={<MenuPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
