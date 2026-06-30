import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import { Toaster } from "./components/ui/sonner";

function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  // Handle Emergent OAuth callback synchronously during render
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }

  const openAuth = () => setAuthOpen(true);
  const goBook = () => navigate("/dashboard");

  return (
    <div className="App">
      <Navigation onOpenAuth={openAuth} />
      <Routes>
        <Route path="/" element={<Home onOpenAuth={openAuth} onBook={goBook} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home onOpenAuth={openAuth} onBook={goBook} />} />
      </Routes>
      <Footer />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => navigate("/dashboard")}
      />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
