/**
 * Cloudinary URL Helper
 *
 * Este módulo gestiona URLs de Cloudinary para optimizar imágenes y videos.
 * El frontend NO sube archivos, solo consume URLs del backend.
 *
 * Cloud Name: dm70hhhnm
 * Base URL: https://res.cloudinary.com/dm70hhhnm/
 */

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dm70hhhnm';

export interface CloudinaryOptions {
  width?: number;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  dpr?: 'auto' | number; // Device pixel ratio
}

/**
 * Optimiza una URL de Cloudinary existente con transformaciones
 */
export function getOptimizedCloudinaryUrl(
  url: string | undefined | null,
  options: CloudinaryOptions = {}
): string | undefined {
  if (!url) return undefined;

  // Si no es una URL de Cloudinary, retornar sin modificar
  if (!url.includes('/upload/')) {
    return url;
  }

  const { width, quality = 'auto', format = 'auto', dpr = 'auto' } = options;

  const transformations: string[] = [];

  // Formato automático (WebP con fallback)
  transformations.push(`f_${format}`);

  // Calidad automática
  transformations.push(`q_${quality}`);

  // Ancho responsive
  if (width) {
    transformations.push(`w_${width}`);
  }

  // Device pixel ratio
  transformations.push(`dpr_${dpr}`);

  const transformString = transformations.join(',');

  // Insertar transformaciones después de /upload/
  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Genera un conjunto de URLs responsive para srcset
 */
export function getResponsiveCloudinarySet(
  url: string | undefined | null,
  options: Omit<CloudinaryOptions, 'width'> = {}
) {
  if (!url) return { src: undefined, srcset: '' };

  const widths = [320, 640, 768, 1024, 1280, 1920];

  const srcset = widths
    .map((width) => {
      const optimizedUrl = getOptimizedCloudinaryUrl(url, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');

  // Usa la imagen de tamaño medio como default
  const src = getOptimizedCloudinaryUrl(url, { ...options, width: 1024 });

  return { src, srcset };
}

/**
 * Verifica si una URL es de Cloudinary
 */
export function isCloudinaryUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return url.includes(CLOUDINARY_BASE_URL) || url.includes('res.cloudinary.com');
}

/**
 * Extrae el public ID de una URL de Cloudinary
 */
export function getCloudinaryPublicId(url: string): string | null {
  if (!isCloudinaryUrl(url)) return null;

  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  return match ? match[1] : null;
}
