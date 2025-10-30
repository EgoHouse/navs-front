// Utilidades para validación de formularios

/**
 * Valida si un email tiene un formato válido
 * Incluye validaciones adicionales para dominios comunes y caracteres especiales
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'El email es requerido' };
  }

  // Patrón más estricto para emails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Formato de email inválido' };
  }

  // Validar longitud
  if (email.length > 254) {
    return { isValid: false, error: 'El email es demasiado largo' };
  }

  // Validar que no empiece o termine con punto
  if (email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, error: 'El email no puede empezar o terminar con un punto' };
  }

  // Validar que no tenga puntos consecutivos
  if (email.includes('..')) {
    return { isValid: false, error: 'El email no puede tener puntos consecutivos' };
  }

  // Validar dominio común
  const domain = email.split('@')[1];
  if (domain) {
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'terra.es', 'telefonica.net'];
    const isCommonDomain = commonDomains.some(d => domain.toLowerCase() === d);
    
    // Si no es un dominio común, verificar que al menos tenga formato válido
    if (!isCommonDomain && !domain.includes('.')) {
      return { isValid: false, error: 'El dominio del email parece incorrecto' };
    }
  }

  return { isValid: true };
};

/**
 * Valida si un número de teléfono español es válido
 * Acepta formatos: +34XXXXXXXXX, 34XXXXXXXXX, XXXXXXXXX, XXX XXX XXX, XXX-XXX-XXX
 */
export const validateSpanishPhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone) {
    return { isValid: false, error: 'El teléfono es requerido' };
  }

  // Limpiar el teléfono de espacios, guiones y otros caracteres
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // Patrones para teléfonos españoles
  const patterns = [
    /^\+34[6-9]\d{8}$/, // +34 seguido de 9 dígitos empezando por 6,7,8,9
    /^34[6-9]\d{8}$/,   // 34 seguido de 9 dígitos empezando por 6,7,8,9
    /^[6-9]\d{8}$/,     // 9 dígitos empezando por 6,7,8,9
  ];

  const isValid = patterns.some(pattern => pattern.test(cleanPhone));

  if (!isValid) {
    // Verificar longitud específica
    if (cleanPhone.length < 9) {
      return { isValid: false, error: 'El teléfono es demasiado corto' };
    }
    if (cleanPhone.length > 12) {
      return { isValid: false, error: 'El teléfono es demasiado largo' };
    }
    
    // Verificar que empiece por un número válido
    const firstDigit = cleanPhone.replace(/^\+?34/, '')[0];
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      return { isValid: false, error: 'Los móviles españoles deben empezar por 6, 7, 8 o 9' };
    }

    return { isValid: false, error: 'Formato de teléfono español inválido' };
  }

  return { isValid: true };
};

/**
 * Formatea un número de teléfono español para mostrarlo de forma legible
 */
export const formatSpanishPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Si tiene código de país, formatearlo
  if (cleanPhone.startsWith('+34')) {
    const number = cleanPhone.substring(3);
    return `+34 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
  }
  
  if (cleanPhone.startsWith('34')) {
    const number = cleanPhone.substring(2);
    return `+34 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
  }
  
  // Si es solo el número nacional
  if (cleanPhone.length === 9) {
    return `${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`;
  }
  
  return phone;
};

/**
 * Valida una contraseña según criterios de seguridad
 */
export const validatePassword = (password: string): { isValid: boolean; error?: string; strength?: 'weak' | 'medium' | 'strong' } => {
  if (!password) {
    return { isValid: false, error: 'La contraseña es requerida' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'La contraseña debe tener al menos 6 caracteres', strength: 'weak' };
  }

  if (password.length < 8) {
    return { isValid: true, strength: 'weak' };
  }

  // Verificar criterios de fortaleza
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaCount = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (criteriaCount >= 3 && password.length >= 8) {
    return { isValid: true, strength: 'strong' };
  }

  if (criteriaCount >= 2) {
    return { isValid: true, strength: 'medium' };
  }

  return { isValid: true, strength: 'weak' };
};

/**
 * Valida que el nombre tenga un formato apropiado
 */
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name) {
    return { isValid: false, error: 'El nombre es requerido' };
  }

  if (name.length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'El nombre es demasiado largo' };
  }

  // Verificar que solo contenga letras, espacios, y algunos caracteres especiales
  const nameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-'\.]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: 'El nombre solo puede contener letras, espacios y algunos caracteres especiales' };
  }

  // Verificar que no sea solo espacios
  if (name.trim().length === 0) {
    return { isValid: false, error: 'El nombre no puede estar vacío' };
  }

  return { isValid: true };
};