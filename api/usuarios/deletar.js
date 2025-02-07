import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;  

    if (!id) {
      return res.status(400).json({ error: 'ID do usuário é necessário' });
    }

    try {
     
      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id_usuarios', id);

      if (error) {
        throw new Error(error.message);
      }

      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' }); // Se não for uma requisição DELETE
  }
}
