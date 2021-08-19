import { useQuery } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const fetchRows = async (userId: string | undefined, table: string) => {
  const { data, error } = await supabase.from(table).select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const useFetchRows = (table: string) => {
  const { user } = useAuth();
  return useQuery(table, () => fetchRows(user?.id, table));
};
