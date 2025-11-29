import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import type { QuizState } from '@modules/shisha/types';
import { useShishaQuiz } from '@modules/shisha/hooks';
import { TOBACCO_TYPES, FLAVOR_TYPES } from '@modules/shisha/constants';
import { formatFlavorName, isFlavorSelected } from '@modules/shisha/utils';

import { PageLayout } from '../components/PageLayout';
import { InfoPopup } from '../components/InfoPopup';
import { TobaccoCard } from '../components/TobaccoCard';
import { FlavorCard } from '../components/FlavorCard';
import { SelectedFlavors } from '../components/SelectedFlavors';
import { SubFlavorPopup } from '../components/SubFlavorPopup';

interface ShishaQuizPageProps {
  onComplete: (order: QuizState) => void;
  onBack: () => void;
}

/**
 * Shisha quiz page
 * Interactive tobacco and flavor selection wizard
 */
const ShishaQuizPage = memo<ShishaQuizPageProps>(({ onComplete, onBack }) => {
  const { quizState, selectTobacco, addFlavor, getCurrentFlavorStep, isMainFlavorStep } =
    useShishaQuiz();

  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  const handleFlavorSelect = (flavorId: string, subFlavorId?: string) => {
    const displayName =
      formatFlavorName(flavorId) + (subFlavorId ? ` (${formatFlavorName(subFlavorId)})` : '');

    // Show success notification
    setSuccessNotification(displayName);
    setTimeout(() => setSuccessNotification(null), 2000);

    // Add flavor to selection
    const flavor: { main: string; sub?: string } = { main: flavorId };
    if (subFlavorId) {
      flavor.sub = subFlavorId;
    }
    addFlavor(flavor);
  };

  const handleFinishQuiz = () => {
    onComplete(quizState);
  };

  // Render tobacco selection step
  const renderTobaccoSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-white mb-4 font-['Poppins']">
          ¿Qué tipo de tabaco quieres fumar?
        </h2>
        <p className="text-white/70">Selecciona el tipo de tabaco base para tu experiencia</p>
      </div>

      <div className="grid gap-4">
        {TOBACCO_TYPES.map((tobacco) => (
          <TobaccoCard
            key={tobacco.id}
            tobacco={tobacco}
            onSelect={() => selectTobacco(tobacco.id)}
            onInfo={() => setActiveInfoModal(tobacco.id)}
          />
        ))}
      </div>

      {/* Tobacco Info Popups */}
      {TOBACCO_TYPES.map((tobacco) => (
        <InfoPopup
          key={`tobacco-info-${tobacco.id}`}
          title={tobacco.name}
          content={tobacco.description}
          isVisible={activeInfoModal === tobacco.id}
          onClose={() => setActiveInfoModal(null)}
        />
      ))}
    </motion.div>
  );

  // Render flavor selection step
  const renderFlavorSelection = () => {
    const currentFlavorIndex = getCurrentFlavorStep();
    const isMainFlavor = isMainFlavorStep();
    const stepTitle = isMainFlavor
      ? '¿Qué matiz principal quieres que predomine?'
      : `Matiz adicional ${currentFlavorIndex} de 5`;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4 font-['Poppins']">{stepTitle}</h2>
          <p className="text-white/70">
            {isMainFlavor
              ? 'Este será el sabor predominante de tu cachimba'
              : `Añade otro matiz para enriquecer la experiencia (${currentFlavorIndex}/5)`}
          </p>

          {/* Display selected flavors */}
          <SelectedFlavors flavors={quizState.flavors} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FLAVOR_TYPES.map((flavor) => {
            const isSelected = isFlavorSelected(quizState.flavors, flavor.id);

            return (
              <FlavorCard
                key={flavor.id}
                flavorName={flavor.name}
                isSelected={isSelected}
                onSelect={() => {
                  if (isSelected) return;

                  // Show sub-flavor options only for main flavor with sub-options
                  if (flavor.subs.length > 0 && isMainFlavor) {
                    setActiveInfoModal(`sub-${flavor.id}`);
                  } else {
                    handleFlavorSelect(flavor.id);
                  }
                }}
                onInfo={() => setActiveInfoModal(`flavor-${flavor.id}`)}
              />
            );
          })}
        </div>

        {/* Finish Quiz Button */}
        {currentFlavorIndex > 0 && (
          <div className="text-center pt-6">
            <motion.button
              onClick={handleFinishQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Finalizar Experiencia
            </motion.button>
          </div>
        )}

        {/* Sub-flavor Selection Popups */}
        {isMainFlavor &&
          FLAVOR_TYPES.map(
            (flavor) =>
              flavor.subs.length > 0 &&
              !isFlavorSelected(quizState.flavors, flavor.id) && (
                <SubFlavorPopup
                  key={`sub-popup-${flavor.id}`}
                  isVisible={activeInfoModal === `sub-${flavor.id}`}
                  flavorName={flavor.name}
                  subFlavors={flavor.subs}
                  onSelect={(sub) => {
                    handleFlavorSelect(flavor.id, sub);
                    setActiveInfoModal(null);
                  }}
                  onClose={() => setActiveInfoModal(null)}
                />
              )
          )}

        {/* Flavor Info Popups */}
        {FLAVOR_TYPES.map((flavor) => (
          <InfoPopup
            key={`flavor-info-${flavor.id}`}
            title={flavor.name}
            content={flavor.info}
            isVisible={activeInfoModal === `flavor-${flavor.id}`}
            onClose={() => setActiveInfoModal(null)}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <PageLayout title="Crear Experiencia" onBack={onBack}>
      <AnimatePresence mode="wait">
        {quizState.currentStep === 0 && renderTobaccoSelection()}
        {quizState.currentStep > 0 && quizState.currentStep <= 5 && renderFlavorSelection()}
      </AnimatePresence>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {successNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span className="font-medium">{successNotification} añadido a la mezcla</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
});

export default ShishaQuizPage;
