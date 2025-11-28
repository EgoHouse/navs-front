import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

//* Libs
import { queryClient } from '@lib/api/queryClient';
import { ROUTES } from '@lib/utils/routes';

//* Modules
import AuthProvider from '@modules/auth/providers/AuthProvider';

//* Pages
import Landing from '@features/landing';
import NotFound from '@features/not-found';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
