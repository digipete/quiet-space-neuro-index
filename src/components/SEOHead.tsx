import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const defaultSEO = {
  title: "NeuroIndex - Find Neuro-Friendly Workspaces | Quiet Space Club",
  description: "Discover certified neuro-inclusive workspaces designed for neurodivergent individuals. Find quiet, sensory-friendly offices, coworking spaces, and meeting rooms with NeuroFlow assessment scores.",
  keywords: "neurodiverse workspaces, neurodivergent office spaces, sensory-friendly coworking, autism-friendly workspaces, ADHD workplace, quiet office spaces, neuro-inclusive environments, accessible workspaces, NeuroFlow certification, workspace providers, neurodiverse talent, inclusive office design, sensory overload prevention, noise-controlled workspaces, adaptable lighting offices",
  image: "https://index.quietspace.club/og-image.png",
  type: "website"
};

export const SEOHead = ({ title, description, keywords, image, type }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `https://index.quietspace.club${location.pathname}`;
  
  const seoTitle = title || defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = keywords || defaultSEO.keywords;
  const seoImage = image || defaultSEO.image;
  const seoType = type || defaultSEO.type;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    
    // Open Graph tags
    updateMetaTag('og:title', seoTitle, 'property');
    updateMetaTag('og:description', seoDescription, 'property');
    updateMetaTag('og:image', seoImage, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:type', seoType, 'property');
    
    // Twitter tags
    updateMetaTag("twitter:title", seoTitle);
    updateMetaTag("twitter:description", seoDescription);
    updateMetaTag("twitter:image", seoImage);
    updateMetaTag("twitter:url", canonicalUrl);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [seoTitle, seoDescription, seoKeywords, seoImage, seoType, canonicalUrl]);

  return null;
};