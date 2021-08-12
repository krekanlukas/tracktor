import { useEffect, FC, createContext, useState, useContext, useCallback } from 'react';

import { supabase } from '@/config/supabase/supabaseClient';
import { AuthUser, AuthValue } from '@/context/AuthContext';

const AuthContext = createContext<AuthValue | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setUser(session?.user ?? null);
    });

    console.log('AuthProvider mount commit');
    return () => {
      subscription?.data?.unsubscribe();
      console.log('AuthProvider unmount commit');
    };
  }, []);

  const signOut = useCallback(() => {
    return supabase.auth.signOut();
  }, []);

  const signIn = useCallback((data) => {
    return supabase.auth.signIn(data);
  }, []);

  const signUp = useCallback((data) => {
    return supabase.auth.signUp(data);
  }, []);

  const value = {
    user,
    signOut,
    signIn,
    signUp,
  };

  console.log('AuthProvider render', user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }
  return context;
};
