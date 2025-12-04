import useSEO from './useSEO';
import type { SEOProps } from './types';

const SEO = (props: SEOProps) => {
  useSEO(props);
  return null;
};

export default SEO;
export { useSEO };
export type { SEOProps };
