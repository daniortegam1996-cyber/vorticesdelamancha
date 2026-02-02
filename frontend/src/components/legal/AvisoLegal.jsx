import React from 'react';
import { LegalLayout, DATOS } from './LegalLayout';

function AvisoLegal(props) {
  return (
    <LegalLayout title="Aviso Legal" onBack={props.onBack}>
      <div className="prose prose-lg max-w-none text-gray-700">
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">1. Datos Identificativos</h2>
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos del titular de este sitio web:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Titular:</strong> {DATOS.nombreCompleto}</li>
            <li><strong>CIF:</strong> {DATOS.cif}</li>
            <li><strong>Domicilio:</strong> {DATOS.direccion}, {DATOS.codigoPostal} {DATOS.ciudad} ({DATOS.provincia}), {DATOS.pais}</li>
            <li><strong>Email:</strong> {DATOS.email}</li>
            <li><strong>Teléfono:</strong> {DATOS.telefono}</li>
            <li><strong>Inscripción Registro de Asociaciones:</strong> {DATOS.registroAsociaciones}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">2. Objeto</h2>
          <p>{DATOS.nombreCompleto} es una asociación sin ánimo de lucro dedicada a la promoción y divulgación de la aviación deportiva y recreativa. Este sitio web tiene como finalidad proporcionar información sobre las actividades, servicios y eventos de la asociación.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">3. Propiedad Intelectual e Industrial</h2>
          <p>Los contenidos de este sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales, así como su diseño gráfico y códigos fuente, son propiedad intelectual de {DATOS.nombre} o de terceros que han autorizado su uso.</p>
          <p className="mt-4">Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos de este sitio web sin la autorización expresa de {DATOS.nombre}.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">4. Condiciones de Uso</h2>
          <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que {DATOS.nombre} ofrece a través de su sitio web y a no emplearlos para:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
            <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
            <li>Provocar daños en los sistemas físicos y lógicos de {DATOS.nombre}, de sus proveedores o de terceras personas.</li>
            <li>Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
          <p>{DATOS.nombre} no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Errores u omisiones en los contenidos.</li>
            <li>Falta de disponibilidad del portal.</li>
            <li>Transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">6. Modificaciones</h2>
          <p>{DATOS.nombre} se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">7. Enlaces</h2>
          <p>En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, {DATOS.nombre} no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso {DATOS.nombre} asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">8. Legislación Aplicable y Jurisdicción</h2>
          <p>La relación entre {DATOS.nombre} y el Usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de {DATOS.ciudad}, salvo que la Ley aplicable disponga otra cosa.</p>
        </section>

        <section className="mt-12 p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Contacto:</strong> Para cualquier consulta relacionada con este Aviso Legal, puede contactar con nosotros en{' '}
            <a href={'mailto:' + DATOS.email} className="text-[#0074D9] hover:underline">{DATOS.email}</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}

export default AvisoLegal;
