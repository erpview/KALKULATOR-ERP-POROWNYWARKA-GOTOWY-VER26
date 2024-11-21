import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isEditor: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isEditor: false,
  signIn: async () => {},
  signOut: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUserRole = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      setIsEditor(false);
      setLoading(false);
      return;
    }

    try {
      // First check app_metadata for role
      const role = user.app_metadata?.role;
      if (role === 'admin' || role === 'service_role') {
        setIsAdmin(true);
        setIsEditor(false);
        setLoading(false);
        return;
      }

      if (role === 'editor') {
        setIsAdmin(false);
        setIsEditor(true);
        setLoading(false);
        return;
      }

      // Then check user_management table
      const { data, error } = await supabase
        .from('user_management')
        .select('role, is_active')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data && data.is_active) {
        setIsAdmin(data.role === 'admin');
        setIsEditor(data.role === 'editor');
      } else {
        setIsAdmin(false);
        setIsEditor(false);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsAdmin(false);
      setIsEditor(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      checkUserRole(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      checkUserRole(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data?.user) {
      // Check role in app_metadata first
      const role = data.user.app_metadata?.role;
      if (role === 'admin' || role === 'service_role') {
        navigate('/admin/systemy');
        toast.success('Zalogowano pomyślnie');
        return;
      }

      if (role === 'editor') {
        navigate('/admin/systemy');
        toast.success('Zalogowano pomyślnie');
        return;
      }

      // Then check user_management table
      const { data: roleData, error: roleError } = await supabase
        .from('user_management')
        .select('role, is_active')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData || !roleData.is_active) {
        await supabase.auth.signOut();
        throw new Error('Konto jest nieaktywne');
      }

      if (!['admin', 'editor'].includes(roleData.role)) {
        await supabase.auth.signOut();
        throw new Error('Brak uprawnień');
      }

      navigate('/admin/systemy');
      toast.success('Zalogowano pomyślnie');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success('Wylogowano pomyślnie');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Błąd podczas wylogowywania');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isEditor, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);