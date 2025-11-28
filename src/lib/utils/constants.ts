/**
 * Application-wide constants
 */

export const APP_NAME = 'EGO HOUSE by NAVS';
export const APP_VERSION = '2.0.0';

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  JWT_TOKEN_KEY: import.meta.env.VITE_JWT_TOKEN_KEY || 'navs_auth_token',
} as const;

// Cloudinary - Solo se usan URLs del backend, no se suben archivos desde frontend
export const CLOUDINARY_CLOUD_NAME = 'dm70hhhnm';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}` as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: API_CONFIG.JWT_TOKEN_KEY,
  USER: 'navs_user',
  THEME: 'navs_theme',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * SEO Constants
 */
export const SEO = {
  SITE_NAME: 'EGO HOUSE Madrid',
  DEFAULT_TITLE: 'EGO HOUSE Madrid | Tetería Premium y Cachimba',
  DEFAULT_DESCRIPTION:
    'La mejor tetería de Madrid. Experiencia premium de shisha, gastronomía exquisita y ambiente único.',
  DEFAULT_KEYWORDS:
    'ego house madrid, tetería madrid, cachimba madrid, hookah lounge madrid',
  DEFAULT_IMAGE: 'https://www.egohousebynavs.com/hookas.jpg',
  CANONICAL_URL: 'https://www.egohousebynavs.com',
} as const;

/**
 * Business Info
 */
export const BUSINESS_INFO = {
  name: 'EGO HOUSE',
  address: {
    street: 'C. de Manuel Pombo Angulo 10',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    postalCode: '28050',
    country: 'ES',
  },
  geo: {
    latitude: 40.4628,
    longitude: -3.6385,
  },
  phone: '+34123456789',
  priceRange: '$$',
  openingHours: {
    weekday: 'Mo-Fr 18:00-02:00',
    weekend: 'Sa-Su 16:00-03:00',
  },
} as const;
