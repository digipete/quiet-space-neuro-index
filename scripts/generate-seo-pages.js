import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes with their SEO data
const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'NeuroIndex - Find Neuro-Friendly Workspaces | Quiet Space Club',
    description: 'Discover inclusive, neuro-accessible workspaces designed for neurodivergent professionals. Search ADHD-friendly, autism-accessible coworking spaces with our science-based NeuroFlow rating system.',
    keywords: 'neuro-friendly workspaces, neurodivergent coworking, ADHD workspace, autism accessible office, sensory-friendly coworking, neurodiverse workplace, inclusive office space, quiet workspace, neuro accommodation, ADHD coworking space'
  },
  {
    path: '/spaces',
    file: 'spaces/index.html',
    title: 'Search Neuro-Friendly Workspaces | NeuroIndex Directory',
    description: 'Browse and search our comprehensive directory of neuro-accessible workspaces. Find ADHD-friendly and autism-accessible coworking spaces with detailed NeuroFlow scores and reviews.',
    keywords: 'search workspaces, neuro workspace directory, ADHD office search, autism coworking finder, sensory workspace search, neurodivergent office directory, accessible workspace listings, quiet space finder'
  },
  {
    path: '/about',
    file: 'about/index.html',
    title: 'About Quiet Space Club | NeuroIndex for Neuro-Friendly Workspaces',
    description: 'Learn about our mission to connect neurodivergent individuals with accessible, sensory-friendly workspaces. Discover our evidence-based approach and community-driven platform.',
    keywords: 'about quiet space club, neurodiverse workplace inclusion, autism workplace support, ADHD office solutions, sensory accessibility research, neurodivergent community platform, inclusive workspace mission'
  },
  {
    path: '/how-it-works',
    file: 'how-it-works/index.html', 
    title: 'How NeuroFlow Works | Science-Based Neuro-Accessibility Rating',
    description: 'Understand our NeuroFlow methodology that combines neuroscience research and environmental psychology to rate workspace neuro-accessibility for ADHD, autism, and sensory needs.',
    keywords: 'NeuroFlow methodology, neuro-accessibility rating, workplace neuroscience, ADHD workspace assessment, autism office evaluation, sensory workspace scoring, neurodivergent workplace research'
  },
  {
    path: '/workspace-providers',
    file: 'workspace-providers/index.html',
    title: 'Partner with Quiet Space Club | Neuro-Accessibility Certification',
    description: 'Transform your coworking space with neuro-accessibility certification. Attract neurodivergent professionals and create inclusive environments with our NeuroFlow assessment.',
    keywords: 'workspace certification, neuro-accessible coworking, ADHD workplace certification, autism office certification, inclusive workspace provider, neurodivergent coworking partner, workspace accessibility assessment'
  },
  {
    path: '/resources',
    file: 'resources/index.html',
    title: 'Neurodiversity Resources | Workplace Inclusion Guides',
    description: 'Access comprehensive resources on neurodiversity in the workplace, including guides for creating ADHD-friendly and autism-accessible work environments.',
    keywords: 'neurodiversity resources, ADHD workplace guide, autism work support, workplace inclusion resources, neurodivergent employee support, sensory workplace tips, neuro-friendly office design'
  },
  {
    path: '/contact',
    file: 'contact/index.html',
    title: 'Contact Quiet Space Club | Get Support for Neuro-Friendly Workspaces',
    description: 'Get in touch with our team for support finding neuro-accessible workspaces or partnering with us. We help neurodivergent professionals and inclusive workspace providers.',
    keywords: 'contact quiet space club, neurodiversity support, ADHD workspace help, autism accommodation support, neuro-friendly workspace assistance, inclusive office consultation'
  }
];

function generateHTML(route) {
  const canonicalUrl = `https://index.quietspace.club${route.path === '/' ? '' : route.path}`;
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="${route.keywords}" />
    <meta name="author" content="Quiet Space Club" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
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
        "logo": "https://index.quietspace.club/og-image.png"
      }
    }
    </script>
    
    <!-- GitHub Pages SPA redirect handler -->
    <script>
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
    
    <!-- Preload critical resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>

  <body>
    <!-- Fallback content for search engines -->
    <noscript>
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        <p>Please enable JavaScript to view the full interactive experience at <a href="${canonicalUrl}">${canonicalUrl}</a></p>
      </div>
    </noscript>

    <div id="root">
      <!-- Loading state with proper content -->
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; text-align: center;">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        <div style="margin: 20px 0;">Loading interactive content...</div>
      </div>
    </div>
    
    <script type="module" src="/src/main.tsx"></script>
    
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
}

async function generateSEOPages() {
  console.log('🚀 Generating SEO-optimized static pages...');
  
  const distDir = path.join(__dirname, '../dist');
  
  console.log('📁 Build directory:', distDir);
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ Build directory does not exist. Run npm run build first.');
    process.exit(1);
  }

  // Generate optimized HTML for each route
  for (const route of routes) {
    try {
      console.log(`📄 Generating SEO page: ${route.path} -> ${route.file}`);
      
      const html = generateHTML(route);
      const outputPath = path.join(distDir, route.file);
      const outputDir = path.dirname(outputPath);
      
      // Ensure directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(outputPath, html);
      
      console.log(`✅ Generated ${route.file}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${route.path}:`, error.message);
    }
  }
  
  console.log('🎉 SEO page generation completed!');
  console.log('📋 Generated files:');
  routes.forEach(route => {
    const filePath = path.join(distDir, route.file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${route.file} (${(fs.statSync(filePath).size / 1024).toFixed(1)}KB)`);
    }
  });
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

generateSEOPages().catch(console.error);