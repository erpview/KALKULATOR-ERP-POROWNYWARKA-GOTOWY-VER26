import React from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/Logo';
import Article from '../components/Article';

export const Implementation: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Wdrożenie systemu ERP - Etapy, korzyści i najlepsze praktyki | Kalkulator ERP</title>
        <meta name="description" content="Poznaj kompleksowy przewodnik po wdrożeniu systemu ERP. Dowiedz się o etapach wdrożenia, korzyściach z systemów ERP oraz najlepszych praktykach implementacji." />
        <meta property="og:title" content="Wdrożenie systemu ERP - Etapy, korzyści i najlepsze praktyki | Kalkulator ERP" />
        <meta property="og:description" content="Poznaj kompleksowy przewodnik po wdrożeniu systemu ERP. Dowiedz się o etapach implementacji, korzyściach i najlepszych praktykach." />
        <meta property="og:url" content="https://kalkulator-erp.com/wdrozenie-erp" />
        <link rel="canonical" href="https://kalkulator-erp.com/wdrozenie-erp" />
      </Helmet>

      <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-[300px] h-[150px] mx-auto mb-8">
              <Logo />
            </div>
            <h1 className="text-[#1d1d1f] mb-4">Wdrożenie systemu ERP</h1>
            <p className="text-[21px] leading-relaxed text-[#86868b]">
              Kompleksowy przewodnik po procesie wdrożenia systemu ERP dla Twojej firmy
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#d2d2d7]/30 overflow-hidden">
            <div className="p-8 sm:p-12">
              <Article />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};