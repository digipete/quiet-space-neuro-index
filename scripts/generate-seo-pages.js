import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define routes and their SEO metadata
const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'Quiet Workspaces | Neuroinclusive Office Spaces Near You',
    description: 'Find neuroinclusive workspaces designed for focus and productivity. Discover quiet offices, private booths, and accessible coworking spaces that support neurodivergent professionals.',
    keywords: 'quiet workspace, neuroinclusive office, coworking space, neurodivergent workspace, focus rooms, private office, accessible workspace, quiet office near me',
  },
  {
    path: '/spaces',
    file: 'spaces.html', 
    title: 'Browse Quiet Workspaces | Filter by Location & Amenities',
    description: 'Browse our curated directory of quiet workspaces. Filter by location, amenities, and accessibility features to find your perfect neuroinclusive office space.',
    keywords: 'browse workspaces, quiet office directory, neuroinclusive coworking, accessible office spaces, workspace finder, quiet rooms, focus spaces',
  },
  {
    path: '/about',
    file: 'about.html',
    title: 'About Quiet Space Club | Neuroinclusive Workspace Directory',
    description: 'Learn about our mission to make workspaces more accessible for neurodivergent professionals. Discover how we\'re building a more inclusive future of work.',
    keywords: 'about quiet space club, neuroinclusive mission, neurodivergent workspace advocacy, accessible office spaces, inclusive coworking',
  },
  {
    path: '/how-it-works',
    file: 'how-it-works.html',
    title: 'How It Works | Find & Book Quiet Workspaces Easily',
    description: 'Learn how to find, book, and access neuroinclusive workspaces through our platform. Simple steps to secure your perfect quiet office space.',
    keywords: 'how to book workspace, quiet office booking, neuroinclusive workspace guide, coworking booking process, workspace reservation',
  },
  {
    path: '/resources',
    file: 'resources.html',
    title: 'Resources | Guides for Neurodivergent Professionals',
    description: 'Access guides, tips, and resources for neurodivergent professionals navigating the modern workplace. Tools for creating inclusive work environments.',
    keywords: 'neurodivergent resources, workplace accessibility guides, neuroinclusive tips, professional development neurodivergent, workplace accommodations',
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Contact Us | Get in Touch with Quiet Space Club',
    description: 'Have questions about our neuroinclusive workspaces? Get in touch with our team for support, partnerships, or to list your quiet office space.',
    keywords: 'contact quiet space club, workspace partnerships, list your space, neuroinclusive support, quiet office questions',
  },
  {
    path: '/workspace-providers',
    file: 'workspace-providers.html',
    title: 'For Workspace Providers | Partner with Quiet Space Club',
    description: 'Are you a workspace provider interested in serving neurodivergent professionals? Learn how to partner with us and make your space more inclusive.',
    keywords: 'workspace provider partnership, neuroinclusive coworking partner, quiet office listing, accessible workspace certification, inclusive office space',
  }
];

async function generateSEOPages() {
  console.log('🚀 Generating SEO-optimized pages...');
  
  // Read the built index.html to get the correct asset references
  const builtIndexPath = path.join(__dirname, '../dist/index.html');
  let assetReferences = '';
  
  if (fs.existsSync(builtIndexPath)) {
    const builtContent = fs.readFileSync(builtIndexPath, 'utf-8');
    
    // Extract script and link tags from the built index.html
    const scriptMatches = builtContent.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g) || [];
    const linkMatches = builtContent.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || [];
    
    // Combine CSS and JS references
    assetReferences = [...linkMatches, ...scriptMatches].join('\n    ');
  }
  
  // Fallback if we can't read the built assets
  if (!assetReferences) {
    console.log('⚠️ Could not find built assets, using fallback references');
    assetReferences = `<link rel="stylesheet" href="/assets/index.css">
    <script type="module" crossorigin src="/assets/index.js"></script>`;
  }

  for (const route of routes) {
    console.log(`📄 Generating ${route.path}...`);
    
    const canonicalUrl = `https://index.quietspace.club${route.path}`;
    const currentYear = new Date().getFullYear();
    
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary SEO -->
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="${route.keywords}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://index.quietspace.club/og-image.png" />
    <meta property="og:site_name" content="Quiet Space Club" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://index.quietspace.club/og-image.png" />

    <!-- Additional SEO -->
    <meta name="theme-color" content="#8B5CF6" />
    <link rel="manifest" href="/manifest.json" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite", 
      "name": "NeuroIndex - Quiet Space Club",
      "description": "${route.description}",
      "url": "${canonicalUrl}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://index.quietspace.club/spaces?query={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Quiet Space Club",
        "url": "https://index.quietspace.club",
        "logo": {
          "@type": "ImageObject",
          "url": "https://index.quietspace.club/og-image.png"
        }
      },
      "dateModified": "${new Date().toISOString()}",
      "inLanguage": "en-US"
    }
    </script>

    <!-- Performance & Accessibility -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Robots & Indexing -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    
    <!-- Author & Copyright -->
    <meta name="author" content="Quiet Space Club" />
    <meta name="copyright" content="© ${currentYear} Quiet Space Club. All rights reserved." />
    
    <!-- Additional Meta -->
    <meta name="rating" content="general" />
    <meta name="distribution" content="global" />
    <meta name="revisit-after" content="7 days" />
  </head>
  <body>
    <noscript>
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        <p>Please enable JavaScript to view the full interactive experience at <a href="${canonicalUrl}">${canonicalUrl}</a></p>
      </div>
    </noscript>

    <div id="root"></div>
    
    <!-- Load the built JavaScript and CSS files -->
    ${assetReferences}
    
    <!-- Redirect non-JS users to main site -->
    <script>
      // Ensure proper routing for SPA
      if (window.location.pathname !== '/' && !window.location.search.includes('redirect=')) {
        const path = window.location.pathname;
        if (path !== '${route.path}') {
          window.history.replaceState(null, null, '${route.path}');
        }
      }
    </script>
  </body>
</html>`;

    // Create directory structure for clean URLs
    const routePath = route.path === '/' ? 'index.html' : route.path.substring(1);
    const outputPath = path.join(__dirname, '../dist', routePath);
    
    if (route.path !== '/') {
      // Create directory for clean URLs (e.g., /about/index.html)
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const indexPath = path.join(dir, 'index.html');
      fs.writeFileSync(indexPath, html);
      console.log(`✅ Generated: ${indexPath}`);
    } else {
      // Root index.html
      fs.writeFileSync(outputPath, html);
      console.log(`✅ Generated: ${outputPath}`);
    }
  }

  console.log('🎉 SEO pages generation complete!');
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the generation
generateSEOPages().catch(console.error);