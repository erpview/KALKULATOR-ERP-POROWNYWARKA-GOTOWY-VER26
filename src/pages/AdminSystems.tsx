import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, UserCog, UserPlus2, CheckCircle2 } from 'lucide-react';
import { System } from '../types/system';
import { supabase } from '../config/supabase';
import { SystemForm } from '../components/SystemForm/index';
import { SystemStatusBadge } from '../components/SystemStatusBadge';
import { ReviewModal } from '../components/ReviewModal';
import { ReassignOwnerModal } from '../components/ReassignOwnerModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const AdminSystems: React.FC = () => {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reviewSystem, setReviewSystem] = useState<System | null>(null);
  const [reassignSystem, setReassignSystem] = useState<System | null>(null);
  const { user, isAdmin, isEditor } = useAuth();

  const loadSystems = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('systems')
        .select('*');

      // If user is editor, only show their systems
      if (isEditor && user) {
        query = query.eq('created_by', user.id);
      }

      const { data, error } = await query
        .order('vendor', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setSystems(data || []);
    } catch (error) {
      console.error('Error loading systems:', error);
      toast.error('Nie udało się załadować systemów');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSystems();
  }, [isEditor, user]);

  const handleSave = async (systemData: System) => {
    try {
      setIsSaving(true);
      
      if (isCreating) {
        const { error } = await supabase
          .from('systems')
          .insert([{
            ...systemData,
            created_by: user?.id,
            status: isEditor ? 'pending' : 'published'
          }]);

        if (error) throw error;
        toast.success('System został dodany');
      } else {
        const { error } = await supabase
          .from('systems')
          .update({
            ...systemData,
            status: isEditor ? 'pending' : 'published',
            reviewed_by: null,
            reviewed_at: null,
            review_notes: null
          })
          .eq('id', systemData.id);

        if (error) throw error;
        toast.success('Zmiany zostały zapisane');
      }

      await loadSystems();
      setSelectedSystem(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving system:', error);
      toast.error('Nie udało się zapisać zmian');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (system: System) => {
    if (!confirm(`Czy na pewno chcesz usunąć system ${system.name}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('systems')
        .delete()
        .eq('id', system.id);

      if (error) throw error;
      toast.success('System został usunięty');
      await loadSystems();
    } catch (error) {
      console.error('Error deleting system:', error);
      toast.error('Nie udało się usunąć systemu');
    }
  };

  const handleCancel = () => {
    setSelectedSystem(null);
    setIsCreating(false);
  };

  const canEditSystem = (system: System) => {
    if (isAdmin) return true;
    return user?.id === system.created_by && 
           (system.status === 'draft' || system.status === 'rejected' || system.status === 'published');
  };

  const canReviewSystem = (system: System) => {
    return isAdmin && system.status === 'pending';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <UserCog className="w-8 h-8 text-[#2c3b67]" />
            <h1 className="text-[32px] font-semibold text-[#1d1d1f]">
              {isAdmin ? 'Zarządzanie systemami ERP' : 'Moje systemy ERP'}
            </h1>
          </div>
          <button
            onClick={() => {
              setSelectedSystem(null);
              setIsCreating(true);
            }}
            className="sf-button-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Dodaj nowy system
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3 text-[#86868b]">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-[17px]">Ładowanie systemów...</p>
            </div>
          </div>
        ) : systems.length === 0 ? (
          <div className="sf-card p-8 text-center">
            <AlertCircle className="w-8 h-8 text-[#86868b] mx-auto mb-4" />
            <p className="text-[17px] text-[#86868b]">
              {isAdmin ? 'Brak systemów w bazie danych' : 'Nie masz jeszcze dodanych systemów'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {systems.map((system) => (
              <div
                key={system.id}
                className="sf-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[19px] font-semibold text-[#1d1d1f]">
                      {system.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-[15px] text-[#86868b]">
                        {system.vendor}
                      </p>
                      <SystemStatusBadge status={system.status} />
                    </div>
                    {system.review_notes && (
                      <div className="mt-3 p-3 bg-[#F5F5F7] rounded-xl">
                        <p className="text-[15px] text-[#1d1d1f]">
                          <span className="font-medium">Uwagi od administratora:</span><br/>
                          {system.review_notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => setReassignSystem(system)}
                        className="sf-button bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED]"
                      >
                        <UserPlus2 className="w-5 h-5 mr-2" />
                        Zmień właściciela
                      </button>
                    )}
                    {canEditSystem(system) && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedSystem(system);
                            setIsCreating(false);
                          }}
                          className="sf-button bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED]"
                        >
                          <Pencil className="w-5 h-5 mr-2" />
                          Edytuj
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(system)}
                            className="sf-button bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90"
                          >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Usuń
                          </button>
                        )}
                      </>
                    )}
                    {canReviewSystem(system) && (
                      <button
                        onClick={() => setReviewSystem(system)}
                        className="sf-button bg-[#34C759] text-white hover:bg-[#34C759]/90"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Przejrzyj zmiany
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(selectedSystem || isCreating) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-6">
                  {isCreating ? 'Dodaj nowy system' : 'Edytuj system'}
                </h2>
                <SystemForm
                  system={selectedSystem}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  isSaving={isSaving}
                  isCreating={isCreating}
                />
              </div>
            </div>
          </div>
        )}

        {reviewSystem && (
          <ReviewModal
            isOpen={true}
            onClose={() => setReviewSystem(null)}
            system={reviewSystem}
            onReviewComplete={loadSystems}
          />
        )}

        {reassignSystem && (
          <ReassignOwnerModal
            isOpen={true}
            onClose={() => setReassignSystem(null)}
            systemId={reassignSystem.id}
            currentOwner={reassignSystem.created_by}
            onSuccess={loadSystems}
          />
        )}
      </div>
    </div>
  );
};