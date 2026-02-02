import React from 'react';
import { Users, Plane, Heart } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Users, label: 'Compañerismo', color: 'text-sky' },
    { icon: Plane, label: 'Deporte', color: 'text-sky' },
    { icon: Heart, label: 'Pasión', color: 'text-sky' },
  ];

  return (
    <section id="asociacion" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Sobre Nosotros
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Vórtices de la Mancha es una asociación sin ánimo de lucro dedicada a la promoción 
              y divulgación de la aviación deportiva y recreativa. Con sede en el Aeródromo de Ocaña, 
              Toledo, llevamos más de dos décadas fomentando la pasión por el vuelo.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ofrecemos un espacio único donde pilotos, aficionados y entusiastas de la aeronáutica 
              pueden compartir experiencias, aprender y disfrutar del cielo manchego. Desde vuelos 
              de bautismo hasta formación especializada, nuestra misión es acercar la aviación a todos.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-3 gap-4">
              {values.map(({ icon: Icon, label, color }) => (
                <div key={label} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-sky-10 rounded-full flex items-center justify-center mb-3 transition-transform hover:scale-110">
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1583536542991-dc965a1db950?w=800&q=80"
                alt="Aeródromo de Ocaña"
                className="rounded-2xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -left-6 bg-sky text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm font-medium opacity-90">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
