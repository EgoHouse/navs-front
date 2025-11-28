import useSEO from './useSEO';
import type { SEOProps } from './types';

/**
 * Componente para manejar SEO de la página
 */
const SEO = (props: SEOProps) => {
  useSEO(props);
  return null;
};

export default SEO;
export { useSEO };
export type { SEOProps };
