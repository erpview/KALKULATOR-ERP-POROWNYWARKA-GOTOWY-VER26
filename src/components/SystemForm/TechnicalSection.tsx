import React from 'react';
import Select from 'react-select';
import { ArrayInput } from '../ArrayInput';
import { System } from '../../types/system';

interface TechnicalSectionProps {
  formData: Partial<System>;
  onChange: (field: keyof System, value: any) => void;
  onArrayChange: (field: keyof System, value: string[]) => void;
}

const CUSTOMIZATION_LEVELS = [
  { value: 'Low', label: 'Niski' },
  { value: 'Medium', label: 'Średni' },
  { value: 'High', label: 'Wysoki' }
] as const;

const UPDATE_FREQUENCIES = [
  { value: 'Monthly', label: 'Co miesiąc' },
  { value: 'Quarterly', label: 'Co kwartał' },
  { value: 'Semi-annually', label: 'Co pół roku' },
  { value: 'Annually', label: 'Co rok' },
  { value: 'No-data', label: 'Brak danych' },
  { value: 'When-client-ask', label: 'Zgodnie z potrzebami klienta' },
  { value: 'Regular', label: 'Regularnie' },
  { value: 'Regular-and-when-client-ask', label: 'Regularnie i zgodnie z potrzebami klienta' }
] as const;

export const TechnicalSection: React.FC<TechnicalSectionProps> = ({ 
  formData, 
  onChange,
  onArrayChange 
}) => {
  return (
    <div className="sf-card p-6">
      <h3 className="text-xl font-semibold mb-6">Szczegóły techniczne</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Poziom kastomizacji *</label>
          <Select
            options={CUSTOMIZATION_LEVELS}
            value={CUSTOMIZATION_LEVELS.find(level => level.value === formData.customization_level)}
            onChange={(selected) => onChange('customization_level', selected?.value)}
            className="react-select-container"
            classNamePrefix="react-select"
            required
            isSearchable={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Częstotliwość aktualizacji</label>
          <Select
            options={UPDATE_FREQUENCIES}
            value={UPDATE_FREQUENCIES.find(freq => freq.value === formData.update_frequency)}
            onChange={(selected) => onChange('update_frequency', selected?.value)}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
            placeholder="Wybierz częstotliwość aktualizacji"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Wielojęzyczność</label>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.multilingual || false}
              onChange={() => onChange('multilingual', !formData.multilingual)}
              className="sf-checkbox mt-1"
            />
            <span className="text-sm text-[#1d1d1f]">System wspiera wiele języków</span>
          </div>
        </div>

        <div>
          <ArrayInput
            label="Obsługiwane bazy danych"
            value={formData.supported_databases || []}
            onChange={(value) => onArrayChange('supported_databases', value)}
            placeholder="Dodaj bazę danych..."
          />
        </div>

        <div>
          <ArrayInput
            label="Języki"
            value={formData.languages || []}
            onChange={(value) => onArrayChange('languages', value)}
            placeholder="Dodaj język..."
          />
        </div>

        <div>
          <ArrayInput
            label="Opcje wsparcia"
            value={formData.support_options || []}
            onChange={(value) => onArrayChange('support_options', value)}
            placeholder="Dodaj opcję wsparcia..."
          />
        </div>

        <div>
          <ArrayInput
            label="Opcje szkoleń"
            value={formData.training_options || []}
            onChange={(value) => onArrayChange('training_options', value)}
            placeholder="Dodaj opcję szkolenia..."
          />
        </div>

        <div>
          <ArrayInput
            label="Opcje integracji"
            value={formData.integration_options || []}
            onChange={(value) => onArrayChange('integration_options', value)}
            placeholder="Dodaj opcję integracji..."
          />
        </div>

        <div>
          <ArrayInput
            label="Funkcje bezpieczeństwa"
            value={formData.security_features || []}
            onChange={(value) => onArrayChange('security_features', value)}
            placeholder="Dodaj funkcję bezpieczeństwa..."
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSection;