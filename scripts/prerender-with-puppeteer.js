import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __dirname = dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/about',
  '/how-it-works',
  '/contact',
  '/resources',
  '/workspace-providers',
  '/spaces'
];

async function prerender() {
  const distDir = join(__dirname, '../dist');
  const port = 3000;
  
  // Create HTTP server to serve the built app
  const server = createServer((request, response) => {
    return handler(request, response, {
      public: distDir,
      rewrites: [{ source: '**', destination: '/index.html' }]
    });
  });

  await new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`🌐 Server running at http://localhost:${port}`);
      resolve();
    });
  });

  let browser;
  
  try {
    console.log('🚀 Launching Puppeteer...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    for (const route of routes) {
      try {
        console.log(`📄 Pre-rendering: ${route}`);
        
        const url = `http://localhost:${port}${route}`;
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });
        
        // Wait for React to render and SEO component to inject meta tags
        await page.waitForSelector('main, [role="main"], .main-content', {
          timeout: 10000
        }).catch(() => {
          console.log(`⚠️  Main content selector not found for ${route}, continuing...`);
        });
        
        // Give react-helmet-async time to update meta tags
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Extract the full rendered HTML
        const html = await page.content();
        
        // Determine output path
        let outputPath;
        if (route === '/') {
          outputPath = join(distDir, 'index.html');
        } else {
          const routePath = route.slice(1); // Remove leading slash
          const routeDir = join(distDir, routePath);
          
          if (!existsSync(routeDir)) {
            mkdirSync(routeDir, { recursive: true });
          }
          
          outputPath = join(routeDir, 'index.html');
        }
        
        // Write the pre-rendered HTML
        writeFileSync(outputPath, html);
        console.log(`✅ Pre-rendered: ${route} → ${outputPath}`);
        
      } catch (error) {
        console.error(`❌ Failed to pre-render ${route}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Pre-rendering failed:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
    console.log('🎉 Pre-rendering completed!');
  }
}

prerender().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
