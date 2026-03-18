import type { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Inicio', id: 'hero' },
  { name: 'Carta', id: 'menu' },
  { name: 'Cachimbas', id: 'shisha-gallery' },
  { name: 'Cocktails', id: 'cocktails' },
  { name: 'Ubicación', id: 'location' },
] as const;
