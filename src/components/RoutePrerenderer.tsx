import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Route-specific SEO configurations
const routeConfigs = {
  '/': {
    title: 'NeuroIndex - Find Neuro-Friendly Workspaces | Quiet Space Club',
    description: 'Discover certified neuro-inclusive workspaces designed for neurodivergent individuals. Find quiet, sensory-friendly offices, coworking spaces, and meeting rooms with NeuroFlow assessment scores.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NeuroIndex - Quiet Space Club",
      "url": "https://index.quietspace.club",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://index.quietspace.club/spaces?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },
  '/spaces': {
    title: 'Browse Neuro-Friendly Workspaces | NeuroIndex',
    description: 'Browse our directory of neuro-inclusive workspaces. Filter by location, accessibility features, and NeuroFlow certification scores.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Neuro-Friendly Workspaces",
      "description": "Directory of neuro-inclusive workspaces"
    }
  },
  '/workspace-providers': {
    title: 'For Workspace Providers | NeuroIndex',
    description: 'Join our network of neuro-inclusive workspace providers. Get certified and connect with neurodivergent professionals.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Workspace Provider Certification",
      "description": "NeuroFlow certification for workspace providers"
    }
  },
  '/about': {
    title: 'About Quiet Space Club | NeuroIndex',
    description: 'Learn about our mission to create inclusive workspaces for neurodivergent individuals through research-backed design.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Quiet Space Club",
      "description": "Creating neuro-inclusive workspaces"
    }
  },
  '/how-it-works': {
    title: 'How NeuroIndex Works | Quiet Space Club',
    description: 'Understand how our NeuroFlow assessment creates neuro-friendly workspace ratings and helps you find the perfect environment.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find Neuro-Friendly Workspaces",
      "description": "Step-by-step guide to using NeuroIndex"
    }
  },
  '/resources': {
    title: 'Resources for Neurodiverse Professionals | NeuroIndex',
    description: 'Access research, guides, and tools for creating and finding neuro-inclusive workplace environments.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Neurodiverse Workplace Resources",
      "description": "Educational resources and tools"
    }
  },
  '/contact': {
    title: 'Contact Quiet Space Club | NeuroIndex',
    description: 'Get in touch with our team about neuro-inclusive workspaces, partnerships, or general inquiries.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Quiet Space Club",
      "description": "Contact information and inquiry form"
    }
  }
};

export const RoutePrerenderer = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run during prerendering
    if (typeof window !== 'undefined' && (window as any).reactSnap) {
      const config = routeConfigs[location.pathname as keyof typeof routeConfigs];
      
      if (config) {
        // Update document title
        document.title = config.title;
        
        // Update meta description
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
          descMeta.setAttribute('content', config.description);
        }
        
        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://index.quietspace.club${location.pathname}`);
        }
        
        // Update or add structured data
        let ldScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
        if (!ldScript) {
          ldScript = document.createElement('script');
          ldScript.type = 'application/ld+json';
          document.head.appendChild(ldScript);
        }
        ldScript.textContent = JSON.stringify(config.structuredData);
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', config.title);
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', config.description);
        
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://index.quietspace.club${location.pathname}`);
        
        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', config.title);
        
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) twitterDesc.setAttribute('content', config.description);
        
        const twitterUrl = document.querySelector('meta[name="twitter:url"]');
        if (twitterUrl) twitterUrl.setAttribute('content', `https://index.quietspace.club${location.pathname}`);
      }
    }
  }, [location.pathname]);

  return null;
};