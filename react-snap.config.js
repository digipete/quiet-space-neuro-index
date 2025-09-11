export default {
  // Basic configuration
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  
  // Routes to prerender (based on sitemap.xml)
  include: [
    "/",
    "/spaces", 
    "/workspace-providers",
    "/about",
    "/how-it-works", 
    "/resources",
    "/contact"
  ],
  
  // Output directory - must match Vite's output
  destination: "dist",
  source: "dist",
  
  // Wait for network to be idle before capturing
  waitFor: 2000,
  
  // Limit concurrent pages to reduce flakiness in CI
  concurrency: 2,
  
  // Disable crawling to avoid unexpected routes during CI
  crawl: false,
  
  // Remove inline styles to prevent FOUC
  removeStyleTags: false,
  
  // Keep original HTML structure
  removeScriptTags: false,
  
  // Viewport for mobile-first rendering
  viewport: {
    width: 375,
    height: 812
  },
  
  // User agent for crawling
  userAgent: "ReactSnap",
  
  // Additional options for better SEO
  cacheAjaxRequests: false,
  http2PushManifest: false,
  
  // Preload images during prerendering
  preloadImages: true,
  
  // Skip third party scripts during prerendering  
  skipThirdPartyRequests: true
};
