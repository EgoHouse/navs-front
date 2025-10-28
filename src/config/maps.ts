// Configuración de APIs externas

// Google Places API
export const GOOGLE_PLACES_API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY || '';

// Configuración para Google Places
export const GOOGLE_PLACES_CONFIG = {
  apiKey: GOOGLE_PLACES_API_KEY,
  libraries: ['places'] as const,
  region: 'ES', // España
  language: 'es', // Español
};

// Validar que la API key esté configurada
export const isGooglePlacesEnabled = () => {
  return GOOGLE_PLACES_API_KEY.length > 0;
};

// Configuración específica para Madrid
export const MADRID_BOUNDS = {
  north: 40.6,
  south: 40.3,
  east: -3.5,
  west: -3.9,
};

export const MADRID_CENTER = {
  lat: 40.4168,
  lng: -3.7038,
};