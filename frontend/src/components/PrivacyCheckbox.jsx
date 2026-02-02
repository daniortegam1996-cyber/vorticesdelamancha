import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const PrivacyCheckbox = ({ checked, onChange, onShowPrivacy }) => {
  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id="privacy-consent"
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1 border-gray-300 data-[state=checked]:bg-[#0074D9] data-[state=checked]:border-[#0074D9]"
      />
      <label 
        htmlFor="privacy-consent" 
        className="text-sm text-gray-600 leading-relaxed cursor-pointer"
      >
        He leído y acepto la{' '}
        <button
          type="button"
          onClick={onShowPrivacy}
          className="text-[#0074D9] hover:underline font-medium"
        >
          Política de Privacidad
        </button>
        {' '}y autorizo el tratamiento de mis datos personales para la finalidad indicada.
      </label>
    </div>
  );
};

export default PrivacyCheckbox;
