import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildStatic() {
  try {
    console.log('🏗️  Building React app...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('📄 Generating static pages...');
    await import('./generate-static-pages.js');
    
    console.log('📁 Copying static assets...');
    const distDir = path.join(__dirname, '../dist');
    const publicDir = path.join(__dirname, '../public');
    
    // Copy additional static files
    const staticFiles = [
      'robots.txt',
      'sitemap.xml', 
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
    
    console.log('🎉 Static build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildStatic();