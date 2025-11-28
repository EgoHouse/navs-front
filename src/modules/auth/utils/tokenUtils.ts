import { API_CONFIG } from '@lib/utils/constants';

const getToken = (): string | null => {
  return localStorage.getItem(API_CONFIG.JWT_TOKEN_KEY);
};

const setToken = (token: string): void => {
  localStorage.setItem(API_CONFIG.JWT_TOKEN_KEY, token);
};

const removeToken = (): void => {
  localStorage.removeItem(API_CONFIG.JWT_TOKEN_KEY);
};

const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) return false;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const decodeToken = (token: string): Record<string, any> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

export const tokenUtils = {
  get: getToken,
  set: setToken,
  remove: removeToken,
  isValid: isTokenValid,
  decode: decodeToken,
};
