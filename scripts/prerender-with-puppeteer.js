import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';
import { getAllRoutes } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const distDir = join(__dirname, '../dist');
  const port = 3000;

  const routes = (await getAllRoutes()).map((r) => r.path);
  console.log(`🗂️  ${routes.length} routes to pre-render`);

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
  const failed = [];

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
          const routeDir = join(distDir, route.slice(1));

          if (!existsSync(routeDir)) {
            mkdirSync(routeDir, { recursive: true });
          }

          outputPath = join(routeDir, 'index.html');
        }

        writeFileSync(outputPath, html);
        console.log(`✅ Pre-rendered: ${route}`);

      } catch (error) {
        failed.push(route);
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
  }

  if (failed.length) {
    throw new Error(`Pre-rendering failed for ${failed.length} route(s): ${failed.join(', ')}`);
  }

  console.log(`🎉 Pre-rendering completed (${routes.length} routes)!`);
}

prerender().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
