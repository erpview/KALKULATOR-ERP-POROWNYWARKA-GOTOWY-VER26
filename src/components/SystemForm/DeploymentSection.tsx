import React from 'react';
import { System } from '../../types/system';

interface DeploymentSectionProps {
  formData: Partial<System>;
  onChange: (field: keyof System, value: any) => void;
}

interface DeploymentOption {
  id: string;
  label: string;
  description: string;
}

const deploymentOptions: DeploymentOption[] = [
  {
    id: 'cloud',
    label: 'Chmura obliczeniowa (Cloud)',
    description: 'System dostępny przez internet, aktualizowany automatycznie, bez potrzeby własnej infrastruktury'
  },
  {
    id: 'onpremise',
    label: 'Instalacja lokalna (On-premise)',
    description: 'System zainstalowany na serwerach firmy, pełna kontrola nad danymi i infrastrukturą'
  },
  {
    id: 'hybrid',
    label: 'Model hybrydowy',
    description: 'Połączenie rozwiązania chmurowego z lokalną instalacją, elastyczność w zarządzaniu danymi'
  }
];

export const DeploymentSection: React.FC<DeploymentSectionProps> = ({ formData, onChange }) => {
  const handleDeploymentToggle = (deploymentId: string) => {
    const currentTypes = formData.deployment_type || [];
    const newTypes = currentTypes.includes(deploymentId)
      ? currentTypes.filter(id => id !== deploymentId)
      : [...currentTypes, deploymentId];
    onChange('deployment_type', newTypes);
  };

  return (
    <div className="sf-card p-6">
      <h3 className="text-xl font-semibold mb-6">Model wdrożenia</h3>
      <div className="grid grid-cols-1 gap-4">
        {deploymentOptions.map(({ id, label, description }) => (
          <div
            key={id}
            onClick={() => handleDeploymentToggle(id)}
            className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div 
              className="relative flex-shrink-0 mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={formData.deployment_type?.includes(id) || false}
                onChange={() => handleDeploymentToggle(id)}
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
};

export default DeploymentSection;