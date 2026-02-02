import React, { useState } from 'react';
import Lightbox from './Lightbox';

const galleryData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    alt: 'Avión en vuelo sobre nubes',
    category: 'Vuelo',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    alt: 'Aeródromo al atardecer',
    category: 'Aeródromo',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80',
    alt: 'Formación de aviones',
    category: 'Eventos',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80',
    alt: 'Cessna en pista',
    category: 'Aeronaves',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    alt: 'Cabina de pilotaje',
    category: 'Aeronaves',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1583536542991-dc965a1db950?w=800&q=80',
    alt: 'Vista aérea del aeródromo',
    category: 'Aeródromo',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    alt: 'Piloto preparando vuelo',
    category: 'Socios',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    alt: 'Evento de la asociación',
    category: 'Eventos',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
    alt: 'Avión histórico',
    category: 'Aeronaves',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80',
    alt: 'Amanecer en el aeródromo',
    category: 'Aeródromo',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&q=80',
    alt: 'Paracaidismo',
    category: 'Vuelo',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=800&q=80',
    alt: 'Grupo de socios',
    category: 'Socios',
  },
];

const categories = ['Todas', 'Vuelo', 'Aeronaves', 'Aeródromo', 'Eventos', 'Socios'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeCategory === 'Todas' 
    ? galleryData 
    : galleryData.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Galería de Fotos
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explora momentos inolvidables capturados en nuestro aeródromo y eventos
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${activeCategory === category
                  ? 'bg-sky text-white border-sky shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-sky hover:text-sky'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
          onNext={() => setCurrentIndex((prev) => (prev + 1) % filteredImages.length)}
        />
      )}
    </section>
  );
};

export default Gallery;
