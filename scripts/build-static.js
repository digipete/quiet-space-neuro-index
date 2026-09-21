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

  const posts = blogRoutes.map((r, i) => `- [${titles[i] || r.path}](${r.path})`);

  return [
    '# NeuroIndex — Quiet Space Club',
    '',
    '> The UK directory of neuro-inclusive workspaces. Every space carries a Neuro Index score covering noise, lighting, sensory load and quiet-space provision, so neurodivergent professionals can find offices, coworking spaces and meeting rooms that actually work for them.',
    '',
    '## Pages',
    '',
    '- [Home](/): What NeuroIndex is and who it is for.',
    '- [Search workspaces](/spaces): Browse and filter every scored neuro-inclusive workspace.',
    '- [How it works](/how-it-works): The Neuro Index scoring methodology and assessment process.',
    '- [For workspace providers](/workspace-providers): How operators get their space assessed and listed.',
    '- [Submit a space](/submit-space): Add a workspace to the index.',
    '- [Resources](/resources): Research and guidance on neuro-inclusive workplace design.',
    '- [About](/about): The Quiet Space Club mission.',
    '- [Contact](/contact): Get in touch.',
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

    // Generate GitHub Pages 404.html for SPA routing (unknown URLs only —
    // every indexable route is pre-rendered as a real index.html above).
    console.log('📄 Generating 404.html for SPA routing...');
    const spa404Content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Page not found | Quiet Space Club</title>
    <script>
      const location = window.location;
      if (location.pathname.slice(1)) {
        location.replace(
          location.protocol + '//' + location.host +
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

    // Verification: no published page may link to a URL the server only redirects to.
    console.log('🔍 Verifying no internal link points at a redirecting URL...');
    const routePaths = new Set(routes.map((r) => r.path).filter((p) => p !== '/'));
    const linkProblems = [];
    for (const r of routes) {
      const file = r.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, r.path.slice(1), 'index.html');
      const html = fs.readFileSync(file, 'utf8');

      const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
      const bad = [...new Set(hrefs.filter((h) => routePaths.has(h)))];
      if (bad.length) linkProblems.push(`${r.path}: ${bad.join(', ')}`);
    }

    if (linkProblems.length) {
      throw new Error(`Internal links pointing at redirecting URLs:\n  - ${linkProblems.join('\n  - ')}`);
    }
    console.log(`✅ Internal links verified on all ${routes.length} pages`);

    console.log('🎉 Static build completed successfully!');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildStatic();
