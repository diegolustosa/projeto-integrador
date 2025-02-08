import { supabase } from '../utils/supabaseClient';  

const concluirProcesso = async (idCaixa) => {
  try {
    
    const { data, error } = await supabase
      .from('caixas') 
      .update({ status: 'Concluído' }) 
      .eq('id_caixas', idCaixa); 

    if (error) {
      throw new Error(error.message);
    }

    alert('Processo de carregamento finalizado e registrado!');
  } catch (error) {
    console.error('Erro ao finalizar o processo:', error);
    alert('Erro ao finalizar o processo.');
  }
};
