import React from 'react';
import { System } from '../../types/system';

interface ModulesSectionProps {
  formData: Partial<System>;
  onCheckboxChange: (field: keyof System) => void;
}

interface ModuleInfo {
  id: keyof System;
  label: string;
  description: string;
}

const basicModules: ModuleInfo[] = [
  {
    id: 'finance',
    label: 'Finanse i księgowość',
    description: 'Zarządzanie finansami, księgowość, controlling, budżetowanie'
  },
  {
    id: 'hr',
    label: 'Kadry i płace (HR)',
    description: 'Zarządzanie zasobami ludzkimi, rekrutacja, szkolenia, oceny pracownicze'
  },
  {
    id: 'scm',
    label: 'Zarządzanie łańcuchem dostaw (SCM)',
    description: 'Planowanie dostaw, zarządzanie zapasami i logistyką'
  },
  {
    id: 'production',
    label: 'Zarządzanie produkcją',
    description: 'Planowanie produkcji, zarządzanie zleceniami, kontrola jakości'
  },
  {
    id: 'crm',
    label: 'Zarządzanie relacjami z klientami (CRM)',
    description: 'Obsługa klienta, sprzedaż, marketing, serwis'
  },
  {
    id: 'warehouse',
    label: 'Gospodarka magazynowa',
    description: 'Zarządzanie magazynem, inwentaryzacja, lokalizacje magazynowe'
  },
  {
    id: 'purchasing',
    label: 'Zakupy i zaopatrzenie',
    description: 'Zarządzanie dostawcami, zamówienia, ocena dostawców'
  }
];

const specialModules: ModuleInfo[] = [
  {
    id: 'project',
    label: 'Zarządzanie projektami',
    description: 'Planowanie projektów, harmonogramowanie, zarządzanie zasobami'
  },
  {
    id: 'bi',
    label: 'Business Intelligence',
    description: 'Analizy biznesowe, raporty, dashboardy, predykcje'
  },
  {
    id: 'grc',
    label: 'Zarządzanie ryzykiem i zgodnością (GRC)',
    description: 'Compliance, audyty, zarządzanie ryzykiem operacyjnym'
  },
  {
    id: 'dam',
    label: 'Zarządzanie zasobami cyfrowymi (DAM)',
    description: 'Przechowywanie i zarządzanie plikami multimedialnymi'
  },
  {
    id: 'cmms',
    label: 'Utrzymanie ruchu (CMMS)',
    description: 'Zarządzanie serwisem, konserwacje, przeglądy techniczne'
  },
  {
    id: 'plm',
    label: 'Zarządzanie cyklem życia produktu (PLM)',
    description: 'Rozwój produktów, dokumentacja techniczna, zarządzanie zmianami'
  },
  {
    id: 'rental',
    label: 'Zarządzanie wynajmem i leasingiem',
    description: 'Obsługa wynajmu sprzętu, rozliczenia, harmonogramy'
  },
  {
    id: 'ecommerce',
    label: 'E-commerce i handel elektroniczny',
    description: 'Integracja ze sklepami online, zarządzanie sprzedażą internetową'
  }
];

const connectivityModules: ModuleInfo[] = [
  {
    id: 'edi',
    label: 'Wymiana danych elektronicznych (EDI)',
    description: 'Automatyczna wymiana dokumentów handlowych między systemami'
  },
  {
    id: 'iot',
    label: 'Internet rzeczy (IoT)',
    description: 'Integracja z urządzeniami i czujnikami przemysłowymi'
  },
  {
    id: 'api',
    label: 'Interfejsy programistyczne (API)',
    description: 'Możliwość integracji z systemami zewnętrznymi poprzez API'
  },
  {
    id: 'dms',
    label: 'Zarządzanie dokumentami (DMS)',
    description: 'Elektroniczny obieg dokumentów, archiwizacja, workflow'
  },
  {
    id: 'mobile',
    label: 'Aplikacje mobilne',
    description: 'Dostęp do systemu przez urządzenia mobilne, praca w terenie'
  },
  {
    id: 'portals',
    label: 'Portale dla klientów i partnerów',
    description: 'Platformy samoobsługowe dla klientów i partnerów biznesowych'
  }
];

const ModuleSection: React.FC<{
  title: string;
  modules: ModuleInfo[];
  formData: Partial<System>;
  onCheckboxChange: (field: keyof System) => void;
}> = ({ title, modules, formData, onCheckboxChange }) => (
  <div className="sf-card p-6">
    <h3 className="text-xl font-semibold mb-6">{title}</h3>
    <div className="grid grid-cols-1 gap-4">
      {modules.map(({ id, label, description }) => (
        <div
          key={id}
          onClick={() => onCheckboxChange(id)}
          className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div 
            className="relative flex-shrink-0 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={formData[id] || false}
              onChange={() => onCheckboxChange(id)}
              className="sf-checkbox pointer-events-none"
            />
          </div>
          <div className="flex-grow">
            <div className="text-[15px] font-medium text-[#1d1d1f] group-hover:text-[#2c3b67]">
              {label}
            </div>
            <p className="text-[13px] text-[#86868b] mt-1">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ModulesSection: React.FC<ModulesSectionProps> = ({ formData, onCheckboxChange }) => {
  return (
    <div className="space-y-6">
      <ModuleSection
        title="Moduły podstawowe"
        modules={basicModules}
        formData={formData}
        onCheckboxChange={onCheckboxChange}
      />
      
      <ModuleSection
        title="Moduły specjalne"
        modules={specialModules}
        formData={formData}
        onCheckboxChange={onCheckboxChange}
      />
      
      <ModuleSection
        title="Moduły łączności"
        modules={connectivityModules}
        formData={formData}
        onCheckboxChange={onCheckboxChange}
      />
    </div>
  );
};

export default ModulesSection;