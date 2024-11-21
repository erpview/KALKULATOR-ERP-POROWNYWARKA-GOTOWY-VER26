import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Send } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email';
import { formatEmailTemplate } from '../utils/emailFormatter';
import { validateBusinessEmail } from '../utils/validators';
import Logo from '../components/Logo';
import FAQ from '../components/FAQ';
import { ModulesSection } from '../components/FormSections/ModulesSection';
import { BusinessQuestionsSection } from '../components/FormSections/BusinessQuestionsSection';
import { SystemVersionSection } from '../components/FormSections/SystemVersionSection';
import { ContactSection } from '../components/FormSections/ContactSection';
import { TimelineSection } from '../components/FormSections/TimelineSection';
import { CompanySection } from '../components/FormSections/CompanySection';
import { ConsentCheckboxes } from '../components/ConsentCheckboxes';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';
import { SuccessModal } from '../components/SuccessModal';

const initialFormData = {
  companyName: '',
  employees: '',
  industry: '',
  modules: [],
  moduleUsers: {},
  systemVersion: '',
  currentSystem: '',
  timeline: '',
  budget: '',
  requirements: '',
  contactPerson: '',
  email: '',
  phone: '',
  nip: '',
  position: '',
  decisionDate: '',
  implementationDate: '',
  businessAnswers: {},
  privacyAccepted: false,
  marketingAccepted: false
};

export const Calculator: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateBusinessEmail(formData.email)) {
      toast.error('Proszę użyć służbowego adresu email');
      return;
    }

    const missingUserCounts = formData.modules.some(
      moduleId => !formData.moduleUsers[moduleId]
    );
    
    if (missingUserCounts) {
      toast.error('Proszę podać liczbę użytkowników dla wszystkich wybranych modułów');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = formatEmailTemplate(formData);

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      setIsSuccessModalOpen(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kalkulator kosztów wdrożenia systemu ERP | Kalkulator ERP</title>
        <meta name="description" content="Oblicz koszty wdrożenia systemu ERP dla Twojej firmy. Porównaj oferty wiodących dostawców, poznaj ceny modułów i otrzymaj spersonalizowaną wycenę w 24h." />
        <meta property="og:title" content="Kalkulator kosztów wdrożenia systemu ERP | Kalkulator ERP" />
        <meta property="og:description" content="Oblicz koszty wdrożenia systemu ERP dla Twojej firmy. Porównaj oferty wiodących dostawców i otrzymaj spersonalizowaną wycenę w 24h." />
        <meta property="og:url" content="https://kalkulator-erp.com" />
        <link rel="canonical" href="https://kalkulator-erp.com" />
      </Helmet>

      <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-[300px] h-[150px] mx-auto mb-8">
              <Logo />
            </div>
            <h1 className="text-[#1d1d1f] mb-4">Kalkulator wdrożenia systemu ERP</h1>
            <p className="text-[21px] leading-relaxed text-[#86868b] mb-4">
              Otrzymaj spersonalizowaną wycenę systemu ERP dla Twojej firmy
            </p>
            <div className="flex items-center justify-center gap-3 text-[17px] text-[#1d1d1f] bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[#d2d2d7]/30">
              <FileText className="w-6 h-6 flex-shrink-0 text-[#2c3b67]" />
              <p className="text-left">
                Po wypełnieniu formularza Twoje dane zostaną przekazane partnerom portalu ERP-VIEW.PL, którzy przygotują dla Ciebie spersonalizowane oferty. Dodatkowo, jako bonus, otrzymasz bezpłatny egzemplarz najnowszego „RAPORTU ERP 2024" – idealny materiał do samodzielnej analizy ponad 57 systemów ERP dostępnych na polskim rynku.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <CompanySection
              companyName={formData.companyName}
              employees={formData.employees}
              industry={formData.industry}
              currentSystem={formData.currentSystem}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <SystemVersionSection
              selectedVersion={formData.systemVersion}
              onVersionChange={(version) => setFormData(prev => ({ ...prev, systemVersion: version }))}
            />

            <ModulesSection
              selectedModules={formData.modules}
              onModuleToggle={(moduleId) => setFormData(prev => ({
                ...prev,
                modules: prev.modules.includes(moduleId)
                  ? prev.modules.filter(id => id !== moduleId)
                  : [...prev.modules, moduleId]
              }))}
              userCounts={formData.moduleUsers}
              onUserCountChange={(moduleId, count) => setFormData(prev => ({
                ...prev,
                moduleUsers: { ...prev.moduleUsers, [moduleId]: count }
              }))}
            />

            <BusinessQuestionsSection
              answers={formData.businessAnswers}
              onAnswerChange={(questionId, value) => setFormData(prev => ({
                ...prev,
                businessAnswers: { ...prev.businessAnswers, [questionId]: value }
              }))}
            />

            <TimelineSection
              decisionDate={formData.decisionDate}
              implementationDate={formData.implementationDate}
              onDateChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <ContactSection
              contactPerson={formData.contactPerson}
              email={formData.email}
              phone={formData.phone}
              nip={formData.nip}
              position={formData.position}
              requirements={formData.requirements}
              onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />

            <ConsentCheckboxes
              privacyConsent={formData.privacyAccepted}
              marketingConsent={formData.marketingAccepted}
              onPrivacyConsentChange={(value) => setFormData(prev => ({ ...prev, privacyAccepted: value }))}
              onMarketingConsentChange={(value) => setFormData(prev => ({ ...prev, marketingAccepted: value }))}
              onPrivacyClick={() => setIsPrivacyModalOpen(true)}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="sf-button-primary flex items-center gap-2"
                style={{ backgroundColor: '#2c3b67' }}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij formularz'}
              </button>
            </div>
          </form>

          <FAQ />
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};