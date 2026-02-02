import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import MembershipModal from "@/components/MembershipModal";
import CookieBanner from "@/components/CookieBanner";
import AvisoLegal from "@/components/legal/AvisoLegal";
import PoliticaPrivacidad from "@/components/legal/PoliticaPrivacidad";
import PoliticaCookies from "@/components/legal/PoliticaCookies";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'aviso-legal', 'privacidad', 'cookies'

  // Handle showing legal pages
  const showPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setCurrentPage('home');
  };

  // Render legal pages
  if (currentPage === 'aviso-legal') {
    return (
      <>
        <AvisoLegal onBack={goHome} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (currentPage === 'privacidad') {
    return (
      <>
        <PoliticaPrivacidad onBack={goHome} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (currentPage === 'cookies') {
    return (
      <>
        <PoliticaCookies onBack={goHome} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Render main page
  return (
    <div className="min-h-screen bg-background">
      <Header onOpenMembership={() => setIsMembershipOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <News />
        <Gallery />
      </main>
      
      <Footer 
        onShowAvisoLegal={() => showPage('aviso-legal')}
        onShowPrivacidad={() => showPage('privacidad')}
        onShowCookies={() => showPage('cookies')}
      />
      
      <MembershipModal 
        isOpen={isMembershipOpen} 
        onClose={() => setIsMembershipOpen(false)}
        onShowPrivacidad={() => showPage('privacidad')}
      />
      
      <CookieBanner onShowCookiePolicy={() => showPage('cookies')} />
      
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
