import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { systems } from '../data/systems';

export const MetaTags: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Base meta tags that are common across all pages
  const baseMetaTags = {
    siteName: "Kalkulator ERP by ERP-VIEW.PL",
    image: "https://erp-view.pl/images/artykuly/zdjecia/kalkulator-erp-share.jpg",
    twitterSite: "@erpview"
  };

  // Page-specific meta data
  const pageMetaData = {
    '/': {
      title: "Kalkulator kosztów wdrożenia systemu ERP | Kalkulator ERP",
      description: "Oblicz koszty wdrożenia systemu ERP dla Twojej firmy. Porównaj oferty wiodących dostawców, poznaj ceny modułów i otrzymaj spersonalizowaną wycenę w 24h.",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kalkulator kosztów wdrożenia systemu ERP | Kalkulator ERP",
        "applicationCategory": "BusinessApplication",
        "description": "Kalkulator kosztów wdrożenia systemu ERP dla firm. Porównaj oferty, poznaj ceny modułów i otrzymaj spersonalizowaną wycenę.",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PLN"
        },
        "publisher": {
          "@type": "Organization",
          "name": baseMetaTags.siteName,
          "url": "https://kalkulator-erp.com"
        }
      }
    },
    '/wdrozenie-erp': {
      title: "Wdrożenie systemu ERP - Etapy, korzyści i najlepsze praktyki | Kalkulator ERP",
      description: "Poznaj kompleksowy przewodnik po wdrożeniu systemu ERP. Dowiedz się o etapach wdrożenia, korzyściach z systemów ERP oraz najlepszych praktykach implementacji.",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "name": "Wdrożenie systemu ERP - Etapy, korzyści i najlepsze praktyki | Kalkulator ERP",
        "headline": "Wdrożenie systemu ERP - Kompleksowy przewodnik po procesie implementacji",
        "description": "Poznaj kompleksowy przewodnik po wdrożeniu systemu ERP. Dowiedz się o etapach implementacji, korzyściach i najlepszych praktykach.",
        "author": {
          "@type": "Organization",
          "name": baseMetaTags.siteName
        },
        "publisher": {
          "@type": "Organization",
          "name": baseMetaTags.siteName,
          "url": "https://kalkulator-erp.com"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://kalkulator-erp.com/wdrozenie-erp"
        }
      }
    },
    '/koszt-wdrozenia-erp': {
      title: "Ile kosztuje wdrożenie ERP? Kompleksowy przewodnik po kosztach wdrożenia ERP | Kalkulator ERP",
      description: "Sprawdź, ile kosztuje wdrożenie systemu ERP. Poznaj wszystkie składniki kosztów, porównaj modele wdrożenia i dowiedz się, jak zaplanować budżet na system ERP.",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "name": "Ile kosztuje wdrożenie ERP? Kompleksowy przewodnik po kosztach wdrożenia ERP | Kalkulator ERP",
        "headline": "Kompleksowy przewodnik po kosztach wdrożenia systemu ERP",
        "description": "Sprawdź, ile kosztuje wdrożenie systemu ERP. Poznaj wszystkie składniki kosztów i dowiedz się, jak zaplanować budżet.",
        "author": {
          "@type": "Organization",
          "name": baseMetaTags.siteName
        },
        "publisher": {
          "@type": "Organization",
          "name": baseMetaTags.siteName,
          "url": "https://kalkulator-erp.com"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://kalkulator-erp.com/koszt-wdrozenia-erp"
        }
      }
    },
    '/systemy-erp': {
      title: "Systemy ERP w Polsce - Dostawcy ERP | Kalkulator ERP",
      description: "Poznaj najpopularniejsze systemy ERP dostępne w Polsce. Porównaj funkcjonalności, sprawdź opinie i wybierz najlepsze rozwiązanie dla swojej firmy.",
      schema: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Systemy ERP w Polsce - Dostawcy ERP | Kalkulator ERP",
        "description": "Poznaj najpopularniejsze systemy ERP dostępne w Polsce. Porównaj funkcjonalności i wybierz najlepsze rozwiązanie dla swojej firmy.",
        "itemListElement": systems.map((system, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": system.name,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All"
          }
        })),
        "publisher": {
          "@type": "Organization",
          "name": baseMetaTags.siteName
        }
      }
    },
    '/porownaj-systemy-erp': {
      title: "Porównanie systemów ERP - porównywarka ERP | Kalkulator ERP",
      description: "Porównaj systemy ERP dostępne w Polsce. Zestawienie funkcjonalności, modułów i możliwości najpopularniejszych systemów ERP. Wybierz najlepsze rozwiązanie dla swojej firmy.",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Porównanie systemów ERP - porównywarka ERP | Kalkulator ERP",
        "applicationCategory": "BusinessApplication",
        "description": "Porównaj systemy ERP dostępne w Polsce. Zestawienie funkcjonalności i możliwości systemów ERP.",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PLN"
        },
        "publisher": {
          "@type": "Organization",
          "name": baseMetaTags.siteName,
          "url": "https://kalkulator-erp.com"
        }
      }
    }
  };

  const currentPage = pageMetaData[path as keyof typeof pageMetaData];
  
  if (!currentPage) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{currentPage.title}</title>
      <meta name="description" content={currentPage.description} />
      <meta name="application-name" content={baseMetaTags.siteName} />
      
      {/* Open Graph */}
      <meta property="og:title" content={currentPage.title} />
      <meta property="og:description" content={currentPage.description} />
      <meta property="og:url" content={`https://kalkulator-erp.com${path}`} />
      <meta property="og:image" content={baseMetaTags.image} />
      <meta property="og:site_name" content={baseMetaTags.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={currentPage.title} />
      <meta name="twitter:description" content={currentPage.description} />
      <meta name="twitter:image" content={baseMetaTags.image} />
      <meta name="twitter:site" content={baseMetaTags.twitterSite} />
      
      {/* Canonical */}
      <link rel="canonical" href={`https://kalkulator-erp.com${path}`} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(currentPage.schema)}
      </script>
    </Helmet>
  );
};