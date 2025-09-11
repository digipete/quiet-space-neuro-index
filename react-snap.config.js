module.exports = {
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
  
  // Output directory
  destination: "dist",
  
  // Wait for network to be idle before capturing
  waitFor: 1000,
  
  // Enable crawling for additional routes
  crawl: true,
  
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
  
  // Preload resources
  preloadResources: true,
  
  // Skip third party scripts during prerendering  
  skipThirdPartyRequests: true
};
