import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { prerender } from 'vite-plugin-prerender';

// Prerender configuration for SEO
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/spaces', 
        '/workspace-providers',
        '/about',
        '/how-it-works', 
        '/resources',
        '/contact'
      ],
      postProcess(renderedRoute) {
        // Clean up the HTML and add proper meta tags
        renderedRoute.html = renderedRoute.html
          .replace(/<title>.*?<\/title>/, `<title>${getPageTitle(renderedRoute.route)}</title>`)
          .replace(/<meta name="description".*?>/,
            `<meta name="description" content="${getPageDescription(renderedRoute.route)}">`);
        
        return renderedRoute;
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: 'public',
});

function getPageTitle(route: string): string {
  const titles: Record<string, string> = {
    '/': 'NeuroIndex - Find Neuro-Friendly Workspaces | Quiet Space Club',
    '/spaces': 'Browse Neuro-Friendly Workspaces | Quiet Space Club', 
    '/workspace-providers': 'List Your Workspace | Quiet Space Club',
    '/about': 'About NeuroIndex | Quiet Space Club',
    '/how-it-works': 'How NeuroIndex Works | Quiet Space Club',
    '/resources': 'Resources for Neurodivergent Professionals | Quiet Space Club',
    '/contact': 'Contact Us | Quiet Space Club'
  };
  return titles[route] || 'Quiet Space Club';
}

function getPageDescription(route: string): string {
  const descriptions: Record<string, string> = {
    '/': 'Find neuro-friendly workspaces designed for neurodivergent individuals. Search ADHD-friendly, autism-friendly, and sensory-friendly coworking spaces.',
    '/spaces': 'Browse our curated collection of neuro-friendly workspaces with amenities like quiet zones, flexible lighting, and sensory accommodations.',
    '/workspace-providers': 'List your neuro-friendly workspace on NeuroIndex. Help neurodivergent professionals find inclusive coworking spaces.',
    '/about': 'Learn about NeuroIndex and our mission to connect neurodivergent individuals with inclusive, accessible workspaces.',
    '/how-it-works': 'Discover how NeuroIndex helps you find the perfect neuro-friendly workspace with our simple search and filtering system.',
    '/resources': 'Resources and guides for neurodivergent professionals, including workspace tips and accommodation information.',
    '/contact': 'Get in touch with the NeuroIndex team. We\'re here to help you find or list neuro-friendly workspaces.'
  };
  return descriptions[route] || 'Quiet Space Club - Neuro-friendly workspaces for neurodivergent individuals';
}