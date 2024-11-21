import React from 'react';
import Select from 'react-select';
import { System } from '../../types/system';

interface BasicInfoSectionProps {
  formData: Partial<System>;
  onChange: (field: keyof System, value: any) => void;
}

const COMPANY_SIZES = [
  { value: 'Małe', label: 'Małe' },
  { value: 'Średnie', label: 'Średnie' },
  { value: 'Duże', label: 'Duże' }
] as const;

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onChange }) => {
  const handleSizeChange = (selected: readonly typeof COMPANY_SIZES[number][] | null) => {
    onChange('size', selected ? selected.map(option => option.value) : []);
  };

  return (
    <div className="sf-card p-6">
      <h3 className="text-xl font-semibold mb-6">Podstawowe informacje</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nazwa systemu *</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="sf-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dostawca *</label>
          <input
            type="text"
            value={formData.vendor || ''}
            onChange={(e) => onChange('vendor', e.target.value)}
            className="sf-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Strona WWW *</label>
          <input
            type="url"
            value={formData.website || ''}
            onChange={(e) => onChange('website', e.target.value)}
            className="sf-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Wielkość firmy *</label>
          <Select
            isMulti
            options={COMPANY_SIZES}
            value={COMPANY_SIZES.filter(size => formData.size?.includes(size.value))}
            onChange={handleSizeChange}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
            placeholder="Wybierz wielkość firmy"
            noOptionsMessage={() => "Brak opcji"}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Opis *</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="sf-input w-full min-h-[100px]"
            required
            placeholder="Wprowadź opis systemu"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;