const { run } = require('react-snap');

// Custom post-build script to run react-snap
async function postBuild() {
  try {
    console.log('Starting react-snap prerendering...');
    
    // Run react-snap with our configuration
    await run({
      // Load config from react-snap.config.js
      ...require('./react-snap.config.js')
    });
    
    console.log('React-snap prerendering completed successfully!');
  } catch (error) {
    console.error('React-snap failed:', error);
    process.exit(1);
  }
}

postBuild();