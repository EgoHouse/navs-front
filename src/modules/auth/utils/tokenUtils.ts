/**
 * Auth Module - Token Utilities
 * Utilidades para manejo de tokens JWT
 */

import { API_CONFIG } from '@lib/utils/constants';

/**
 * Obtener token del localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);
};

/**
 * Guardar token en localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem(API_CONFIG.JWT_TOKEN_KEY, token);
};

/**
 * Eliminar token del localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);
};

/**
 * Verificar si el token es válido
 * Valida si existe y si no ha expirado
 */
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decodificar payload del JWT (formato: header.payload.signature)
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Verificar que tenga fecha de expiración
    if (!payload.exp) return false;

    // Verificar que no haya expirado (exp está en segundos, Date.now() en milisegundos)
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    // Si hay error al decodificar, el token no es válido
    return false;
  }
};

/**
 * Decodificar token JWT sin validarlo
 * Útil para obtener información del usuario del token
 */
export const decodeToken = (token: string): Record<string, any> | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

/**
 * Utilidades de token agrupadas
 */
export const tokenUtils = {
  get: getToken,
  set: setToken,
  remove: removeToken,
  isValid: isTokenValid,
  decode: decodeToken,
};
