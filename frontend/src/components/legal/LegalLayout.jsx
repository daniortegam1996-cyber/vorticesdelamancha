import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const DATOS = {
  nombre: "Vórtices de la Mancha",
  nombreCompleto: "Asociación Aeronáutica Vórtices de la Mancha",
  cif: "G00000000",
  direccion: "Aeródromo de Ocaña",
  codigoPostal: "45300",
  ciudad: "Ocaña",
  provincia: "Toledo",
  pais: "España",
  email: "informacion@vorticesdelamancha.com",
  telefono: "+34 825 850 565",
  registroAsociaciones: "Número de inscripción pendiente",
  responsablePrivacidad: "El/La Presidente/a de la Asociación",
  emailPrivacidad: "informacion@vorticesdelamancha.com",
  fechaActualizacion: "Febrero 2024",
  dominioWeb: "vorticesdelamancha.com"
};

export function LegalLayout(props) {
  const { title, children, onBack } = props;
  
  function handleBack() {
    if (onBack) {
      onBack();
    }
  }

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
          <p className="text-white/70 mt-2">Última actualización: {DATOS.fechaActualizacion}</p>
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
