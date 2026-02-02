import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { DATOS_ASOCIACION } from './datosAsociacion';

function LegalLayout({ title, children, onBack }) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#001f3f] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-white/70 mt-2">Última actualización: {DATOS_ASOCIACION.fechaActualizacion}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LegalLayout;
