import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';

type DbProfile = {
  id?: string;
  user_name?: string | null;
  updated_at?: Date;
};

const updateProfile = async (updates: DbProfile) => {
  const { error } = await supabase.from('profiles').upsert(updates, {
    returning: 'minimal',
  });
  if (error) throw error;
};

export const useUpdateUserSettings = (updates: DbProfile) => {
  const queryClient = useQueryClient();
  console.log('useUpdateUserSettings render');
  return useMutation(() => updateProfile(updates), {
    onSuccess: () => {
      queryClient.refetchQueries('username');
    },
  });
};
