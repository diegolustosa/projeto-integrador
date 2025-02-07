import { supabase } from './supabaseClient';
export default function handler(req, res) {
    
    if (req.method === 'GET') {
      
      res.status(200).json({
        usuarios: [
          { id: 1, nome: 'João' },
          { id: 2, nome: 'Maria' }
        ]
      });
    } else if (req.method === 'POST') {
     
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
      }
  
     
      res.status(201).json({
        message: `Usuário ${nome} criado com sucesso!`
      });
    } else {
      
      res.status(405).json({ message: 'Método não permitido' });
    }
  }
  