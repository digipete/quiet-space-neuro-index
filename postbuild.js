import reactSnap from 'react-snap'

// Custom post-build script to run react-snap
async function postBuild() {
  try {
    console.log('Starting react-snap prerendering...')

    // Load config (ESM default export or CJS fallback)
    const configModule = await import('./react-snap.config.js')
    const config = configModule.default ?? configModule

    const { run } = reactSnap
    if (typeof run !== 'function') {
      throw new Error('react-snap.run is not available')
    }

    await run({
      ...config,
    })

    console.log('React-snap prerendering completed successfully!')
  } catch (error) {
    console.error('React-snap failed:', error?.stack || error)
    process.exit(1)
  }
}

postBuild()
