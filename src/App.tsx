
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import SpaceDetail from "./pages/SpaceDetail";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import WorkspaceProviders from "./pages/WorkspaceProviders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Handle GitHub Pages SPA routing
  const search = window.location.search;
  if (search) {
    const query = new URLSearchParams(search);
    const redirect = query.get('redirect');
    if (redirect) {
      const decodedPath = decodeURIComponent(redirect);
      window.history.replaceState(null, '', decodedPath);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/spaces" element={<Index />} />
                <Route path="/space/:id" element={<SpaceDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/workspace-providers" element={<WorkspaceProviders />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
