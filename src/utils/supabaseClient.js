import { createClient } from '@supabase/supabase-js';

const APIUrl = import.meta.env.VITE_API_URL;
const supabaseUrl = import.meta.env.VITE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, APIUrl);
