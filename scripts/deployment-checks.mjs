import fs from 'node:fs';
import path from 'node:path';

export const PRIVATE_ROUTES = ['/admin/auth', '/admin/dashboard', '/admin/analytics', '/.lovable/oauth/consent'];

// Use the original Vite shell, never a rendered homepage with visitor content.
export function writePrivatePages(distDir, appShell) {
  const shell = appShell
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*name="robots"[^>]*>/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>Sign in | NeuroIndex</title>')
    .replace(/<head>/i, '<head><meta name="robots" content="noindex, nofollow">');
  for (const route of PRIVATE_ROUTES) {
    const dir = path.join(distDir, route.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), shell);
  }
}

export function verifyDeployment(distDir, routes) {
  const problems = [];
  for (const route of [...routes.map(r => r.path), ...PRIVATE_ROUTES]) {
    const file = path.join(distDir, route.slice(1), 'index.html');
    if (!fs.existsSync(file)) {
      problems.push(`${route}: direct-link page is missing`);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    // Local listing photos must exist in the actual Pages artifact, not only preview.
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="(\/spaces\/[^"?#]+)(?:[?#][^"]*)?"/gi)) {
      const image = path.resolve(distDir, `.${decodeURIComponent(match[1])}`);
      if (!image.startsWith(`${path.resolve(distDir)}${path.sep}`) || !fs.existsSync(image) || fs.statSync(image).size === 0) {
        problems.push(`${route}: missing listing photo ${match[1]}`);
      }
    }
    if (PRIVATE_ROUTES.includes(route) && !/<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/i.test(html)) {
      problems.push(`${route}: private page must be noindex`);
    }
  }
  if (problems.length) throw new Error(`Deployment checks failed:\n${problems.join('\n')}`);
}