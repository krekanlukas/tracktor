import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error('SupaBase url missing.');
if (!supabaseAnonKey) throw new Error('SupaBase url missing.');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
