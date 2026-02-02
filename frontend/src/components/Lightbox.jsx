import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Image Container */}
      <div className="max-w-5xl max-h-[80vh] px-16">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        
        {/* Caption */}
        <div className="text-center mt-4">
          <p className="text-white font-medium">{currentImage.alt}</p>
          <p className="text-gray-400 text-sm mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default Lightbox;
