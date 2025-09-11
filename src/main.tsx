import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root")!;

// Check if we're in a prerendered environment
if ((window as any).reactSnap) {
  // For react-snap, use hydrate instead of render
  const { hydrate } = require('react-dom');
  hydrate(<App />, rootElement);
} else {
  // Normal client-side rendering
  createRoot(rootElement).render(<App />);
}
