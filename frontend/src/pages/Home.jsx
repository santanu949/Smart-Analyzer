import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AnalysisSection from '../components/AnalysisSection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { ContactModal, LoginModal } from '../components/Modals';
import AdminDashboard from '../components/AdminDashboard';

const Home = () => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // If successfully logged in, render the secure dashboard instead of landing page
  if (isAdminView) {
    return <AdminDashboard onLogout={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-white" data-testid="home-page">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/80 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/80 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-200/60 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar onAdminClick={() => setAdminLoginOpen(true)} />
        <Hero />
        <AnalysisSection />
        <FeaturesSection />
        <CTASection onContactClick={() => setContactOpen(true)} />
        <Footer />
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />}
        {isAdminLoginOpen && <LoginModal isOpen={isAdminLoginOpen} onClose={() => setAdminLoginOpen(false)} onLoginSuccess={() => { setAdminLoginOpen(false); setIsAdminView(true); }} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;