import React from 'react';
import Select from 'react-select';
import { ArrayInput } from '../ArrayInput';
import { System } from '../../types/system';

interface AdditionalSectionProps {
  formData: Partial<System>;
  onChange: (field: keyof System, value: any) => void;
  onArrayChange: (field: keyof System, value: string[]) => void;
}

const PRICING_MODELS = [
  { value: 'subscription', label: 'Subskrypcja' },
  { value: 'perpetual', label: 'Licencja wieczysta' },
  { value: 'user-based', label: 'Opłata za użytkownika' }
] as const;

export const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  formData,
  onChange,
  onArrayChange
}) => {
  const handlePricingModelChange = (selected: readonly typeof PRICING_MODELS[number][] | null) => {
    onChange('pricing_model', selected ? selected.map(option => option.value) : []);
  };

  return (
    <div className="sf-card p-6">
      <h3 className="text-xl font-semibold mb-6">Dodatkowe informacje</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Model cenowy</label>
          <Select
            isMulti
            options={PRICING_MODELS}
            value={PRICING_MODELS.filter(model => formData.pricing_model?.includes(model.value))}
            onChange={handlePricingModelChange}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
            placeholder="Wybierz model cenowy"
            noOptionsMessage={() => "Brak opcji"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Czas wdrożenia</label>
          <input
            type="text"
            value={formData.implementation_time || ''}
            onChange={(e) => onChange('implementation_time', e.target.value)}
            className="sf-input w-full"
            placeholder="np. 3-6 miesięcy"
          />
        </div>

        <div>
          <ArrayInput
            label="Branże docelowe"
            value={formData.target_industries || []}
            onChange={(value) => onArrayChange('target_industries', value)}
            placeholder="Dodaj branżę..."
          />
        </div>

        <div>
          <ArrayInput
            label="Standardy zgodności"
            value={formData.compliance_standards || []}
            onChange={(value) => onArrayChange('compliance_standards', value)}
            placeholder="Dodaj standard..."
          />
        </div>

        <div>
          <ArrayInput
            label="Opcje backupu"
            value={formData.backup_options || []}
            onChange={(value) => onArrayChange('backup_options', value)}
            placeholder="Dodaj opcję backupu..."
          />
        </div>

        <div>
          <ArrayInput
            label="Funkcje raportowania"
            value={formData.reporting_features || []}
            onChange={(value) => onArrayChange('reporting_features', value)}
            placeholder="Dodaj funkcję raportowania..."
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalSection;