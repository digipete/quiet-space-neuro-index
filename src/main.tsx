import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

// Always render fresh for proper SPA behavior on static pages
createRoot(rootElement).render(<App />)
