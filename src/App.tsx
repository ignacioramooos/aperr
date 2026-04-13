import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProgramPage from "./pages/ProgramPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";
import PartnersPage from "./pages/PartnersPage";
import BrokersPage from "./pages/BrokersPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<><Navbar /><main><Index /></main><Footer /></>} />
          <Route path="/nosotros" element={<><Navbar /><main><AboutPage /></main><Footer /></>} />
          <Route path="/programa" element={<><Navbar /><main><ProgramPage /></main><Footer /></>} />
          <Route path="/registro" element={<><Navbar /><main><RegisterPage /></main><Footer /></>} />
          <Route path="/contacto" element={<><Navbar /><main><ContactPage /></main><Footer /></>} />
          <Route path="/recursos" element={<><Navbar /><main><ResourcesPage /></main><Footer /></>} />
          <Route path="/partners" element={<><Navbar /><main><PartnersPage /></main><Footer /></>} />
          <Route path="/brokers" element={<><Navbar /><main><BrokersPage /></main><Footer /></>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/programa" element={<ProgramPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/brokers" element={<BrokersPage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
