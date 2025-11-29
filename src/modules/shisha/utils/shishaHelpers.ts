import type { QuizState, FlavorSelection } from '../types';
import { TOBACCO_TYPES } from '../constants';

/**
 * Format flavor ID to display name
 * @example formatFlavorName('frutos-rojos') → 'Frutos Rojos'
 */
export const formatFlavorName = (flavorId: string): string => {
  return flavorId
    .replace('-', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Get tobacco information by type ID
 */
export const getTobaccoInfo = (type: string) => {
  const tobacco = TOBACCO_TYPES.find((t) => t.id === type);
  return tobacco || {
    id: type,
    name: type,
    displayName: type,
    description: '',
    icon: 'coffee' as const,
  };
};

/**
 * Generate waiter text from quiz state
 */
export const generateWaiterText = (quizState: QuizState): string => {
  const tobaccoInfo = getTobaccoInfo(quizState.tobaccoType);
  const mainFlavor = quizState.flavors[0];
  const secondaryFlavors = quizState.flavors.slice(1);

  let text = `Quiero un ${tobaccoInfo.displayName}`;

  if (mainFlavor) {
    text += ` con el matiz principal ${formatFlavorName(mainFlavor.main)}`;
    if (mainFlavor.sub) {
      text += ` (${formatFlavorName(mainFlavor.sub)})`;
    }
  }

  if (secondaryFlavors.length > 0) {
    text += ` y como matices secundarios `;
    const secondaryNames = secondaryFlavors.map((flavor) => {
      let name = formatFlavorName(flavor.main);
      if (flavor.sub) {
        name += ` (${formatFlavorName(flavor.sub)})`;
      }
      return name;
    });

    if (secondaryNames.length === 1) {
      text += secondaryNames[0];
    } else {
      text +=
        secondaryNames.slice(0, -1).join(', ') +
        ' y ' +
        secondaryNames[secondaryNames.length - 1];
    }
  }

  text += '. Además recomiendar marcar dominancia de sabores según tus gustos.';

  return text;
};

/**
 * Generate unique order ID
 */
export const generateOrderId = (): string => {
  return `EXP-${Date.now().toString().slice(-6)}`;
};

/**
 * Format order for sharing
 */
export const formatOrderForSharing = (quizState: QuizState): string => {
  const tobaccoInfo = getTobaccoInfo(quizState.tobaccoType);

  const orderText = `Mi Experiencia Cachimba Personalizada

📋 Orden: ${generateOrderId()}

🌿 Tabaco Base: ${tobaccoInfo.name}

🎯 Sabores Seleccionados:
${quizState.flavors
  .map(
    (flavor, index) =>
      `${index + 1}. ${formatFlavorName(flavor.main)}${
        flavor.sub ? ` (${formatFlavorName(flavor.sub)})` : ''
      }`
  )
  .join('\n')}

✨ Creado en Navs App`;

  return orderText;
};

/**
 * Share order using native share API or clipboard fallback
 */
export const shareOrder = async (quizState: QuizState): Promise<boolean> => {
  const orderText = formatOrderForSharing(quizState);

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Mi Experiencia Cachimba',
        text: orderText,
      });
      return true;
    } catch (error) {
      console.log('Error sharing:', error);
      return false;
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(orderText);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }
};

/**
 * Check if a flavor is already selected
 */
export const isFlavorSelected = (
  selectedFlavors: FlavorSelection[],
  flavorId: string
): boolean => {
  return selectedFlavors.some((flavor) => flavor.main === flavorId);
};

/**
 * Get selected main flavor IDs
 */
export const getSelectedMainFlavors = (flavors: FlavorSelection[]): string[] => {
  return flavors.map((flavor) => flavor.main);
};
