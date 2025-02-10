const dotenv = require("dotenv");
const {createClient} = require("@supabase/supabase-js");

dotenv.config();  

const supaBaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supaBaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_KEY não estão definidos no .env');
}

const supabase = createClient(supaBaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

module.exports = supabase;
