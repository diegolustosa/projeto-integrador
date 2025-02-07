import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { status, tempo_carregamento, id_caixa, data_registro } = req.body;

      
      if (!status || !tempo_carregamento || !id_caixa || !data_registro) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }

      
      const { data, error } = await supabase
        .from('historico_tempos')
        .insert([
          {
            status,
            tempo_carregamento,
            id_caixa,
            data_registro
          }
        ]);

      if (error) {
        throw error;
      }

      
      return res.status(200).json({ message: 'Dados recebidos e salvos com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
