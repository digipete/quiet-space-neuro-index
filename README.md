# Quiet Space Club 🏢

> A curated directory of quiet workspaces for remote workers and digital nomads

**Live Site**: [https://quietspace.club](https://quietspace.club)

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ (recommended to install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **TypeScript** | Type safety and developer experience |
| **Vite** | Build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Component library |
| **Supabase** | Backend as a Service (database, auth) |
| **React Router** | Client-side routing |
| **React Query** | Server state management |
| **Lucide React** | Icon library |

## 📦 Key Dependencies

### Core Framework
- `react` ^18.3.1 - UI library
- `react-dom` ^18.3.1 - DOM rendering
- `react-router-dom` ^6.26.2 - Routing
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - CSS framework
- `tailwindcss-animate` ^1.0.7 - Animations
- `lucide-react` ^0.462.0 - Icons
- `class-variance-authority` ^0.7.1 - Component variants
- `clsx` ^2.1.1 & `tailwind-merge` ^2.5.2 - Conditional classes

### Radix UI Components
- `@radix-ui/react-*` - Accessible UI primitives (accordion, dialog, dropdown, etc.)

### Backend & Data
- `@supabase/supabase-js` ^2.52.1 - Supabase client
- `@tanstack/react-query` ^5.56.2 - Server state management

### Forms & Validation
- `react-hook-form` ^7.53.0 - Form handling
- `@hookform/resolvers` ^3.9.0 - Form validation
- `zod` ^3.23.8 - Schema validation

### Enhanced Features
- `sonner` ^1.5.0 - Toast notifications
- `cmdk` ^1.0.0 - Command palette
- `embla-carousel-react` ^8.3.0 - Carousels
- `recharts` ^2.12.7 - Charts and data visualization

## 🔧 Troubleshooting

### Blank Site After Deployment

**Problem**: Site shows blank page or 404s after GitHub Pages deployment

**Common Causes & Solutions**:

1. **SPA Routing Issues**
   - GitHub Pages doesn't natively support client-side routing
   - **Solution**: Ensure `index.html` includes the SPA redirect script
   - Check that `public/404.html` has proper redirect logic

2. **Build Path Issues**
   - Incorrect base path in Vite config
   - **Solution**: Verify `vite.config.ts` has correct `base` setting

3. **Missing Assets**
   - Build artifacts not properly generated
   - **Solution**: Check GitHub Actions logs for build errors
   - Ensure `dist/` directory contains all necessary files

4. **CNAME File Issues**
   - Custom domain configuration conflicts
   - **Solution**: Verify CNAME file is copied to dist during build

### Development Issues

**Hot Reload Not Working**
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

**Type Errors After Supabase Changes**
```bash
# Regenerate Supabase types
supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

**Build Failures**
- Check for TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure environment variables are properly configured

## 📈 Deployment Timeline

### Major Releases

**v3.0 - Database Migration (Jan 2025)**
- Migrated from static JSON data to Supabase database
- Added dynamic content management
- Implemented proper data relationships

**v2.0 - Enhanced Search & Filtering (Dec 2024)**
- Advanced search functionality
- Location-based filtering
- Amenity filtering system
- Improved mobile responsiveness

**v1.5 - Content Management (Nov 2024)**
- Added About, How It Works, and Resources pages
- Contact form integration
- Workspace providers directory

**v1.0 - Initial Launch (Oct 2024)**
- Core listing functionality
- Basic search and filter
- Responsive design implementation
- Static workspace data

## 🔄 Development Workflow

### Editing Options

1. **Lovable Editor** (Recommended for quick changes)
   - Real-time preview
   - AI-assisted development
   - Auto-sync with GitHub

2. **Local IDE**
   - Full development environment
   - Advanced debugging tools
   - Git workflow integration

3. **GitHub Codespaces**
   - Browser-based development
   - Pre-configured environment
   - Good for quick fixes

4. **Direct GitHub Editing**
   - Simple text changes
   - Documentation updates
   - Small bug fixes

### Deployment

- **Automatic**: Every push to `main` branch triggers GitHub Actions
- **Manual**: Use GitHub Actions "Run workflow" button
- **Preview**: Lovable provides staging environment for testing

## 📞 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Issues**: Use GitHub Issues for bug reports and feature requests
