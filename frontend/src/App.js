import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import MembershipModal from "@/components/MembershipModal";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenMembership={() => setIsMembershipOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <News />
        <Gallery />
      </main>
      
      <Footer />
      
      <MembershipModal 
        isOpen={isMembershipOpen} 
        onClose={() => setIsMembershipOpen(false)} 
      />
      
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
