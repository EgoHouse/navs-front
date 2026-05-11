/**
 * Application-wide constants
 */

export const APP_NAME = 'EGO HOUSE by NAVS';
export const APP_VERSION = '2.0.0';

// Cloudinary - Solo se consumen URLs públicas; el frontend no sube archivos
export const CLOUDINARY_CLOUD_NAME = 'dm70hhhnm';
export const CLOUDINARY_BASE_URL =
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}` as const;

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
