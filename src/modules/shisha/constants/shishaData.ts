import type { TobaccoType, FlavorType, QuizState } from '../types';

/**
 * Available tobacco types
 */
export const TOBACCO_TYPES: TobaccoType[] = [
  {
    id: 'blond',
    name: 'Blond Blend',
    displayName: 'tabaco rubio',
    description: 'Suave y ligero, ideal para principiantes.',
    icon: 'coffee',
  },
  {
    id: 'fusion',
    name: 'Fusion Blend',
    displayName: 'fusion blend',
    description: 'Mezcla equilibrada que combina lo mejor de diferentes tipos. Hoja rubia y hoja negra.',
    icon: 'sparkles',
  },
  {
    id: 'dark',
    name: 'Dark Blend',
    displayName: 'tabaco oscuro',
    description: 'Tabaco oscuro con mayor intensidad para usuarios experimentados.',
    icon: 'leaf',
  },
] as const;

/**
 * Available flavor types
 */
export const FLAVOR_TYPES: FlavorType[] = [
  {
    id: 'afrutado',
    name: 'Afrutado',
    subs: ['frutos-rojos', 'tropical'],
    info: 'Sabores que evocan frutas frescas. Dulzura natural y frescura en cada calada.',
  },
  {
    id: 'dulce',
    name: 'Dulce',
    subs: ['repostería', 'seco'],
    info: 'Sabores azucarados que recuerdan a postres. Suavidad y placer en el paladar.',
  },
  {
    id: 'citrico',
    name: 'Cítrico',
    subs: ['ácido', 'amargo'],
    info: 'Toques de limón, naranja y derivados. Refrescante y vibrante, perfecto para limpiar el paladar.',
  },
  {
    id: 'salado',
    name: 'Salado',
    subs: [],
    info: 'Descubre la evolución de la cachimba con sabores como queso, tomate y derivados.',
  },
  {
    id: 'especiado',
    name: 'Especiado',
    subs: [],
    info: 'Especias como masala, clavo o cardamomo. Calidez y aroma intenso.',
  },
  {
    id: 'herbal',
    name: 'Herbal',
    subs: [],
    info: 'Hierbas aromáticas como tomillo o romero. Sensación natural y relajante.',
  },
  {
    id: 'floral',
    name: 'Floral',
    subs: [],
    info: 'Delicadas notas de flores como rosa o jazmín. Elegancia y sutileza.',
  },
  {
    id: 'mentolado',
    name: 'Mentolado',
    subs: [],
    info: 'Frescura intensa de mentol. Sensación refrescante y limpia en la garganta.',
  },
  {
    id: 'menta',
    name: 'Menta',
    subs: [],
    info: 'Menta natural suave. Frescura equilibrada sin ser demasiado intensa.',
  },
] as const;

/**
 * Maximum number of flavors allowed
 */
export const MAX_FLAVORS = 5;

/**
 * Initial quiz state
 */
export const INITIAL_QUIZ_STATE: QuizState = {
  tobaccoType: '',
  flavors: [],
  currentStep: 0,
};
