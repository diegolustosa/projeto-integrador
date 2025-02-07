import { supabase } from '../utils/supabaseClient';  // Certifique-se de importar o cliente do Supabase

const concluirProcesso = async (idCaixa) => {
  try {
    // Atualiza o status da caixa para "Concluído"
    const { data, error } = await supabase
      .from('caixas') // Tabela onde as caixas são armazenadas
      .update({ status: 'Concluído' }) // Atualiza o status da caixa
      .eq('id_caixas', idCaixa); // Condição para buscar a caixa pelo ID

    if (error) {
      throw new Error(error.message);
    }

    alert('Processo de carregamento finalizado e registrado!');
  } catch (error) {
    console.error('Erro ao finalizar o processo:', error);
    alert('Erro ao finalizar o processo.');
  }
};
