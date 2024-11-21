import { MODULE_NAMES, SYSTEM_VERSION_NAMES, BUSINESS_QUESTION_LABELS } from '../config/emailTemplate';
import { formatPhone } from './formatters';

interface FormData {
  companyName: string;
  industry: string;
  employees: string;
  currentSystem: string;
  systemVersion: string;
  modules: string[];
  moduleUsers: Record<string, number>;
  businessAnswers: Record<string, boolean>;
  decisionDate: string;
  implementationDate: string;
  contactPerson: string;
  email: string;
  nip: string;
  position: string;
  phone: string;
  requirements?: string;
}

export const formatEmailTemplate = (formData: FormData) => {
  // Format modules section
  const modulesSection = formData.modules
    .map(moduleId => {
      const moduleName = MODULE_NAMES[moduleId] || moduleId;
      const userCount = formData.moduleUsers[moduleId];
      return `${moduleName}: ${userCount} użytkowników`;
    })
    .join('\n');

  // Format company operations section
  const companyOperations = Object.entries(formData.businessAnswers)
    .map(([key, value]) => {
      const label = BUSINESS_QUESTION_LABELS[key] || key;
      return `${label}: ${value ? 'Tak' : 'Nie'}`;
    })
    .join('\n');

  // Format dates
  const formatDate = (date: string) => {
    if (!date) return 'Nie określono';
    return new Date(date).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Prepare template parameters
  const templateParams = {
    // Company Details
    company_name: formData.companyName,
    industry: formData.industry,
    employee_count: formData.employees,
    current_system: formData.currentSystem || 'Nie określono',
    system_version: SYSTEM_VERSION_NAMES[formData.systemVersion] || 'Nie określono',

    // Modules and Operations
    modules_section: modulesSection,
    company_operations: companyOperations,

    // Timeline
    decision_date: formatDate(formData.decisionDate),
    implementation_date: formatDate(formData.implementationDate),

    // Contact Information
    contact_name: formData.contactPerson,
    business_email: formData.email,
    tax_id: formData.nip,
    position: formData.position,
    mobile: formatPhone(formData.phone),
    additional_requirements: formData.requirements || 'Brak dodatkowych wymagań'
  };

  return templateParams;
};