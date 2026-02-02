import React, { useState, useEffect, useCallback } from 'react';
import { X, User, Mail, Phone, Plane, Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function MembershipModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');

  const resetForm = useCallback(() => {
    setStep(1);
    setSelectedPlan('');
    setName('');
    setEmail('');
    setPhone('');
    setLicense('');
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  function selectPlan(planId) {
    setSelectedPlan(planId);
    setStep(2);
  }

  function goBack() {
    setStep(1);
    setSelectedPlan('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    toast.success('Solicitud enviada! Te contactaremos pronto.');
    resetForm();
    setIsSubmitting(false);
    onClose();
  }

  function getPlanName() {
    if (selectedPlan === 'basic') return 'Socio Basico';
    if (selectedPlan === 'pilot') return 'Socio Piloto';
    if (selectedPlan === 'premium') return 'Socio Premium';
    return '';
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#001f3f]">
              {step === 1 ? 'Hazte Socio' : 'Completa tu Inscripcion'}
            </h2>
            <p className="text-gray-500 mt-1">
              {step === 1 ? 'Elige el plan que mejor se adapte a tus necesidades' : 'Has seleccionado: ' + getPlanName()}
            </p>
          </div>

          <div className="p-6">
            {step === 1 ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  onClick={() => selectPlan('basic')}
                  className="relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg border-gray-200 hover:border-[#0074D9]/50"
                >
                  <h3 className="text-lg font-bold text-[#001f3f] mb-2">Socio Basico</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#001f3f]">50 EUR</span>
                    <span className="text-gray-500">/ano</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Acceso a instalaciones
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Descuentos en vuelos
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Newsletter mensual
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Eventos sociales
                    </li>
                  </ul>
                  <Button className="w-full rounded-full font-semibold bg-[#001f3f] text-white hover:bg-[#001f3f]/90">
                    Seleccionar
                  </Button>
                </div>

                <div 
                  onClick={() => selectPlan('pilot')}
                  className="relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg border-[#0074D9] bg-[#0074D9]/5"
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0074D9] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Mas Popular
                  </span>
                  <h3 className="text-lg font-bold text-[#001f3f] mb-2">Socio Piloto</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#001f3f]">120 EUR</span>
                    <span className="text-gray-500">/ano</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Todo del plan basico
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Reserva de aeronaves
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Descuento 15% combustible
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Acceso a briefing rooms
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Seguro incluido
                    </li>
                  </ul>
                  <Button className="w-full rounded-full font-semibold bg-[#0074D9] text-white hover:bg-[#0063c1]">
                    Seleccionar
                  </Button>
                </div>

                <div 
                  onClick={() => selectPlan('premium')}
                  className="relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg border-gray-200 hover:border-[#0074D9]/50"
                >
                  <h3 className="text-lg font-bold text-[#001f3f] mb-2">Socio Premium</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#001f3f]">200 EUR</span>
                    <span className="text-gray-500">/ano</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Todo del plan piloto
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Prioridad en reservas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Curso teorico gratuito
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Parking reservado
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                      Invitados gratis (2/mes)
                    </li>
                  </ul>
                  <Button className="w-full rounded-full font-semibold bg-[#001f3f] text-white hover:bg-[#001f3f]/90">
                    Seleccionar
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Nombre completo *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Tu nombre completo" 
                      className="pl-10 border-gray-300" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="tu@email.com" 
                      className="pl-10 border-gray-300" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Telefono *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="+34 600 000 000" 
                      className="pl-10 border-gray-300" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Numero de licencia (opcional)</label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      value={license} 
                      onChange={(e) => setLicense(e.target.value)} 
                      placeholder="Ej: PPL-12345" 
                      className="pl-10 border-gray-300" 
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button" 
                    onClick={goBack} 
                    variant="outline" 
                    className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Volver
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex-1 bg-[#0074D9] text-white hover:bg-[#0063c1] rounded-full font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </span>
                    ) : 'Enviar Solicitud'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipModal;
