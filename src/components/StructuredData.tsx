import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'website' | 'article' | 'organization' | 'place';
  data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    let structuredData;
    
    switch (type) {
      case 'website':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NeuroIndex - Quiet Space Club",
          "description": "Find neuro-friendly workspaces designed for neurodivergent individuals",
          "url": "https://index.quietspace.club",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://index.quietspace.club/spaces?query={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
        break;
      case 'organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Quiet Space Club",
          "description": "Connecting neurodivergent individuals with inclusive, accessible workspaces",
          "url": "https://index.quietspace.club",
          "logo": "https://index.quietspace.club/og-image.png",
          "sameAs": []
        };
        break;
      case 'place':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Place",
          ...data
        };
        break;
      default:
        structuredData = data;
    }
    
    script.innerHTML = JSON.stringify(structuredData);
    
    // Remove any existing structured data script for this type
    const existingScript = document.querySelector(`script[data-schema-type="${type}"]`);
    if (existingScript) {
      existingScript.remove();
    }
    
    script.setAttribute('data-schema-type', type);
    document.head.appendChild(script);
    
    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
};

// Default structured data for the website
export const WebsiteStructuredData = () => (
  <StructuredData 
    type="website" 
    data={{}} 
  />
);

export const OrganizationStructuredData = () => (
  <StructuredData 
    type="organization" 
    data={{}} 
  />
);