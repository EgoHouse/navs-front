import { lazy, Suspense, useState } from 'react';
import { Loader2 } from 'lucide-react';

import type { QuizState } from '@modules/shisha/types';

// Lazy load sub-pages for code-splitting optimization
const ShishaInfoPage = lazy(() => import('./ShishaInfoPage'));
const ShishaQuizPage = lazy(() => import('./ShishaQuizPage'));
const ShishaOrderPage = lazy(() => import('./ShishaOrderPage'));

type ViewState = 'info' | 'quiz' | 'order';

/**
 * Loading fallback component
 */
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
      <p className="text-white text-lg">Cargando...</p>
    </div>
  </div>
);

/**
 * Main Shisha page controller
 * Manages navigation between info, quiz, and order views with lazy loading
 */
const ShishaPage = () => {
  const [currentView, setCurrentView] = useState<ViewState>('info');
  const [orderData, setOrderData] = useState<QuizState | null>(null);

  const navigateToQuiz = () => {
    setCurrentView('quiz');
  };

  const navigateToOrder = (order: QuizState) => {
    setOrderData(order);
    setCurrentView('order');
  };

  const navigateToInfo = () => {
    setCurrentView('info');
    setOrderData(null);
  };

  const restartQuiz = () => {
    setOrderData(null);
    setCurrentView('quiz');
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {currentView === 'info' && <ShishaInfoPage onStartQuiz={navigateToQuiz} />}

      {currentView === 'quiz' && (
        <ShishaQuizPage onComplete={navigateToOrder} onBack={navigateToInfo} />
      )}

      {currentView === 'order' && orderData && (
        <ShishaOrderPage order={orderData} onBack={navigateToInfo} onStartOver={restartQuiz} />
      )}
    </Suspense>
  );
};

export default ShishaPage;
