import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Jak wygląda proces wyceny systemu ERP?",
    answer: "Proces wyceny systemu ERP składa się z kilku etapów: analizy potrzeb firmy, określenia wymaganych modułów, oszacowania liczby użytkowników, oceny potrzeb integracji z innymi systemami oraz uwzględnienia kosztów wdrożenia i szkoleń. Każda wycena jest indywidualna i zależy od specyfiki przedsiębiorstwa."
  },
  {
    question: "Jakie czynniki wpływają na koszt wdrożenia ERP?",
    answer: "Główne czynniki to: wielkość firmy, liczba użytkowników, wybrane moduły, stopień customizacji, potrzeby integracji z innymi systemami, zakres szkoleń, czas wdrożenia oraz wybór między rozwiązaniem chmurowym a on-premise."
  },
  {
    question: "Ile czasu trwa typowe wdrożenie systemu ERP?",
    answer: "Czas wdrożenia zależy od wielkości organizacji i złożoności projektu. Małe projekty mogą trwać 3-6 miesięcy, średnie 6-12 miesięcy, a duże projekty nawet powyżej roku. Kluczowe jest dokładne planowanie i zaangażowanie zespołu."
  },
  {
    question: "Czy lepiej wybrać system ERP w chmurze czy on-premise?",
    answer: "Wybór zależy od specyfiki firmy. System chmurowy oferuje niższe koszty początkowe, automatyczne aktualizacje i dostęp z dowolnego miejsca. Rozwiązanie on-premise daje większą kontrolę nad danymi i możliwość głębokiej customizacji, ale wymaga własnej infrastruktury IT."
  },
  {
    question: "Jakie są ukryte koszty wdrożenia ERP?",
    answer: "Należy uwzględnić: koszty szkoleń pracowników, integracji z istniejącymi systemami, migracji danych, customizacji, utrzymania systemu, ewentualnych modyfikacji procesów biznesowych oraz potencjalnego spadku produktywności w okresie wdrożenia."
  },
  {
    question: "Jak przygotować się do wdrożenia systemu ERP?",
    answer: "Kluczowe kroki to: analiza i dokumentacja procesów biznesowych, określenie celów wdrożenia, wybór lidera projektu, przygotowanie zespołu projektowego, zabezpieczenie budżetu, przegląd i oczyszczenie danych do migracji oraz opracowanie planu szkoleń."
  },
  {
    question: "Czy można wdrożyć ERP etapami?",
    answer: "Tak, wdrożenie etapowe jest często rekomendowane, szczególnie dla większych organizacji. Pozwala to na lepszą kontrolę nad projektem, łatwiejsze zarządzanie zmianą oraz możliwość weryfikacji założeń przed pełnym wdrożeniem."
  },
  {
    question: "Jak oszacować ROI z wdrożenia systemu ERP?",
    answer: "ROI można oszacować analizując: przewidywane oszczędności czasu pracy, redukcję kosztów operacyjnych, zwiększenie efektywności procesów, poprawę jakości obsługi klienta, redukcję błędów oraz przyspieszenie podejmowania decyzji biznesowych."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-12">
      <div className="flex items-center justify-center gap-3 mb-8">
        <HelpCircle className="w-8 h-8 text-[#0066CC]" />
        <h2 className="text-[32px] font-semibold text-[#1d1d1f]">
          Najczęściej zadawane pytania
        </h2>
      </div>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="sf-card overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <span className="text-[17px] font-medium text-[#1d1d1f]">{item.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-[#86868b]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#86868b]" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 py-4 bg-[#F5F5F7]/50">
                <p className="text-[15px] leading-relaxed text-[#1d1d1f]">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;