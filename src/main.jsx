import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from './utils/supabaseClient.js';  
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App supabase={supabase} />
  </StrictMode>,
)
