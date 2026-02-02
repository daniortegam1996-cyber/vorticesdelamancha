import React, { useEffect } from 'react';
import { X, Calendar, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const NewsModal = ({ news, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!news) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block bg-sky text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
              {news.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {news.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky" />
              {news.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-sky" />
              {news.author}
            </span>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {news.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="bg-sky text-white px-6 py-2 rounded-full font-semibold hover:bg-sky-hover transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
