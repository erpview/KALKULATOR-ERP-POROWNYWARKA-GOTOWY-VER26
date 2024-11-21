import React from 'react';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleImplementationClick = () => {
    onClose();
    navigate('/wdrozenie-erp');
    window.scrollTo(0, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-[#32D74B]" />
          </div>
          
          <h2 className="text-[32px] font-semibold text-[#1d1d1f] mb-4">
            Dziękujemy za wypełnienie formularza
          </h2>
          
          <p className="text-[19px] leading-relaxed text-[#86868b] mb-8">
            Nasz zespół prześle Twoje zapytanie do partnerów portalu ERP-VIEW.PL, którzy skontaktują się z Tobą w ciągu 24 godzin.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleImplementationClick}
              className="sf-button-primary w-full justify-center bg-[#2c3b67] hover:bg-[#2c3b67]/90 text-[17px]"
            >
              Dowiedz się więcej o procesie wdrożenia ERP
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            <a
              href="https://www.erp-view.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="sf-button-primary w-full justify-center bg-[#0066CC] hover:bg-[#0066CC]/90 text-[17px]"
              onClick={onClose}
            >
              Sprawdź aktualne informacje z rynku ERP
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            
            <button
              onClick={onClose}
              className="sf-button w-full justify-center bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED] text-[17px]"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};