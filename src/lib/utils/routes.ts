/**
 * Rutas absolutas de la aplicación
 */

export const ROUTES = {
  HOME: '/',

  // Menu
  MENU: {
    GENERAL: '/menu',
    CATEGORY: '/menu/:categorySlug', // Ruta dinámica
  },

  // Shisha
  SHISHA: '/shisha',
  GALERIA_CACHIMBAS: '/galeria-cachimbas',

  // Otros
  NOT_FOUND: '/404',
} as const;

/**
 * Helpers para generar rutas dinámicas
 */
export const RouteHelpers = {
  /**
   * Genera URL de categoría de menú
   * @example RouteHelpers.menuCategory('bebidas') → '/menu/bebidas'
   */
  menuCategory: (slug: string) => `/menu/${slug}` as const,
};
