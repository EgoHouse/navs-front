/**
 * Rutas absolutas de la aplicación
 */

export const ROUTES = {
  // Rutas públicas
  HOME: '/',

  // Menu
  MENU: {
    GENERAL: '/menu',
    CATEGORY: '/menu/:categorySlug', // Ruta dinámica
  },

  // Shisha
  SHISHA: '/shisha',
  GALERIA_CACHIMBAS: '/galeria-cachimbas',

  // Tracking
  TRACKING: {
    BASE: '/tracking',
    DETAIL: '/tracking/:trackingNumber', // Ruta dinámica
  },

  // Auth
  AUTH: {
    USER: '/auth',
    ADMIN: '/admin',
  },

  // Desayunos (Protected - User)
  DESAYUNOS: '/desayunos',

  // Admin (Protected - Admin)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    TABLES: '/admin/tables',
  },

  // Otros
  NOT_FOUND: '/404',
} as const;

/**
 * Helpers para generar rutas dinámicas
 */
export const RouteHelpers = {
  /**
   * Genera URL de tracking con número
   * @example RouteHelpers.tracking('ABC123') → '/tracking/ABC123'
   */
  tracking: (trackingNumber: string) =>
    `/tracking/${trackingNumber}` as const,

  /**
   * Genera URL de categoría de menú
   * @example RouteHelpers.menuCategory('bebidas') → '/menu/bebidas'
   */
  menuCategory: (slug: string) => `/menu/${slug}` as const,
};

/**
 * Metadata de rutas para SEO y navegación
 */
export const RouteMetadata = {
  [ROUTES.HOME]: {
    title: 'EGO HOUSE Madrid | Tetería Premium y Cachimba',
    description:
      'La mejor tetería de Madrid. Experiencia premium de shisha, gastronomía exquisita y ambiente único.',
    keywords:
      'ego house madrid, tetería madrid, cachimba madrid, hookah lounge madrid',
  },
  [ROUTES.MENU.GENERAL]: {
    title: 'Carta Completa | EGO HOUSE Madrid',
    description: 'Descubre nuestra carta completa: bebidas, desayunos, meriendas y cocktails premium.',
    keywords: 'carta ego house, menú tetería madrid, bebidas premium madrid',
  },
  [ROUTES.SHISHA]: {
    title: 'Cachimbas Premium | EGO HOUSE Madrid',
    description:
      'Las mejores cachimbas de Madrid. Tabaco premium, sabores únicos y experiencia personalizada.',
    keywords: 'cachimba madrid, shisha premium, fumar cachimba madrid',
  },
  [ROUTES.GALERIA_CACHIMBAS]: {
    title: 'Galería de Cachimbas | EGO HOUSE Madrid',
    description: 'Explora nuestra colección de cachimbas premium y encuentra tu estilo.',
    keywords: 'galería cachimbas, hookah gallery madrid',
  },
  [ROUTES.ADMIN.DASHBOARD]: {
    title: 'Dashboard Administrativo | EGO HOUSE',
    description: 'Panel de administración de EGO HOUSE.',
    keywords: '',
  },
} as const;

/**
 * Rutas públicas (no requieren autenticación)
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.MENU.GENERAL,
  ROUTES.SHISHA,
  ROUTES.GALERIA_CACHIMBAS,
  ROUTES.TRACKING.BASE,
  ROUTES.AUTH.USER,
  ROUTES.AUTH.ADMIN,
] as const;

/**
 * Rutas protegidas para usuarios
 */
export const USER_PROTECTED_ROUTES = [ROUTES.DESAYUNOS] as const;

/**
 * Rutas protegidas para admins
 */
export const ADMIN_PROTECTED_ROUTES = [
  ROUTES.ADMIN.DASHBOARD,
  ROUTES.ADMIN.TABLES,
] as const;

/**
 * Verifica si una ruta es pública
 */
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route));
}

/**
 * Verifica si una ruta requiere admin
 */
export function isAdminRoute(path: string): boolean {
  return ADMIN_PROTECTED_ROUTES.some((route) => path.startsWith(route));
}

/**
 * Verifica si una ruta requiere usuario autenticado
 */
export function isUserRoute(path: string): boolean {
  return USER_PROTECTED_ROUTES.some((route) => path.startsWith(route));
}
