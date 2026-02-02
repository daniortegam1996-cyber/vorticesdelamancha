import React from 'react';
import { LegalLayout, DATOS } from './LegalLayout';

function PoliticaCookies(props) {
  return (
    <LegalLayout title="Política de Cookies" onBack={props.onBack}>
      <div className="prose prose-lg max-w-none text-gray-700">
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">1. Qué son las Cookies</h2>
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tablet, teléfono móvil) cuando los visita. Estas cookies permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">2. Quién utiliza las Cookies</h2>
          <p>El responsable del uso de cookies en este sitio web es:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Titular:</strong> {DATOS.nombreCompleto}</li>
            <li><strong>CIF:</strong> {DATOS.cif}</li>
            <li><strong>Dirección:</strong> {DATOS.direccion}, {DATOS.codigoPostal} {DATOS.ciudad}</li>
            <li><strong>Email:</strong> {DATOS.email}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">3. Tipos de Cookies que Utilizamos</h2>
          <p>Este sitio web utiliza únicamente <strong>cookies técnicas o necesarias</strong>, que son esenciales para el funcionamiento básico del sitio web:</p>
          
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalidad</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">vortices_cookies_accepted</td>
                  <td className="border border-gray-300 px-4 py-2">Técnica</td>
                  <td className="border border-gray-300 px-4 py-2">Almacena la aceptación del banner de cookies</td>
                  <td className="border border-gray-300 px-4 py-2">1 año</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6"><strong>Este sitio web NO utiliza:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Cookies de análisis o estadísticas</li>
            <li>Cookies publicitarias o de seguimiento</li>
            <li>Cookies de redes sociales</li>
            <li>Cookies de terceros con fines comerciales</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">4. Base Legal</h2>
          <p>De acuerdo con el artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), las cookies técnicas o necesarias están exentas del requisito de consentimiento previo, ya que son estrictamente necesarias para el funcionamiento del sitio web.</p>
          <p className="mt-4">No obstante, en cumplimiento de nuestra política de transparencia, le informamos de su uso mediante este aviso.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">5. Cómo Gestionar las Cookies</h2>
          <p>Puede configurar su navegador para bloquear o alertar sobre el uso de cookies. Sin embargo, tenga en cuenta que si bloquea todas las cookies, es posible que algunas partes del sitio web no funcionen correctamente.</p>
          
          <p className="mt-4">Instrucciones para gestionar cookies en los principales navegadores:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0074D9] hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[#0074D9] hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0074D9] hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#0074D9] hover:underline">Microsoft Edge</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#001f3f] mb-4">6. Actualizaciones de esta Política</h2>
          <p>{DATOS.nombre} puede modificar esta Política de Cookies en función de cambios legislativos, regulatorios o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.</p>
          <p className="mt-4">Cualquier modificación sustancial será comunicada a los usuarios a través de este sitio web.</p>
        </section>

        <section className="mt-12 p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Contacto:</strong> Para cualquier consulta sobre nuestra Política de Cookies, puede contactarnos en{' '}
            <a href={'mailto:' + DATOS.email} className="text-[#0074D9] hover:underline">{DATOS.email}</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}

export default PoliticaCookies;
