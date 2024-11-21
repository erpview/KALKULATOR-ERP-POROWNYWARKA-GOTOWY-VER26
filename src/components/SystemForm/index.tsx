import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { System } from '../../types/system';
import { Loader2 } from 'lucide-react';
import { BasicInfoSection } from './BasicInfoSection';
import { ModulesSection } from './ModulesSection';
import { TechnicalSection } from './TechnicalSection';
import { AdditionalSection } from './AdditionalSection';
import { DeploymentSection } from './DeploymentSection';
import toast from 'react-hot-toast';

interface SystemFormProps {
  system: System | null;
  onSave: (system: System) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
  isCreating: boolean;
}

export const SystemForm: React.FC<SystemFormProps> = ({
  system,
  onSave,
  onCancel,
  isSaving,
  isCreating
}) => {
  const { isAdmin } = useAuth();
  
  const initialData = {
    ...(system && Object.fromEntries(
      Object.entries(system).filter(([key]) => key !== 'change_notes')
    )),
    ...(!system && {
      name: '',
      vendor: '',
      website: '',
      description: '',
      size: [],
      customization_level: 'Low',
      deployment_type: [],
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
      reporting_features: []
    }),
    change_notes: ''
  };

  const [formData, setFormData] = useState<Partial<System>>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.vendor || !formData.website || !formData.description || !formData.size?.length || !formData.customization_level) {
      toast.error('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    if (!isAdmin && !isCreating && !formData.change_notes) {
      toast.error('Proszę opisać wprowadzone zmiany');
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoSection formData={formData} onChange={handleInputChange} />
      
      <ModulesSection formData={formData} onCheckboxChange={handleCheckboxChange} />
      
      <DeploymentSection formData={formData} onChange={handleInputChange} />
      
      <TechnicalSection 
        formData={formData} 
        onChange={handleInputChange}
        onArrayChange={handleArrayChange}
      />
      
      <AdditionalSection 
        formData={formData} 
        onChange={handleInputChange}
        onArrayChange={handleArrayChange}
      />

      {!isAdmin && (
        <div className="sf-card p-6">
          <label className="block text-sm font-medium mb-2">
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