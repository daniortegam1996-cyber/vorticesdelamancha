import React, { useState } from 'react';
import { User, Mail, Phone, Plane, Check, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const plans = [
  {
    id: 'basic',
    name: 'Socio Basico',
    price: '50',
    period: '/ano',
    popular: false,
    features: ['Acceso a instalaciones', 'Descuentos en vuelos', 'Newsletter mensual', 'Eventos sociales'],
  },
  {
    id: 'pilot',
    name: 'Socio Piloto',
    price: '120',
    period: '/ano',
    popular: true,
    features: ['Todo del plan basico', 'Reserva de aeronaves', 'Descuento 15% combustible', 'Acceso a briefing rooms', 'Seguro incluido'],
  },
  {
    id: 'premium',
    name: 'Socio Premium',
    price: '200',
    period: '/ano',
    popular: false,
    features: ['Todo del plan piloto', 'Prioridad en reservas', 'Curso teorico gratuito', 'Parking reservado', 'Invitados gratis (2/mes)'],
  },
];

function MembershipModal(props) {
  const { isOpen, onClose } = props;
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');

  function handlePlanSelect(planId) {
    setSelectedPlan(planId);
    setStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }
    setIsSubmitting(true);
    await new Promise(function(resolve) { setTimeout(resolve, 2000); });
    toast.success('Solicitud enviada! Te contactaremos pronto.');
    setName('');
    setEmail('');
    setPhone('');
    setLicense('');
    setSelectedPlan(null);
    setStep(1);
    setIsSubmitting(false);
    onClose();
  }

  function handleBack() {
    setStep(1);
    setSelectedPlan(null);
  }

  function handleOpenChange(open) {
    if (!open) {
      setStep(1);
      setSelectedPlan(null);
      setName('');
      setEmail('');
      setPhone('');
      setLicense('');
    }
    onClose();
  }

  var selectedPlanData = plans.find(function(p) { return p.id === selectedPlan; });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-[#001f3f]">
            {step === 1 ? 'Hazte Socio' : 'Completa tu Inscripcion'}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {step === 1 ? 'Elige el plan que mejor se adapte a tus necesidades' : 'Has seleccionado: ' + (selectedPlanData ? selectedPlanData.name : '')}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {step === 1 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(function(plan) {
                return (
                  <div
                    key={plan.id}
                    className={'relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ' + (plan.popular ? 'border-[#0074D9] bg-[#0074D9]/5' : 'border-gray-200 hover:border-[#0074D9]/50')}
                    onClick={function() { handlePlanSelect(plan.id); }}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0074D9] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Mas Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-[#001f3f] mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[#001f3f]">{plan.price} EUR</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map(function(feature, index) {
                        return (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-[#0074D9] flex-shrink-0" />
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                    <Button className={'w-full rounded-full font-semibold ' + (plan.popular ? 'bg-[#0074D9] text-white hover:bg-[#0063c1]' : 'bg-[#001f3f] text-white hover:bg-[#001f3f]/90')}>
                      Seleccionar
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Nombre completo *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="name" value={name} onChange={function(e) { setName(e.target.value); }} placeholder="Tu nombre completo" className="pl-10 border-gray-300" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="email" type="email" value={email} onChange={function(e) { setEmail(e.target.value); }} placeholder="tu@email.com" className="pl-10 border-gray-300" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">Telefono *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="phone" type="tel" value={phone} onChange={function(e) { setPhone(e.target.value); }} placeholder="+34 600 000 000" className="pl-10 border-gray-300" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="license" className="text-sm font-medium text-gray-700 block">Numero de licencia (si aplica)</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="license" value={license} onChange={function(e) { setLicense(e.target.value); }} placeholder="Ej: PPL-12345" className="pl-10 border-gray-300" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={handleBack} variant="outline" className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Volver
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-[#0074D9] text-white hover:bg-[#0063c1] rounded-full font-semibold">
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
      </DialogContent>
    </Dialog>
  );
}

export default MembershipModal;
