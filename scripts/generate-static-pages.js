import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/spaces', file: 'spaces.html' },
  { path: '/workspace-providers', file: 'workspace-providers.html' },
  { path: '/about', file: 'about.html' },
  { path: '/how-it-works', file: 'how-it-works.html' },
  { path: '/resources', file: 'resources.html' },
  { path: '/contact', file: 'contact.html' }
];

async function generateStaticPages() {
  console.log('🚀 Starting static page generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for consistent rendering
  await page.setViewport({ width: 1200, height: 800 });
  
  const distDir = path.join(__dirname, '../dist');
  
  console.log('📁 Build directory:', distDir);
  console.log('📂 Directory exists:', fs.existsSync(distDir));
  
  if (fs.existsSync(distDir)) {
    console.log('📄 Files in dist:', fs.readdirSync(distDir));
  }

  for (const route of routes) {
    try {
      console.log(`📄 Generating ${route.path}...`);
      
      // Navigate to the route
      const url = `file://${path.join(distDir, 'index.html')}#${route.path}`;
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for React to render
      await page.waitForTimeout(2000);
      
      // Wait for content to load
      await page.waitForSelector('main, [role="main"], .container', { timeout: 10000 });
      
      // Get the fully rendered HTML
      const html = await page.content();
      
      // Clean up the HTML for static serving
      const cleanHtml = html
        .replace(/file:\/\/.*?\/dist\//g, '/')
        .replace(/#\//g, '/')
        .replace(/href="#([^"]*?)"/g, 'href="/$1"')
        .replace(/href="\/"/g, 'href="/"');
      
      // Write to file
      const outputPath = path.join(distDir, route.file);
      fs.writeFileSync(outputPath, cleanHtml);
      
      console.log(`✅ Generated ${route.file} at ${outputPath}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${route.path}:`, error.message);
    }
  }
  
  await browser.close();
  
  // Copy the main index.html as fallback
  const indexPath = path.join(distDir, 'index.html');
  const mainIndexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Create directories for clean URLs
  routes.forEach(route => {
    if (route.path !== '/') {
      const routePath = route.path.replace(/^\//, '');
      const routeDir = path.join(distDir, routePath);
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      // Copy the generated HTML to the directory
      const routeFile = route.file;
      const generatedPath = path.join(distDir, routeFile);
      
      if (fs.existsSync(generatedPath)) {
        fs.copyFileSync(generatedPath, path.join(routeDir, 'index.html'));
      }
    }
  });
  
  console.log('🎉 Static page generation completed!');
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

generateStaticPages().catch(console.error);