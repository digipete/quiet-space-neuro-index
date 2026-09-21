import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';
import { getAllRoutes, canonicalFor } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// index.html carries site-wide fallback tags. Once react-helmet-async has injected
// the page's own tags (marked data-rh="true"), the template copies are stale
// duplicates that tell Google every page is really the homepage. Strip them.
const DUPLICATED_META = [
  { attr: 'name', keys: ['description', 'keywords', 'robots'] },
  { attr: 'property', keys: ['og:title', 'og:description', 'og:url', 'og:type', 'og:image'] },
  { attr: 'name', keys: ['twitter:title', 'twitter:description', 'twitter:url', 'twitter:image', 'twitter:card'] },
];

function cleanHead(html, route) {
  let out = html;

  for (const { attr, keys } of DUPLICATED_META) {
    for (const key of keys) {
      const all = [...out.matchAll(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*>`, 'gi'))].map((m) => m[0]);
      const helmetTags = all.filter((t) => t.includes('data-rh'));
      if (!helmetTags.length) continue; // no page-specific version — keep the fallback
      for (const stale of all.filter((t) => !t.includes('data-rh'))) {
        out = out.replace(stale, '');
      }
    }
  }

  // Exactly one canonical, always self-referencing and trailing-slash.
  const canonical = canonicalFor(route);
  out = out.replace(/<link[^>]*rel="canonical"[^>]*>/gi, '');
  out = out.replace('</head>', `<link rel="canonical" href="${canonical}" data-rh="true"></head>`);

  // og:url / twitter:url must match the canonical exactly.
  out = out.replace(/(<meta[^>]*property="og:url"[^>]*content=")[^"]*(")/i, `$1${canonical}$2`);
  out = out.replace(/(<meta[^>]*name="twitter:url"[^>]*content=")[^"]*(")/i, `$1${canonical}$2`);

  return out;
}

// GitHub Pages serves each page at its trailing-slash URL and 301s the slash-less
// form. React Router links (and links inside article copy) are written slash-less,
// so every crawled link was a redirect. Rewrite them in the published HTML — both
// in anchors and inside JSON-LD blocks — so crawlers only ever follow real pages.
export function fixInternalLinks(html, routePaths) {
  let out = html;

  for (const route of routePaths) {
    if (route === '/') continue;
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // href="/blog"  →  href="/blog/"
    out = out.replace(new RegExp(`href="${escaped}"`, 'g'), `href="${route}/"`);
    // "url": "https://index.quietspace.club/blog"  →  ".../blog/"
    out = out.replace(
      new RegExp(`(https://index\\.quietspace\\.club${escaped})(?=["\\\\?])`, 'g'),
      `$1/`,
    );
  }

  return out;
}

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

        // Extract the full rendered HTML and strip stale template head tags
        const html = cleanHead(await page.content(), route);

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
