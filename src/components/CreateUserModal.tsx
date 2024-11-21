import React, { useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { adminSupabase } from '../config/supabase';
import { z } from 'zod';
import toast from 'react-hot-toast';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const userSchema = z.object({
  email: z.string().email('Nieprawidłowy format email'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
  role: z.enum(['admin', 'editor', 'user'])
});

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      userSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Create user in auth.users using admin client
      const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        app_metadata: {
          role: formData.role
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // Create user management record using admin client
      const { error: managementError } = await adminSupabase
        .from('user_management')
        .insert([
          {
            user_id: authData.user.id,
            email: formData.email,
            role: formData.role,
            is_active: true
          }
        ]);

      if (managementError) throw managementError;

      toast.success('Użytkownik został utworzony');
      onSuccess();
      onClose();
      setFormData({ email: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Nie udało się utworzyć użytkownika');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-semibold text-[#1d1d1f]">
              Dodaj nowego użytkownika
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`sf-input w-full ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                Hasło *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`sf-input w-full ${errors.password ? 'border-red-500' : ''}`}
                required
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                Rola *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' | 'user' })}
                className="sf-input w-full"
                required
              >
                <option value="user">Użytkownik</option>
                <option value="editor">Edytor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="sf-button bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED]"
                disabled={isSubmitting}
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="sf-button-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Tworzenie...
                  </>
                ) : (
                  'Utwórz użytkownika'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};