import React, { useState } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import NewsModal from './NewsModal';

const newsData = [
  {
    id: 1,
    title: 'Jornada de Puertas Abiertas 2024',
    excerpt: 'Este fin de semana celebramos nuestra tradicional jornada de puertas abiertas con exhibiciones aéreas y vuelos de bautismo.',
    content: `El pasado fin de semana, el Aeródromo de Ocaña se convirtió en el epicentro de la aviación deportiva de la región con nuestra tradicional Jornada de Puertas Abiertas.

    Más de 500 visitantes disfrutaron de exhibiciones aéreas, vuelos de bautismo y la oportunidad de conocer de cerca las aeronaves de nuestra flota. Los más pequeños pudieron participar en talleres de aeromodelismo y simuladores de vuelo.

    La jornada contó con la presencia de pilotos experimentados que compartieron sus experiencias y respondieron a las preguntas de los asistentes. También se realizaron demostraciones de paracaidismo y vuelo acrobático.

    Agradecemos a todos los voluntarios que hicieron posible este evento y a los visitantes por su entusiasmo. ¡Nos vemos el próximo año!`,
    category: 'Eventos',
    date: '15 Febrero 2024',
    author: 'Equipo Vórtices',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=80',
  },
  {
    id: 2,
    title: 'Nuevo Curso de Piloto Privado',
    excerpt: 'Abrimos inscripciones para el curso de piloto privado PPL. Plazas limitadas para la próxima promoción.',
    content: `Estamos encantados de anunciar la apertura de inscripciones para nuestro nuevo curso de Piloto Privado (PPL) que comenzará en marzo de 2024.

    El programa incluye:
    - 45 horas de vuelo práctico
    - 100 horas de formación teórica
    - Acceso a simuladores de última generación
    - Material didáctico incluido
    - Exámenes oficiales

    Las clases teóricas se impartirán en nuestras instalaciones del aeródromo, mientras que las prácticas se realizarán con nuestra flota de aviones Cessna 172.

    Los instructores cuentan con más de 5000 horas de experiencia y certificación FI. Las plazas son limitadas a 12 alumnos por promoción para garantizar una formación personalizada.

    Para más información, contacta con nuestra secretaría o visítanos en el aeródromo.`,
    category: 'Formación',
    date: '10 Febrero 2024',
    author: 'Escuela de Vuelo',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    id: 3,
    title: 'Campeonato Regional de Vuelo',
    excerpt: 'Nuestros pilotos obtienen excelentes resultados en el Campeonato Regional de Vuelo Deportivo celebrado en Cuatro Vientos.',
    content: `El equipo de Vórtices de la Mancha ha conseguido brillantes resultados en el Campeonato Regional de Vuelo Deportivo celebrado este fin de semana en el aeródromo de Cuatro Vientos.

    Resultados destacados:
    - 1º puesto en categoría Navegación Clásica: Pedro Martínez
    - 2º puesto en Precisión de Aterrizaje: Ana García
    - 3º puesto en Rally Aéreo: Equipo Vórtices

    La competición reunió a más de 40 pilotos de toda la región, con pruebas de navegación, precisión y habilidad que pusieron a prueba las capacidades de nuestros aviadores.

    Queremos agradecer a todos los participantes su dedicación y esfuerzo en la preparación, así como a los patrocinadores que hacen posible nuestra participación en estas competiciones.

    ¡Felicidades a todos los campeones!`,
    category: 'Competición',
    date: '5 Febrero 2024',
    author: 'Dirección Deportiva',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80',
  },
  {
    id: 4,
    title: 'Renovación de la Flota',
    excerpt: 'Incorporamos dos nuevas aeronaves Cessna 172 Skyhawk a nuestra flota para mejorar la experiencia de nuestros socios.',
    content: `Nos complace anunciar la incorporación de dos nuevas aeronaves Cessna 172 Skyhawk a nuestra flota, una inversión significativa que mejorará sustancialmente la experiencia de vuelo de nuestros socios.

    Características de las nuevas aeronaves:
    - Motor Lycoming de 180 HP
    - Aviónica Garmin G1000 NXi
    - Sistema de navegación GPS integrado
    - Piloto automático de dos ejes
    - Interior renovado con asientos de cuero

    Estas aeronaves, matriculadas EC-NAV y EC-VDM, ya están disponibles para reserva a través de nuestra plataforma online. Los socios pueden disfrutar de tarifas preferenciales durante el primer mes.

    Las nuevas incorporaciones complementan nuestra flota existente y nos permiten ofrecer más disponibilidad y mejores condiciones para la formación y el vuelo recreativo.`,
    category: 'Noticias',
    date: '28 Enero 2024',
    author: 'Junta Directiva',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80',
  },
  {
    id: 5,
    title: 'Conferencia: Historia de la Aviación',
    excerpt: 'El historiador José Luis García impartirá una conferencia sobre los pioneros de la aviación española.',
    content: `El próximo viernes 23 de febrero, el reconocido historiador José Luis García ofrecerá una conferencia gratuita sobre "Los Pioneros de la Aviación Española" en nuestra sede social.

    La charla repasará los momentos más significativos de la historia de la aviación en España, desde los primeros vuelos de Juan Olivert en 1910 hasta la edad de oro de los años 30.

    Temas que se abordarán:
    - Los primeros aeroplanos en España
    - La hazaña del Plus Ultra
    - Las escuadrillas republicanas
    - La aviación civil en la posguerra

    La conferencia comenzará a las 19:00h y tendrá una duración aproximada de 90 minutos, seguida de un coloquio con el autor. El aforo es limitado, por lo que se recomienda confirmar asistencia.

    José Luis García es autor de varios libros sobre historia aeronáutica y colaborador habitual de la revista Avion Revue.`,
    category: 'Cultura',
    date: '20 Enero 2024',
    author: 'Actividades Culturales',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
  },
  {
    id: 6,
    title: 'Asamblea General de Socios',
    excerpt: 'Convocatoria para la Asamblea General Ordinaria donde se presentarán las cuentas del ejercicio y los proyectos 2024.',
    content: `Se convoca a todos los socios de Vórtices de la Mancha a la Asamblea General Ordinaria que tendrá lugar el día 2 de marzo de 2024 en primera convocatoria a las 10:00h y en segunda convocatoria a las 10:30h.

    Orden del día:
    1. Lectura y aprobación del acta anterior
    2. Presentación y aprobación de las cuentas 2023
    3. Presentación del presupuesto 2024
    4. Proyectos y actividades para el nuevo ejercicio
    5. Elección de vocales
    6. Ruegos y preguntas

    La documentación estará disponible en secretaría con 15 días de antelación para su consulta por los socios interesados.

    Se ruega puntualidad y se recuerda que para ejercer el derecho a voto es necesario estar al corriente de las cuotas.

    Al finalizar, se ofrecerá un aperitivo para todos los asistentes.`,
    category: 'Asociación',
    date: '15 Enero 2024',
    author: 'Secretaría',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
  },
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <section id="noticias" className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Últimas Noticias
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Mantente al día con las novedades de nuestra asociación, eventos y actividades
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-sky-10 text-sky px-3 py-1 rounded-full text-xs font-semibold">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {news.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-gray-500 mb-4 line-clamp-3 flex-1">
                  {news.excerpt}
                </p>

                <button
                  onClick={() => setSelectedNews(news)}
                  className="text-sky font-semibold hover:underline flex items-center gap-2 group/btn mt-auto"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
};

export default News;
