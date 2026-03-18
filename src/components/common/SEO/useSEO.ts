import { useEffect } from 'react';
import type { SEOProps } from './types';
import { DEFAULT_SEO, GEO_DATA, BUSINESS_INFO } from './constants';

const updateMetaTag = (property: string, content: string, isProperty = false) => {
  const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
  let metaTag = document.querySelector(selector) as HTMLMetaElement;

  if (!metaTag) {
    metaTag = document.createElement('meta');
    if (isProperty) {
      metaTag.setAttribute('property', property);
    } else {
      metaTag.setAttribute('name', property);
    }
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

const createSchemaMarkup = (seo: { title: string; url: string; image: string; keywords: string }, description: string) => ({
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'TobaccoShop', 'NightClub'],
  name: 'EGO HOUSE Madrid - Tetería Premium',
  alternateName: ['EGO HOUSE', 'Mejor Tetería Madrid', 'Cachimba Madrid Centro'],
  description,
  url: seo.url,
  image: seo.image,
  address: {
    '@type': 'PostalAddress',
    streetAddress: GEO_DATA.streetAddress,
    addressLocality: GEO_DATA.locality,
    addressRegion: GEO_DATA.regionName,
    addressCountry: 'ES',
    postalCode: GEO_DATA.postalCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO_DATA.latitude,
    longitude: GEO_DATA.longitude,
  },
  telephone: BUSINESS_INFO.telephone,
  openingHours: BUSINESS_INFO.openingHours,
  servesCuisine: ['Mediterranean', 'International', 'Hookah', 'Shisha'],
  priceRange: BUSINESS_INFO.priceRange,
  keywords: seo.keywords,
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Hookah Lounge',
      value: 'Premium Shisha Experience',
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Tetería Madrid',
      value: 'Authentic Hookah Bar',
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Live Entertainment',
    },
  ],
});

/**
 * Hook para manejar SEO de la página
 */
const useSEO = (props: SEOProps = {}) => {
  const seo = { ...DEFAULT_SEO, ...props };

  useEffect(() => {
    document.title = seo.title;

    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('author', 'EGO HOUSE Madrid');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'es');

    updateMetaTag('geo.region', GEO_DATA.region);
    updateMetaTag('geo.placename', GEO_DATA.placename);
    updateMetaTag('geo.position', GEO_DATA.position);
    updateMetaTag('ICBM', GEO_DATA.icbm);

    updateMetaTag('og:title', seo.title, true);
    updateMetaTag('og:description', seo.description, true);
    updateMetaTag('og:image', seo.image, true);
    updateMetaTag('og:url', seo.url, true);
    updateMetaTag('og:type', seo.type, true);
    updateMetaTag('og:site_name', DEFAULT_SEO.siteName, true);
    updateMetaTag('og:locale', DEFAULT_SEO.locale, true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seo.title);
    updateMetaTag('twitter:description', seo.description);
    updateMetaTag('twitter:image', seo.image);

    updateMetaTag('theme-color', DEFAULT_SEO.themeColor);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.url);

    const existingSchema = document.getElementById('schema-ld');
    if (existingSchema) existingSchema.remove();

    const script = document.createElement('script');
    script.id = 'schema-ld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(createSchemaMarkup(seo, seo.description));
    document.head.appendChild(script);
  }, [seo.title, seo.description, seo.keywords, seo.image, seo.url, seo.type]);
};

export default useSEO;
