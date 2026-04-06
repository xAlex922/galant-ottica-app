'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  nome: string;
  cognome: string;
  telefono?: string;
  codice_fiscale?: string;
  indirizzo?: string;
  cap?: string;
  provincia?: string;
  data_nascita?: string;
  ruolo: 'customer' | 'admin' | 'manager' | 'operatore';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  nome: string;
  cognome: string;
  telefono: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (userData && !userError) {
        setUser({
          id: userData.id,
          email: userData.email,
          nome: userData.nome,
          cognome: userData.cognome,
          telefono: userData.telefono,
          codice_fiscale: userData.codice_fiscale,
          indirizzo: userData.indirizzo,
          cap: userData.cap,
          provincia: userData.provincia,
          data_nascita: userData.data_nascita,
          ruolo: userData.ruolo,
        });
        setLoading(false);
        return;
      }

      const { data: clienteData, error: clienteError } = await supabase
        .from('clienti')
        .select('*')
        .eq('auth_user_id', userId)
        .maybeSingle();

      if (clienteData && !clienteError) {
        setUser({
          id: clienteData.id,
          email: clienteData.email || '',
          nome: clienteData.nome,
          cognome: clienteData.cognome || '',
          telefono: clienteData.telefono,
          codice_fiscale: clienteData.codice_fiscale,
          indirizzo: clienteData.indirizzo,
          cap: clienteData.cap,
          provincia: clienteData.provincia,
          data_nascita: clienteData.data_nascita,
          ruolo: 'customer',
        });
        setLoading(false);
        return;
      }

      console.warn('No profile found for user:', userId);
      setUser(null);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Errore durante il login' 
      };
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            nome: registerData.nome,
            cognome: registerData.cognome,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registrazione fallita');

      const { error: clienteError } = await supabase
        .from('clienti')
        .insert({
          auth_user_id: authData.user.id,
          email: registerData.email,
          nome: registerData.nome,
          cognome: registerData.cognome,
          telefono: registerData.telefono,
        });

      if (clienteError) {
        console.error('Error creating cliente:', clienteError);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.message || 'Errore durante la registrazione' 
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
  if (!user) {
    throw new Error('Utente non autenticato');
  }

  try {
    const updateData = {
      nome: data.nome,
      cognome: data.cognome,
      telefono: data.telefono || null,
      codice_fiscale: data.codice_fiscale || null,
      indirizzo: data.indirizzo || null,
      cap: data.cap || null,
      provincia: data.provincia || null,
      data_nascita: data.data_nascita || null,
    };

    if (user.ruolo === 'customer') {
      const { error } = await supabase
        .from('clienti')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Errore durante l\'aggiornamento');
      }
    } else {
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Errore durante l\'aggiornamento');
      }
    }

    // Aggiorna lo stato locale solo dopo il successo
    setUser({ ...user, ...data });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    // Re-throw con messaggio user-friendly
    throw new Error(error.message || 'Errore durante l\'aggiornamento del profilo');
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoading: loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};