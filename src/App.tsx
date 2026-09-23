
import React from "react";
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
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SensorySelfAssessment from "./pages/SensorySelfAssessment";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SubmitSpace from "./pages/SubmitSpace";
import PillarPage from "./pages/PillarPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => {
  // Every public route is a real pre-rendered file, so no SPA redirect shim is
  // needed — the 404 page now stays put instead of bouncing to the homepage.



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
                <Route path="/submit-space" element={<SubmitSpace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/neurodiversity-in-the-workplace" element={<PillarPage />} />
                <Route path="/neuroinclusion-for-employers" element={<PillarPage />} />
                <Route path="/for/hr-teams" element={<PillarPage />} />
                <Route path="/for/managers" element={<PillarPage />} />
                <Route path="/for/neurodivergent-professionals" element={<PillarPage />} />
                <Route path="/quiet-workspaces/london" element={<PillarPage />} />
                <Route path="/tools/sensory-self-assessment" element={<SensorySelfAssessment />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/admin/auth" element={<AdminAuth />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
