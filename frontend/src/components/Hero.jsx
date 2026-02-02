import React from 'react';
import { Camera, Newspaper, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&q=80')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-70 via-navy-50 to-navy-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in">
          Pasión por el vuelo
          <br />
          <span className="text-sky">en el corazón de La Mancha</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Asociación Aeronáutica de Ocaña. Divulgación, deporte y compañerismo en el aire.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={() => scrollToSection('#galeria')}
            className="bg-white text-navy px-8 py-6 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Ver Galería
          </Button>
          
          <Button
            onClick={() => scrollToSection('#noticias')}
            className="bg-sky text-white px-8 py-6 rounded-full font-semibold shadow-xl hover:bg-sky-hover hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2"
          >
            <Newspaper className="w-5 h-5" />
            Nuestras Noticias
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <button
          onClick={() => scrollToSection('#asociacion')}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
