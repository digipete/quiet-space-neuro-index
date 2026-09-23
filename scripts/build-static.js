import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes, getBlogRoutes, SITE_URL, canonicalFor } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function buildSitemap(routes) {
  const urls = routes.map((r) => [
    '  <url>',
    `    <loc>${canonicalFor(r.path)}</loc>`,
    r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>` : null,
    r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : null,
    r.priority ? `    <priority>${r.priority}</priority>` : null,
    '  </url>',
  ].filter(Boolean).join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

const SITE_SUMMARY =
  'The UK directory of neuro-inclusive workspaces. Every space carries a Neuro Index score covering noise, lighting, sensory load and quiet-space provision, so neurodivergent professionals can find offices, coworking spaces and meeting rooms that actually work for them. The site also publishes practical UK guidance on neurodiversity at work for HR teams, managers and neurodivergent professionals.';

const GUIDE_PATHS = new Set([
  '/neurodiversity-in-the-workplace',
  '/neuroinclusion-for-employers',
  '/for/hr-teams',
  '/for/managers',
  '/for/neurodivergent-professionals',
  '/quiet-workspaces/london',
  '/tools/sensory-self-assessment',
]);

function fileFor(distDir, routePath) {
  return routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.slice(1), 'index.html');
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Read the real, pre-rendered title and description so the AI files can never
// drift from what the site actually serves.
function readMeta(distDir, routePath) {
  const html = fs.readFileSync(fileFor(distDir, routePath), 'utf8');
  const title = decodeEntities((html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || routePath).trim());
  const description = decodeEntities(
    (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1] || '').trim(),
  );
  const body = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  const text = decodeEntities(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
  return { title, description, text };
}

function buildLlmsTxt(distDir, routes) {
  const entry = (r) => {
    const { title, description } = readMeta(distDir, r.path);
    return `- [${title}](${r.path === '/' ? '/' : `${r.path}/`})${description ? `: ${description}` : ''}`;
  };

  const pages = routes.filter(
    (r) => !r.path.startsWith('/blog/') && !r.path.startsWith('/space/') && !GUIDE_PATHS.has(r.path),
  );
  const guides = routes.filter((r) => GUIDE_PATHS.has(r.path));
  const posts = routes.filter((r) => r.path.startsWith('/blog/'));
  const spaces = routes.filter((r) => r.path.startsWith('/space/'));

  return [
    '# NeuroIndex — Quiet Space Club',
    '',
    `> ${SITE_SUMMARY}`,
    '',
    '## Pages',
    '',
    ...pages.map(entry),
    '',
    '## Guides',
    '',
    ...guides.map(entry),
    '',
    '## Blog',
    '',
    ...posts.map(entry),
    '',
    '## Workspace listings',
    '',
    ...spaces.map(entry),
    '',
    '## Full text',
    '',
    `- [Every page as one document](/llms-full.txt)`,
    '',
  ].join('\n');
}

// One document containing the readable text of every page, so an AI assistant
// can read the whole site in a single fetch instead of crawling 39 URLs.
function buildLlmsFullTxt(distDir, routes) {
  const blocks = routes.map((r) => {
    const { title, description, text } = readMeta(distDir, r.path);
    return [
      `## ${title}`,
      '',
      `URL: ${canonicalFor(r.path)}`,
      description ? `Summary: ${description}` : null,
      '',
      text,
      '',
    ]
      .filter((line) => line !== null)
      .join('\n');
  });

  return [
    '# NeuroIndex — Quiet Space Club (full text)',
    '',
    `> ${SITE_SUMMARY}`,
    '',
    ...blocks,
  ].join('\n');
}

async function buildStatic() {
  try {
    console.log('🏗️  Building React app...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('🎨 Pre-rendering pages with Puppeteer for SEO...');
    execSync('node scripts/prerender-with-puppeteer.js', { stdio: 'inherit' });

    const distDir = path.join(__dirname, '../dist');
    const publicDir = path.join(__dirname, '../public');

    console.log('🗺️  Generating sitemap from live route list...');
    const routes = await getAllRoutes();
    const sitemap = buildSitemap(routes);
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`✅ sitemap.xml written (${routes.length} URLs)`);

    console.log('🤖 Generating llms.txt and llms-full.txt...');
    const llms = buildLlmsTxt(distDir, routes);
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llms);
    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
    const llmsFull = buildLlmsFullTxt(distDir, routes);
    fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFull);
    console.log(`✅ llms.txt (${routes.length} URLs) and llms-full.txt written`);

    // Copy additional static files
    const staticFiles = [
      'robots.txt',
      '.htaccess',
      'CNAME',
      'google-site-verification.html',
      'humans.txt',
      'manifest.json',
      'status.json',
      '.nojekyll',
      // IndexNow ownership key — lets us tell Bing/Yandex the moment pages change.
      '83dbfd005d7df55d9762034ff907ea8b.txt'
    ];

    staticFiles.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file}`);
      }
    });

    // CNAME lives at the repo root for GitHub Pages
    const rootCname = path.join(__dirname, '../CNAME');
    if (fs.existsSync(rootCname)) {
      fs.copyFileSync(rootCname, path.join(distDir, 'CNAME'));
      console.log('✅ Copied CNAME');
    }

    // 404.html: an honest, noindex "page not found" page. It must NOT bounce to
    // the homepage — Google reads that as a redirect and reports redirect errors.
    // Every indexable route is a real pre-rendered index.html, so no SPA shim.
    const notFoundSrc = path.join(publicDir, '404.html');
    if (!fs.existsSync(notFoundSrc)) {
      throw new Error('public/404.html is missing');
    }
    const notFoundHtml = fs.readFileSync(notFoundSrc, 'utf8');
    if (/location\.replace|window\.location\s*=/.test(notFoundHtml)) {
      throw new Error('public/404.html must not redirect — Google reports it as a redirect error');
    }
    fs.copyFileSync(notFoundSrc, path.join(distDir, '404.html'));
    console.log('✅ Copied 404.html (no redirect, noindex)');


    // Verification: every sitemap URL must have a real pre-rendered file.
    console.log('🔍 Verifying every sitemap URL has a pre-rendered page...');
    const missing = routes.filter((r) => {
      const file = r.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, r.path.slice(1), 'index.html');
      return !fs.existsSync(file);
    });

    if (missing.length) {
      throw new Error(
        `${missing.length} sitemap URL(s) have no pre-rendered page: ${missing.map((m) => m.path).join(', ')}`,
      );
    }
    console.log(`✅ All ${routes.length} sitemap URLs are pre-rendered`);

    // Verification: head tags must be unique and self-referencing on every page.
    console.log('🔍 Verifying head tags (one title/description/canonical per page)...');
    const headProblems = [];
    for (const r of routes) {
      const file = r.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, r.path.slice(1), 'index.html');
      const html = fs.readFileSync(file, 'utf8');

      const titles = html.match(/<title[^>]*>/gi) || [];
      const descriptions = html.match(/<meta[^>]*name="description"[^>]*>/gi) || [];
      const canonicals = html.match(/<link[^>]*rel="canonical"[^>]*>/gi) || [];
      const expected = canonicalFor(r.path);

      if (titles.length !== 1) headProblems.push(`${r.path}: ${titles.length} <title> tags`);
      if (descriptions.length !== 1) headProblems.push(`${r.path}: ${descriptions.length} description tags`);
      if (canonicals.length !== 1) headProblems.push(`${r.path}: ${canonicals.length} canonical tags`);
      else if (!canonicals[0].includes(`href="${expected}"`)) {
        headProblems.push(`${r.path}: canonical is not ${expected}`);
      }
    }

    if (headProblems.length) {
      throw new Error(`Head tag problems found:\n  - ${headProblems.join('\n  - ')}`);
    }
    console.log(`✅ Head tags verified on all ${routes.length} pages`);

    // Verification: no internal link may point at an address that redirects.
    // GitHub Pages 301s the slash-less form, and Google logs those as redirects.
    console.log('🔍 Verifying internal links never point at a redirecting address...');
    const indexable = new Set(routes.map((r) => (r.path === '/' ? '/' : `${r.path}/`)));
    const linkProblems = [];
    for (const r of routes) {
      const file = r.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, r.path.slice(1), 'index.html');
      const html = fs.readFileSync(file, 'utf8');
      const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
      for (const href of new Set(hrefs)) {
        if (href.endsWith('/')) continue;
        if (indexable.has(`${href}/`)) linkProblems.push(`${r.path} → ${href}`);
      }
    }

    if (linkProblems.length) {
      throw new Error(`Internal links pointing at redirecting addresses:\n  - ${linkProblems.join('\n  - ')}`);
    }
    console.log('✅ Internal links verified (no redirecting addresses)');

    console.log('🎉 Static build completed successfully!');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildStatic();
