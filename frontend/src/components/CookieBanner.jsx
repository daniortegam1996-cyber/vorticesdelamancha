import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'vortices_cookies_accepted';

const CookieBanner = ({ onShowCookiePolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasAccepted) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    // Even if rejected, we set a flag to not show the banner again
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-[#0074D9]/10 rounded-full flex items-center justify-center">
            <Cookie className="w-6 h-6 text-[#0074D9]" />
          </div>
          
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-semibold text-[#001f3f] text-lg mb-1">
              Uso de Cookies
            </h3>
            <p className="text-gray-600 text-sm">
              Este sitio web utiliza únicamente cookies técnicas necesarias para su funcionamiento. 
              No utilizamos cookies de seguimiento ni publicidad. 
              Al continuar navegando, acepta su uso. 
              <button 
                onClick={onShowCookiePolicy}
                className="text-[#0074D9] hover:underline ml-1"
              >
                Más información
              </button>
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 md:flex-none px-6 py-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Rechazar
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2 rounded-full bg-[#0074D9] text-white hover:bg-[#0063c1]"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
