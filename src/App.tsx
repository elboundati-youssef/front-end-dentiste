import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// --- PAGES PUBLIQUES (Site Vitrine) ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import ServiceDetails from "./pages/ServiceDetails";
import AllBlogs from "./pages/AllBlogs";

// --- PAGES ADMINISTRATION (Back-Office) ---
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PostsList from "./pages/admin/PostsList"; // Liste des articles
import CreatePost from "./pages/admin/CreatePost"; // Formulaire de création

// --- LAYOUTS ---
import AdminLayout from "./layouts/AdminLayout"; // Sidebar & Sécurité
import EditPost from "./pages/admin/EditPost";
import AppointmentsList from "./pages/admin/AppointmentsList";
import AppointmentDetails from "./pages/admin/AppointmentDetails";
import SubscribersList from "./pages/admin/SubscribersList";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Terms from "./pages/legal/Terms";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Gestionnaires de notifications */}
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* =========================================
                1. ZONE PUBLIQUE (Accessible à tous)
               ========================================= */}
            <Route path="/" element={<Index />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog" element={<AllBlogs />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
<Route path="/conditions-generales" element={<Terms />} />
<Route path="/cookies" element={<CookiePolicy />} />

            {/* =========================================
                2. ZONE ADMINISTRATION (Sécurisée)
               ========================================= */}

            {/* Login : Page isolée (pas de sidebar, pas de layout) */}
            <Route path="/admin/login" element={<Login />} />

            {/* Espace Admin : Protégé par AdminLayout (Sidebar + Vérification Token) */}
            <Route path="/admin" element={<AdminLayout />}>
              {/* Dashboard (Vue par défaut quand on va sur /admin) */}
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rendez-vous" element={<AppointmentsList />} />
              <Route path="rendez-vous/:id" element={<AppointmentDetails />} />
              {/* Gestion des Blogs */}
              <Route path="blogs" element={<PostsList />} /> {/* Liste */}
              <Route path="blogs/create" element={<CreatePost />} />{" "}
              {/* Création */}
              <Route path="blogs/edit/:id" element={<EditPost />} />
              <Route path="newsletter" element={<SubscribersList />} />
            </Route>

            {/* =========================================
                3. GESTION DES ERREURS
               ========================================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
