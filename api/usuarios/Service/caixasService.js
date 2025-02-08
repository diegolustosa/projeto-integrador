import { supabase } from '../utils/supabaseClient'; // Importando instância do Supabase

// Função para salvar os dados do histórico de tempos
export async function caixasService({ status, tempo_carregamento, id_caixa, data_registro }) {
  try {
    // Inserindo dados na tabela 'historico_tempos'
    const { data, error } = await supabase
      .from('historico_tempos')
      .insert([{ status, tempo_carregamento, id_caixa, data_registro }]);

    if (error) {
      throw new Error(error.message); // Se ocorrer erro, lança a exceção
    }

    return data; // Retorna os dados inseridos
  } catch (err) {
    throw new Error(`Erro ao salvar histórico de tempos: ${err.message}`);
  }
}
