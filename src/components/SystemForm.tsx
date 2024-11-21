import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { System } from '../types/system';
import { Loader2 } from 'lucide-react';
import Select from 'react-select';
import { ArrayInput } from './ArrayInput';

interface SystemFormProps {
  system: System | null;
  onSave: (system: System) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
  isCreating: boolean;
}

const CUSTOMIZATION_LEVELS = [
  { value: 'Low', label: 'Niski' },
  { value: 'Medium', label: 'Średni' },
  { value: 'High', label: 'Wysoki' }
];

const UPDATE_FREQUENCIES = [
  { value: 'Monthly', label: 'Co miesiąc' },
  { value: 'Quarterly', label: 'Co kwartał' },
  { value: 'Semi-annually', label: 'Co pół roku' },
  { value: 'Annually', label: 'Co rok' }
];

const PRICING_MODELS = [
  { value: 'subscription', label: 'Subskrypcja' },
  { value: 'perpetual', label: 'Licencja wieczysta' },
  { value: 'user-based', label: 'Opłata za użytkownika' }
];

const COMPANY_SIZES = [
  { value: 'Małe', label: 'Małe' },
  { value: 'Średnie', label: 'Średnie' },
  { value: 'Duże', label: 'Duże' }
];

export const SystemForm: React.FC<SystemFormProps> = ({
  system,
  onSave,
  onCancel,
  isSaving,
  isCreating
}) => {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState<Partial<System>>(system || {
    name: '',
    vendor: '',
    website: '',
    description: '',
    size: [],
    finance: false,
    hr: false,
    scm: false,
    production: false,
    crm: false,
    warehouse: false,
    purchasing: false,
    project: false,
    bi: false,
    grc: false,
    dam: false,
    cmms: false,
    plm: false,
    rental: false,
    ecommerce: false,
    edi: false,
    iot: false,
    api: false,
    dms: false,
    mobile: false,
    portals: false,
    customization_level: '',
    update_frequency: '',
    supported_databases: [],
    multilingual: false,
    max_users: null,
    concurrent_users: null,
    pricing_model: [],
    implementation_time: '',
    target_industries: [],
    languages: [],
    support_options: [],
    training_options: [],
    integration_options: [],
    security_features: [],
    compliance_standards: [],
    backup_options: [],
    reporting_features: [],
    change_notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData as System);
  };

  const handleInputChange = (field: keyof System, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof System) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleArrayChange = (field: keyof System, value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Podstawowe informacje</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nazwa systemu *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="sf-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dostawca *</label>
            <input
              type="text"
              value={formData.vendor || ''}
              onChange={(e) => handleInputChange('vendor', e.target.value)}
              className="sf-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Strona WWW *</label>
            <input
              type="url"
              value={formData.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="sf-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Wielkość firmy *</label>
            <Select
              isMulti
              options={COMPANY_SIZES}
              value={COMPANY_SIZES.filter(size => formData.size?.includes(size.value))}
              onChange={(selected) => handleInputChange('size', selected.map(option => option.value))}
              className="react-select-container"
              classNamePrefix="react-select"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Opis *</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="sf-input w-full min-h-[100px]"
            required
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Moduły podstawowe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.finance || false}
              onChange={() => handleCheckboxChange('finance')}
              className="sf-checkbox"
            />
            <span>Finanse</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.hr || false}
              onChange={() => handleCheckboxChange('hr')}
              className="sf-checkbox"
            />
            <span>HR</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.production || false}
              onChange={() => handleCheckboxChange('production')}
              className="sf-checkbox"
            />
            <span>Produkcja</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.warehouse || false}
              onChange={() => handleCheckboxChange('warehouse')}
              className="sf-checkbox"
            />
            <span>Magazyn</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.crm || false}
              onChange={() => handleCheckboxChange('crm')}
              className="sf-checkbox"
            />
            <span>CRM</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.purchasing || false}
              onChange={() => handleCheckboxChange('purchasing')}
              className="sf-checkbox"
            />
            <span>Zakupy</span>
          </label>
        </div>

        <h3 className="text-lg font-semibold mt-6">Moduły specjalne</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.project || false}
              onChange={() => handleCheckboxChange('project')}
              className="sf-checkbox"
            />
            <span>Projekty</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.bi || false}
              onChange={() => handleCheckboxChange('bi')}
              className="sf-checkbox"
            />
            <span>BI</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.grc || false}
              onChange={() => handleCheckboxChange('grc')}
              className="sf-checkbox"
            />
            <span>GRC</span>
          </label>
        </div>

        <h3 className="text-lg font-semibold mt-6">Moduły łączności</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.api || false}
              onChange={() => handleCheckboxChange('api')}
              className="sf-checkbox"
            />
            <span>API</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.mobile || false}
              onChange={() => handleCheckboxChange('mobile')}
              className="sf-checkbox"
            />
            <span>Mobile</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.edi || false}
              onChange={() => handleCheckboxChange('edi')}
              className="sf-checkbox"
            />
            <span>EDI</span>
          </label>
        </div>
      </div>

      {/* Technical Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Szczegóły techniczne</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Poziom kastomizacji</label>
            <Select
              options={CUSTOMIZATION_LEVELS}
              value={CUSTOMIZATION_LEVELS.find(level => level.value === formData.customization_level)}
              onChange={(selected) => handleInputChange('customization_level', selected?.value)}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Częstotliwość aktualizacji</label>
            <Select
              options={UPDATE_FREQUENCIES}
              value={UPDATE_FREQUENCIES.find(freq => freq.value === formData.update_frequency)}
              onChange={(selected) => handleInputChange('update_frequency', selected?.value)}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <ArrayInput
              label="Obsługiwane bazy danych"
              value={formData.supported_databases || []}
              onChange={(value) => handleArrayChange('supported_databases', value)}
              placeholder="Dodaj bazę danych..."
            />
          </div>

          <div>
            <ArrayInput
              label="Języki"
              value={formData.languages || []}
              onChange={(value) => handleArrayChange('languages', value)}
              placeholder="Dodaj język..."
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dodatkowe informacje</h3>
        
        <div>
          <label className="block text-sm font-medium mb-1">Model cenowy</label>
          <Select
            isMulti
            options={PRICING_MODELS}
            value={PRICING_MODELS.filter(model => formData.pricing_model?.includes(model.value))}
            onChange={(selected) => handleInputChange('pricing_model', selected.map(option => option.value))}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Czas wdrożenia</label>
          <input
            type="text"
            value={formData.implementation_time || ''}
            onChange={(e) => handleInputChange('implementation_time', e.target.value)}
            className="sf-input w-full"
            placeholder="np. 3-6 miesięcy"
          />
        </div>

        <div>
          <ArrayInput
            label="Branże docelowe"
            value={formData.target_industries || []}
            onChange={(value) => handleArrayChange('target_industries', value)}
            placeholder="Dodaj branżę..."
          />
        </div>
      </div>

      {/* Change Notes */}
      {!isAdmin && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Uwagi do zmian {!isCreating && '*'}
          </label>
          <textarea
            value={formData.change_notes || ''}
            onChange={(e) => handleInputChange('change_notes', e.target.value)}
            className="sf-input w-full min-h-[100px]"
            placeholder="Opisz wprowadzone zmiany..."
            required={!isCreating}
          />
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="sf-button bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED]"
          disabled={isSaving}
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="sf-button-primary"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Zapisywanie...
            </>
          ) : (
            'Zapisz'
          )}
        </button>
      </div>
    </form>
  );
};

export default SystemForm;