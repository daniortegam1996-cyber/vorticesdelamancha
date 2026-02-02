import React, { useState } from 'react';
import { User, Mail, Phone, Plane, Check, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const membershipPlans = [
  {
    id: 'basic',
    name: 'Socio Básico',
    price: '50',
    period: '/año',
    features: [
      'Acceso a instalaciones',
      'Descuentos en vuelos',
      'Newsletter mensual',
      'Eventos sociales',
    ],
  },
  {
    id: 'pilot',
    name: 'Socio Piloto',
    price: '120',
    period: '/año',
    popular: true,
    features: [
      'Todo del plan básico',
      'Reserva de aeronaves',
      'Descuento 15% combustible',
      'Acceso a briefing rooms',
      'Seguro incluido',
    ],
  },
  {
    id: 'premium',
    name: 'Socio Premium',
    price: '200',
    period: '/año',
    features: [
      'Todo del plan piloto',
      'Prioridad en reservas',
      'Curso teórico gratuito',
      'Parking reservado',
      'Invitados gratis (2/mes)',
    ],
  },
];

const MembershipModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('¡Solicitud enviada! Te contactaremos pronto para completar tu inscripción.');
    setFormData({ name: '', email: '', phone: '', licenseNumber: '' });
    setSelectedPlan(null);
    setStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const handleBack = () => {
    setStep(1);
    setSelectedPlan(null);
  };

  const handleOpenChange = (open) => {
    if (!open) {
      setStep(1);
      setSelectedPlan(null);
      setFormData({ name: '', email: '', phone: '', licenseNumber: '' });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-navy">
            {step === 1 ? 'Hazte Socio' : 'Completa tu Inscripción'}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {step === 1 
              ? 'Elige el plan que mejor se adapte a tus necesidades'
              : `Has seleccionado: ${membershipPlans.find(p => p.id === selectedPlan)?.name}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {step === 1 ? (
            /* Plans Selection */
            <div className="grid md:grid-cols-3 gap-6">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    plan.popular 
                      ? 'border-sky bg-sky/5' 
                      : 'border-gray-200 hover:border-sky/50'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Más Popular
                    </span>
                  )}
                  
                  <h3 className="text-lg font-bold text-navy mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-navy">{plan.price}€</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-sky flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full rounded-full font-semibold ${
                      plan.popular
                        ? 'bg-sky text-white hover:bg-sky-hover'
                        : 'bg-navy text-white hover:bg-navy/90'
                    }`}
                  >
                    Seleccionar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="pl-10 border-gray-300 focus:ring-sky focus:border-sky"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="pl-10 border-gray-300 focus:ring-sky focus:border-sky"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="pl-10 border-gray-300 focus:ring-sky focus:border-sky"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                  Número de licencia (si aplica)
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Ej: PPL-12345"
                    className="pl-10 border-gray-300 focus:ring-sky focus:border-sky"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-sky text-white hover:bg-sky-hover rounded-full font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipModal;
