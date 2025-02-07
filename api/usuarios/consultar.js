import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      
      const { data, error } = await supabase
        .from('usuarios')
        .select('*'); 

      if (error) {
        throw error;
      }

      
      res.status(200).send(data);
    } catch (error) {
      
      res.status(500).send({ msg: `Erro ao carregar lista de usuários: ${error.message}` });
    }
  } else {
    res.status(405).send({ msg: 'Método não permitido' });
  }
}
