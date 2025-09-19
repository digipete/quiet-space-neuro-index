import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildWithPrerender() {
  try {
    console.log('🏗️  Building with prerendering for SEO...');
    
    // Build with prerender config
    execSync('npx vite build --config vite.prerender.config.ts', { stdio: 'inherit' });
    
    console.log('🗺️  Generating sitemap...');
    const currentDate = new Date().toISOString().split('T')[0];
    const distDir = path.join(__dirname, '../dist');
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://index.quietspace.club/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/spaces</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/workspace-providers</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/how-it-works</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/resources</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://index.quietspace.club/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
    
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    
    // Copy static files
    const publicDir = path.join(__dirname, '../public');
    const staticFiles = [
      'robots.txt',
      '.htaccess', 
      'CNAME',
      'google-site-verification.html',
      'humans.txt',
      'manifest.json',
      'status.json'
    ];
    
    staticFiles.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file}`);
      }
    });
    
    // Generate 404.html for GitHub Pages SPA routing
    const spa404Content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found | Quiet Space Club</title>
    <script>
      const pathSegmentsToKeep = 0;
      const location = window.location;
      location.replace(
        location.protocol + '//' + location.hostname + location.port +
        '/?redirect=' + encodeURIComponent(location.pathname + location.search + location.hash)
      );
    </script>
  </head>
  <body>
    <p>Redirecting...</p>
  </body>
</html>`;
    
    fs.writeFileSync(path.join(distDir, '404.html'), spa404Content);
    
    console.log('🎉 Prerendered build completed with proper SEO structure!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildWithPrerender();