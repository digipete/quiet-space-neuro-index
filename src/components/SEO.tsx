import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';


interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = 'neurodivergent workspaces, ADHD-friendly spaces, autism-friendly workspaces, quiet workspaces, sensory-friendly offices',
  image = 'https://index.quietspace.club/og-image.png',
  url,
  type = 'website',
  children,
}: SEOProps & { children?: ReactNode }) => {

  const fullTitle = title.includes('NeuroIndex') ? title : `${title} | NeuroIndex`;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `https://index.quietspace.club${pathname}`;


  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="NeuroIndex - Quiet Space Club" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      <meta name="googlebot" content="index, follow" />
      {children}
    </Helmet>
  );
};

