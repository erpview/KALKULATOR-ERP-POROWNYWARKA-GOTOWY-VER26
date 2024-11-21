import React from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/Logo';
import SystemsCatalog from '../components/SystemsCatalog';

export const Systems: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Systemy ERP w Polsce - Dostawcy ERP | Kalkulator ERP</title>
        <meta name="description" content="Poznaj najpopularniejsze systemy ERP dostępne w Polsce. Porównaj funkcjonalności, sprawdź opinie i wybierz najlepsze rozwiązanie dla swojej firmy." />
        <meta property="og:title" content="Systemy ERP w Polsce - Dostawcy ERP | Kalkulator ERP" />
        <meta property="og:description" content="Poznaj najpopularniejsze systemy ERP dostępne w Polsce. Porównaj funkcjonalności i wybierz najlepsze rozwiązanie dla swojej firmy." />
        <meta property="og:url" content="https://kalkulator-erp.com/systemy-erp" />
        <link rel="canonical" href="https://kalkulator-erp.com/systemy-erp" />
      </Helmet>

      <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-[300px] h-[150px] mx-auto mb-8">
              <Logo />
            </div>
            <h1 className="text-[#1d1d1f] mb-4">Systemy ERP w Polsce</h1>
            <p className="text-[21px] leading-relaxed text-[#86868b]">
              Kompleksowy przegląd i porównanie systemów ERP dostępnych na polskim rynku
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#d2d2d7]/30 overflow-hidden">
            <div className="p-8 sm:p-12">
              <SystemsCatalog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};