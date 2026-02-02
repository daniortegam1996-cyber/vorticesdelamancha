import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API_URL = `${BACKEND_URL}/api`;

const Footer = ({ onShowAvisoLegal, onShowPrivacidad, onShowCookies }) => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    if (!privacyAccepted) {
      toast.error('Debes aceptar la Política de Privacidad');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || '¡Mensaje enviado correctamente!');
        setFormData({ email: '', subject: '', message: '' });
        setPrivacyAccepted(false);
      } else {
        toast.error(data.detail || data.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#asociacion', label: 'La Asociación' },
    { href: '#noticias', label: 'Noticias' },
    { href: '#galeria', label: 'Galería' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-vortices.png"
                alt="Vórtices de la Mancha"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">VÓRTICES DE LA MANCHA</h3>
                <p className="text-gray-400 text-xs">Asociación Aeronáutica</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Promoviendo la aviación deportiva y recreativa desde el Aeródromo de Ocaña. 
              Compañerismo, deporte y pasión por el vuelo.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-300 hover:text-sky transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Aeródromo de Ocaña<br />
                  Ocaña, Toledo, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky flex-shrink-0" />
                <a href="tel:+34825850565" className="text-gray-300 hover:text-sky transition-colors text-sm">
                  +34 825 850 565
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky flex-shrink-0" />
                <a href="mailto:informacion@vorticesdelamancha.com" className="text-gray-300 hover:text-sky transition-colors text-sm">
                  informacion@vorticesdelamancha.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Escríbenos</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-sky focus:border-sky"
                required
              />
              <Input
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formData.subject}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-sky focus:border-sky"
                required
              />
              <Textarea
                name="message"
                placeholder="Tu mensaje"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-sky focus:border-sky resize-none"
                required
              />
              
              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="footer-privacy"
                  checked={privacyAccepted}
                  onCheckedChange={setPrivacyAccepted}
                  className="mt-1 border-white/30 data-[state=checked]:bg-sky data-[state=checked]:border-sky"
                />
                <label htmlFor="footer-privacy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                  Acepto la{' '}
                  <button
                    type="button"
                    onClick={onShowPrivacidad}
                    className="text-sky hover:underline"
                  >
                    Política de Privacidad
                  </button>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky text-white hover:bg-sky-hover transition-colors rounded-full font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-2">
                Responsable: Vórtices de la Mancha. Finalidad: Responder consultas. 
                Derechos: Acceso, rectificación, supresión y otros según nuestra{' '}
                <button type="button" onClick={onShowPrivacidad} className="text-sky hover:underline">
                  política de privacidad
                </button>.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Vórtices de la Mancha. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button 
                onClick={onShowAvisoLegal}
                className="text-gray-400 hover:text-sky transition-colors"
              >
                Aviso Legal
              </button>
              <button 
                onClick={onShowPrivacidad}
                className="text-gray-400 hover:text-sky transition-colors"
              >
                Política de Privacidad
              </button>
              <button 
                onClick={onShowCookies}
                className="text-gray-400 hover:text-sky transition-colors"
              >
                Política de Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
