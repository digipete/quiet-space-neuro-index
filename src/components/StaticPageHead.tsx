import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface StaticPageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const StaticPageHead = ({ title, description, keywords }: StaticPageHeadProps) => {
  const location = useLocation();

  useEffect(() => {
    // Only update if we're in a static generation environment or initial load
    const isStaticGeneration = typeof window !== 'undefined' && 
      (window.location.protocol === 'file:' || window.navigator.userAgent.includes('HeadlessChrome'));
    
    if (!isStaticGeneration && document.querySelector('meta[data-static-generated]')) {
      // Don't override if we already have static meta tags
      return;
    }

    const updateMetaTag = (selector: string, content: string, attribute = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const selectorParts = selector.match(/\[([^=]+)=["']([^"']+)["']\]/);
        if (selectorParts) {
          element.setAttribute(selectorParts[1], selectorParts[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
      element.setAttribute('data-static-generated', 'true');
    };

    if (title) {
      document.title = title;
    }

    if (description) {
      updateMetaTag('meta[name="description"]', description);
      updateMetaTag('meta[property="og:description"]', description);
      updateMetaTag('meta[name="twitter:description"]', description);
    }

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }

    // Update Open Graph and Twitter meta tags
    if (title) {
      updateMetaTag('meta[property="og:title"]', title);
      updateMetaTag('meta[name="twitter:title"]', title);
    }

    const canonicalUrl = `https://index.quietspace.club${location.pathname}`;
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    canonical.setAttribute('data-static-generated', 'true');

  }, [title, description, keywords, location.pathname]);

  return null;
};

// Route-specific configurations for static generation
export const routeConfigs = {
  '/': {
    title: 'NeuroIndex - Find Neuro-Friendly Workspaces | Quiet Space Club',
    description: 'Discover inclusive, neuro-accessible workspaces designed for neurodivergent professionals. Search ADHD-friendly, autism-accessible coworking spaces with our science-based NeuroFlow rating system.',
    keywords: 'neuro-friendly workspaces, neurodivergent coworking, ADHD workspace, autism accessible office, sensory-friendly coworking, neurodiverse workplace, inclusive office space, quiet workspace, neuro accommodation, ADHD coworking space'
  },
  '/spaces': {
    title: 'Search Neuro-Friendly Workspaces | NeuroIndex Directory',
    description: 'Browse and search our comprehensive directory of neuro-accessible workspaces. Find ADHD-friendly and autism-accessible coworking spaces with detailed NeuroFlow scores and reviews.',
    keywords: 'search workspaces, neuro workspace directory, ADHD office search, autism coworking finder, sensory workspace search, neurodivergent office directory, accessible workspace listings, quiet space finder'
  },
  '/about': {
    title: 'About Quiet Space Club | NeuroIndex for Neuro-Friendly Workspaces',
    description: 'Learn about our mission to connect neurodivergent individuals with accessible, sensory-friendly workspaces. Discover our evidence-based approach and community-driven platform.',
    keywords: 'about quiet space club, neurodiverse workplace inclusion, autism workplace support, ADHD office solutions, sensory accessibility research, neurodivergent community platform, inclusive workspace mission'
  },
  '/how-it-works': {
    title: 'How NeuroFlow Works | Science-Based Neuro-Accessibility Rating',
    description: 'Understand our NeuroFlow methodology that combines neuroscience research and environmental psychology to rate workspace neuro-accessibility for ADHD, autism, and sensory needs.',
    keywords: 'NeuroFlow methodology, neuro-accessibility rating, workplace neuroscience, ADHD workspace assessment, autism office evaluation, sensory workspace scoring, neurodivergent workplace research'
  },
  '/workspace-providers': {
    title: 'Partner with Quiet Space Club | Neuro-Accessibility Certification',
    description: 'Transform your coworking space with neuro-accessibility certification. Attract neurodivergent professionals and create inclusive environments with our NeuroFlow assessment.',
    keywords: 'workspace certification, neuro-accessible coworking, ADHD workplace certification, autism office certification, inclusive workspace provider, neurodivergent coworking partner, workspace accessibility assessment'
  },
  '/resources': {
    title: 'Neurodiversity Resources | Workplace Inclusion Guides',
    description: 'Access comprehensive resources on neurodiversity in the workplace, including guides for creating ADHD-friendly and autism-accessible work environments.',
    keywords: 'neurodiversity resources, ADHD workplace guide, autism work support, workplace inclusion resources, neurodivergent employee support, sensory workplace tips, neuro-friendly office design'
  },
  '/contact': {
    title: 'Contact Quiet Space Club | Get Support for Neuro-Friendly Workspaces',
    description: 'Get in touch with our team for support finding neuro-accessible workspaces or partnering with us. We help neurodivergent professionals and inclusive workspace providers.',
    keywords: 'contact quiet space club, neurodiversity support, ADHD workspace help, autism accommodation support, neuro-friendly workspace assistance, inclusive office consultation'
  }
};