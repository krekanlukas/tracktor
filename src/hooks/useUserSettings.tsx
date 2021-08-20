import { useQuery } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const fetchUsername = async (userId: string | undefined) => {
  const { data, error, status } = await supabase
    .from('profiles')
    .select('user_name')
    .eq('id', userId)
    .single();
  if (error && status !== 406) throw error;
  return data;
};

export const useUserSettings = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery('username', () => fetchUsername(user?.id));
  const username = data?.user_name ?? null;

  console.log('useUserSettings render');
  return { username, isLoading, error };
};
