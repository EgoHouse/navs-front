/**
 * Format price with currency symbol
 * @param price - Price number
 * @param currency - Currency symbol (default: '€')
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number | undefined | null,
  currency: string = '€'
): string => {
  if (price === null || price === undefined) {
    return 'Precio no disponible';
  }

  const numPrice = Number(price);
  if (isNaN(numPrice)) {
    return 'Precio no disponible';
  }

  // Remove .00 if it's a whole number
  const formattedNumber = numPrice.toFixed(2).replace('.00', '');
  return `${formattedNumber}${currency}`;
};

/**
 * Format date to locale string
 * @param date - Date string or Date object
 * @param locale - Locale (default: 'es-ES')
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  locale: string = 'es-ES'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Fecha no disponible';
  }
};

/**
 * Format datetime to locale string
 * @param date - Date string or Date object
 * @param locale - Locale (default: 'es-ES')
 * @returns Formatted datetime string
 */
export const formatDateTime = (
  date: string | Date,
  locale: string = 'es-ES'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Fecha no disponible';
  }
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Capitalize first letter of string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format phone number
 * @param phone - Phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as: +34 XXX XXX XXX
  if (cleaned.startsWith('34')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  // Default format: XXX XXX XXX
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
};
