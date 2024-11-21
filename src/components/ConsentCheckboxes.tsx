import React from 'react';
import { Info } from 'lucide-react';

interface ConsentCheckboxesProps {
  privacyConsent: boolean;
  marketingConsent: boolean;
  onPrivacyConsentChange: (value: boolean) => void;
  onMarketingConsentChange: (value: boolean) => void;
  onPrivacyClick: () => void;
}

export const ConsentCheckboxes: React.FC<ConsentCheckboxesProps> = ({
  privacyConsent,
  marketingConsent,
  onPrivacyConsentChange,
  onMarketingConsentChange,
  onPrivacyClick
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Info className="w-6 h-6 text-[#0066CC]" />
        <h3 className="text-[21px] font-semibold text-[#1d1d1f]">
          Wymagane zgody
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="privacy-consent"
              checked={privacyConsent}
              onChange={(e) => onPrivacyConsentChange(e.target.checked)}
              className="sf-checkbox"
              required
            />
          </div>
          <div>
            <label htmlFor="privacy-consent" className="text-[15px] text-[#1d1d1f] cursor-pointer">
              Zapoznałem się z{' '}
              <button
                type="button"
                onClick={onPrivacyClick}
                className="text-[#0066CC] hover:underline focus:outline-none"
              >
                informacją o administratorze i przetwarzaniu danych
              </button>
              . *
            </label>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="marketing-consent"
              checked={marketingConsent}
              onChange={(e) => onMarketingConsentChange(e.target.checked)}
              className="sf-checkbox"
              required
            />
          </div>
          <div>
            <label htmlFor="marketing-consent" className="text-[15px] text-[#1d1d1f] cursor-pointer">
              Zgadzam się na otrzymywanie "informacji handlowych" w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną od Partnerów RAPORTU ERP oraz portalu ERP-VIEW.PL. *
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};