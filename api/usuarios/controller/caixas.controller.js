const express = require("express");
const routes = express.Router();
const supabase = require("../supabaseClient");  


module.exports = ({
  caixasController: async (req, res) => {
    if (req.method === 'POST') {
      const { status, tempo_carregamento, id_caixa, data_registro } = req.body;

      // Verificando se todos os dados necessários foram fornecidos
      if (!status || !tempo_carregamento || !id_caixa || !data_registro) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }

      try {
        // Inserindo dados diretamente no Supabase
        const { data, error } = await supabase
          .from('historico_tempos')  // Tabela onde os dados serão armazenados
          .insert([{ status, tempo_carregamento, id_caixa, data_registro }]);

        // Se ocorrer erro na inserção
        if (error) {
          throw new Error(error.message);
        }

        // Retornando sucesso
        return res.status(200).json({ message: 'Dados recebidos e salvos com sucesso!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
      }
    } else {
      return res.status(405).json({ message: 'Método não permitido' });
    }
  }
});

