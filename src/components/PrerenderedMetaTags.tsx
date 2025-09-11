import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface PrerenderedMetaTagsProps {
  title: string;
  description: string;
  canonicalUrl: string;
  structuredData?: any;
  metaTags?: MetaTag[];
}

export const PrerenderedMetaTags = ({ 
  title, 
  description, 
  canonicalUrl, 
  structuredData,
  metaTags = [] 
}: PrerenderedMetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Only run if we're in a prerendered environment (react-snap)
    if (typeof window !== 'undefined' && (window as any).reactSnap) {
      // Set document title
      document.title = title;

      // Update basic meta tags
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', description);
      }

      // Update canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }

      // Add custom meta tags
      metaTags.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        let meta = document.querySelector(selector);
        
        if (!meta) {
          meta = document.createElement('meta');
          if (name) meta.setAttribute('name', name);
          if (property) meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
      });

      // Add structured data if provided
      if (structuredData) {
        const existingLD = document.querySelector('script[type="application/ld+json"]');
        if (existingLD) {
          existingLD.textContent = JSON.stringify(structuredData);
        } else {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(structuredData);
          document.head.appendChild(script);
        }
      }
    }
  }, [title, description, canonicalUrl, structuredData, metaTags, location.pathname]);

  return null;
};