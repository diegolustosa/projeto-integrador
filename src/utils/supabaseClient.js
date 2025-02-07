import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();  

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
