import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();  

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_KEY não estão definidos no .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export default supabase;
