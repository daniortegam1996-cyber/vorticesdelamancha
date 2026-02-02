import React from 'react';
import { LegalLayout, DATOS } from './LegalLayout';

function PoliticaPrivacidad(props) {
  return (
    <LegalLayout title="Política de Privacidad" onBack={props.onBack}>
      <div className="prose prose-lg max-w-none text-gray-700">
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">1. Responsable del Tratamiento</h2>
          <p>De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos que los datos personales que nos facilite serán tratados por:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Responsable:</strong> {DATOS.nombreCompleto}</li>
            <li><strong>CIF:</strong> {DATOS.cif}</li>
            <li><strong>Dirección:</strong> {DATOS.direccion}, {DATOS.codigoPostal} {DATOS.ciudad} ({DATOS.provincia})</li>
            <li><strong>Email de contacto:</strong> {DATOS.emailPrivacidad}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">2. Finalidad del Tratamiento</h2>
          <p>Los datos personales que nos proporcione serán tratados con las siguientes finalidades:</p>
          
          <h3 className="text-xl font-semibold text-[#001f3f] mt-6 mb-3">Formulario de Contacto:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gestionar y responder a las consultas, solicitudes o peticiones recibidas.</li>
            <li>Mantener el contacto y crear una red de comunicación con los interesados.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-[#001f3f] mt-6 mb-3">Formulario de Inscripción de Socios:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gestionar la solicitud de alta como socio de la asociación.</li>
            <li>Tramitar la inscripción y mantener actualizado el registro de socios.</li>
            <li>Comunicar información relevante sobre actividades, eventos y servicios de la asociación.</li>
            <li>Gestión administrativa de la relación asociativa.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">3. Base Legal del Tratamiento</h2>
          <p>La base legal para el tratamiento de sus datos es:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Consentimiento del interesado</strong> (Art. 6.1.a RGPD): Al enviar cualquier formulario de este sitio web, usted consiente expresamente el tratamiento de sus datos para las finalidades indicadas.</li>
            <li><strong>Ejecución de un contrato o relación precontractual</strong> (Art. 6.1.b RGPD): En el caso de solicitudes de inscripción como socio.</li>
            <li><strong>Interés legítimo</strong> (Art. 6.1.f RGPD): Para mantener la relación con socios y responder a consultas.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">4. Datos Recopilados</h2>
          <p>Los datos personales que podemos recopilar incluyen:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Número de licencia de piloto (en caso de que aplique)</li>
            <li>Cualquier otra información que decida proporcionarnos voluntariamente</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">5. Plazo de Conservación</h2>
          <p>Los datos personales serán conservados:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Consultas de contacto:</strong> Durante el tiempo necesario para atender su solicitud y, posteriormente, durante los plazos legalmente establecidos para atender posibles responsabilidades.</li>
            <li><strong>Datos de socios:</strong> Mientras se mantenga la relación asociativa y, posteriormente, durante los plazos legales de conservación documental.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">6. Destinatarios de los Datos</h2>
          <p>Sus datos personales no serán cedidos a terceros, salvo:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Obligación legal de comunicación a organismos públicos.</li>
            <li>Proveedores de servicios necesarios para el funcionamiento de la asociación (hosting, correo electrónico), quienes actuarán como encargados del tratamiento con las debidas garantías.</li>
          </ul>
          <p className="mt-4">No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">7. Derechos del Interesado</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Acceso:</strong> Conocer si estamos tratando sus datos y acceder a ellos.</li>
            <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos.</li>
            <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos.</li>
            <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y de uso común.</li>
            <li><strong>Retirar el consentimiento:</strong> En cualquier momento, sin que afecte a la licitud del tratamiento previo.</li>
          </ul>
          <p className="mt-4">Para ejercer estos derechos, puede enviar una solicitud a{' '}
            <a href={'mailto:' + DATOS.emailPrivacidad} className="text-[#0074D9] hover:underline">{DATOS.emailPrivacidad}</a>
            {' '}adjuntando copia de su DNI o documento identificativo.</p>
          <p className="mt-4">Asimismo, tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#0074D9] hover:underline">www.aepd.es</a>
            ) si considera que sus derechos no han sido debidamente atendidos.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">8. Medidas de Seguridad</h2>
          <p>{DATOS.nombre} ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">9. Modificaciones de la Política de Privacidad</h2>
          <p>{DATOS.nombre} se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales. En dichos supuestos, se anunciarán los cambios introducidos con razonable antelación a su puesta en práctica.</p>
        </section>

        <section className="mt-12 p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Contacto para cuestiones de privacidad:</strong><br />
            {DATOS.responsablePrivacidad}<br />
            Email: <a href={'mailto:' + DATOS.emailPrivacidad} className="text-[#0074D9] hover:underline">{DATOS.emailPrivacidad}</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}

export default PoliticaPrivacidad;
