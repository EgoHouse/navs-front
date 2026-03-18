import {
  Coffee,
  Wine,
  Utensils,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

/**
 * Menu category icons mapping
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  bebidas: Wine,
  desayunos: Coffee,
  meriendas: UtensilsCrossed,
  cocktails: Wine,
} as const;

/**
 * Default category icon (fallback)
 */
export const DEFAULT_CATEGORY_ICON = Utensils;

/**
 * Default currency symbol
 */
export const DEFAULT_CURRENCY = '€';

/**
 * Category display order (by slug)
 */
export const CATEGORY_ORDER: string[] = [
  'entrantes',
  'comidas',
  'batidos',
  'postres',
  'bebidas',
];

/**
 * Image optimization widths for different use cases
 */
export const IMAGE_WIDTHS = {
  THUMBNAIL: 128,
  CARD: 400,
  MODAL: 1024,
  HERO: 1920,
} as const;

/**
 * SEO metadata for menu page
 */
export const MENU_SEO = {
  title: 'Carta Completa | EGO HOUSE Madrid - Bebidas, Desayunos, Meriendas y Cocktails',
  description:
    'Explora la carta completa de EGO HOUSE Madrid. Bebidas premium, desayunos gourmet, meriendas exquisitas y cocktails de autor en un ambiente único.',
  keywords:
    'carta ego house madrid, menú completo madrid, bebidas premium madrid, desayunos madrid, cocktails madrid, gastronomía madrid, restaurante madrid',
  url: 'https://www.egohousebynavs.com/menu/general',
  image: '/comida.jpg',
} as const;

/**
 * Background image for menu page
 */
export const MENU_BACKGROUND_IMAGE = 'https://res.cloudinary.com/dm70hhhnm/image/upload/f_auto,q_auto/v1764339989/HomeMobile_kqrytt.png';

/**
 * Animation variants for framer-motion
 */
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;
