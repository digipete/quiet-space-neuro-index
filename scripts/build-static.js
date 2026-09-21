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

function buildLlmsTxt(blogRoutes) {
  const source = fs.readFileSync(path.join(__dirname, '../src/data/blogPosts.ts'), 'utf8');
  const titles = [...source.matchAll(/title:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1].replace(/\\'/g, "'"));

  const posts = blogRoutes.map((r, i) => `- [${titles[i] || r.path}](${r.path}/)`);

  return [
    '# NeuroIndex — Quiet Space Club',
    '',
    '> The UK directory of neuro-inclusive workspaces. Every space carries a Neuro Index score covering noise, lighting, sensory load and quiet-space provision, so neurodivergent professionals can find offices, coworking spaces and meeting rooms that actually work for them.',
    '',
    '## Pages',
    '',
    '- [Home](/): What NeuroIndex is and who it is for.',
    '- [Search workspaces](/spaces/): Browse and filter every scored neuro-inclusive workspace.',
    '- [How it works](/how-it-works/): The Neuro Index scoring methodology and assessment process.',
    '- [For workspace providers](/workspace-providers/): How operators get their space assessed and listed.',
    '- [Submit a space](/submit-space/): Add a workspace to the index.',
    '- [Resources](/resources/): Research and guidance on neuro-inclusive workplace design.',
    '- [About](/about/): The Quiet Space Club mission.',
    '- [Contact](/contact/): Get in touch.',
    '',
    '## Blog',
    '',
    ...posts,
    '',
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

    console.log('🤖 Generating llms.txt...');
    const llms = buildLlmsTxt(getBlogRoutes());
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llms);
    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
    console.log('✅ llms.txt written');

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

    console.log('🎉 Static build completed successfully!');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildStatic();
