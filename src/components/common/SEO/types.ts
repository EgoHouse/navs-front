export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export interface SEOMetaData extends Required<SEOProps> {
  siteName: string;
  locale: string;
  themeColor: string;
}
