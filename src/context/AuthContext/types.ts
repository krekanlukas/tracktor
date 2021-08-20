import { User } from '@supabase/gotrue-js/src/lib/types';
import { Provider, Session } from '@supabase/supabase-js';

export type AuthUser = User | null | undefined;

export type AuthValue = {
  user: AuthUser;
  signIn: (data: any) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: Error | null;
    data: Session | null;
  }>;
  signOut: () => Promise<{
    error: Error | null;
  }>;
  signUp: (data: any) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: Session | User | null;
  }>;
};
