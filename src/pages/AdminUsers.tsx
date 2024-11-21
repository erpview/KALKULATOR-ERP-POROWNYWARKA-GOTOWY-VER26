import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, AlertCircle, UserCog } from 'lucide-react';
import { adminSupabase, supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CreateUserModal } from '../components/CreateUserModal';
import { UserRoleBadge } from '../components/UserRoleBadge';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  is_active: boolean;
  created_at: string;
  user_id: string;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { user: currentUser } = useAuth();

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Use adminSupabase for fetching users to bypass RLS
      const { data, error } = await adminSupabase
        .from('user_management')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Nie udało się załadować użytkowników');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      return;
    }

    try {
      // First deactivate the user in user_management
      const { error: deactivateError } = await adminSupabase
        .from('user_management')
        .update({ is_active: false })
        .eq('user_id', userId);

      if (deactivateError) throw deactivateError;

      // Then delete the user management record
      const { error: deleteManagementError } = await adminSupabase
        .from('user_management')
        .delete()
        .eq('user_id', userId);

      if (deleteManagementError) throw deleteManagementError;

      // Finally delete the auth user using admin client
      const { error: deleteAuthError } = await adminSupabase.auth.admin.deleteUser(
        userId,
        true // Set to true to force delete
      );

      if (deleteAuthError) {
        console.error('Error deleting auth user:', deleteAuthError);
        // Even if auth user deletion fails, we continue since the user is deactivated
      }

      toast.success('Użytkownik został usunięty');
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Nie udało się usunąć użytkownika');
      // Reload users to show current state
      await loadUsers();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <UserCog className="w-8 h-8 text-[#2c3b67]" />
            <h1 className="text-[32px] font-semibold text-[#1d1d1f]">
              Zarządzanie użytkownikami
            </h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="sf-button-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Dodaj użytkownika
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3 text-[#86868b]">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-[17px]">Ładowanie użytkowników...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="sf-card p-8 text-center">
            <AlertCircle className="w-8 h-8 text-[#86868b] mx-auto mb-4" />
            <p className="text-[17px] text-[#86868b]">
              Brak użytkowników w systemie
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="sf-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[19px] font-semibold text-[#1d1d1f]">
                      {user.email}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <UserRoleBadge role={user.role} />
                      {!user.is_active && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Nieaktywny
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.user_id !== currentUser?.id && (
                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="sf-button bg-[#FF3B30] text-white hover:bg-[#FF3B30]/90"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Usuń
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateUserModal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          onSuccess={loadUsers}
        />
      </div>
    </div>
  );
};