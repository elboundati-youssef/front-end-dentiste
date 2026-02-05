import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from 'react-helmet-async';
import BlogPost from "./pages/BlogPost";

// 1. IMPORTEZ LA NOUVELLE PAGE ICI
// Assurez-vous d'avoir bien créé le fichier dans src/pages/ServiceDetails.tsx
import ServiceDetails from "./pages/ServiceDetails"; 

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* 2. AJOUTEZ CETTE ROUTE POUR LES SERVICES */}
            {/* Le ":id" permet de récupérer quel service a été cliqué (ex: "blanchiment") */}
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;