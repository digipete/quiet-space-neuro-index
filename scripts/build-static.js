import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildStatic() {
  try {
    console.log('🏗️  Building React app...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('📄 Generating SEO-optimized static pages...');
    await import('./generate-seo-pages.js');
    
    console.log('📁 Copying static assets...');
    const distDir = path.join(__dirname, '../dist');
    const publicDir = path.join(__dirname, '../public');
    
    // Generate updated sitemap with current date
    console.log('🗺️  Generating updated sitemap...');
    const currentDate = new Date().toISOString().split('T')[0];
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
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
    console.log('✅ Generated updated sitemap.xml');
    
    // Copy additional static files
    const staticFiles = [
      'robots.txt',
      '.htaccess',
      'CNAME',
      'google-site-verification.html',
      'humans.txt',
      'manifest.json',
      'status.json',
      '.nojekyll'
    ];
    
    staticFiles.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file}`);
      }
    });

    // Generate GitHub Pages 404.html for SPA routing
    console.log('📄 Generating 404.html for SPA routing...');
    const spa404Content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting... | Quiet Space Club</title>
    <script>
      // GitHub Pages SPA redirect
      const pathSegmentsToKeep = 1;
      const location = window.location;
      const pathname = location.pathname.slice(1);
      
      if (pathname) {
        location.replace(
          location.protocol + '//' + location.hostname + location.port +
          '/?redirect=' + encodeURIComponent(location.pathname + location.search + location.hash)
        );
      }
    </script>
  </head>
  <body>
    <p>Redirecting to the main application...</p>
  </body>
</html>`;
    
    fs.writeFileSync(path.join(distDir, '404.html'), spa404Content);
    console.log('✅ Generated 404.html for SPA routing');
    
    console.log('🎉 Static build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildStatic();