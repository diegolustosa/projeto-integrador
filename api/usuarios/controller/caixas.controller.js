import { caixasService } from '../services/caixasService'; // Importando o serviço para salvar o histórico

// Controller para lidar com a requisição POST para salvar o histórico de tempos
export default async function caixasController(req, res) {
    if (req.method === 'POST') {
      try {
        // Extraindo dados do corpo da requisição
        const { status, tempo_carregamento, id_caixa, data_registro } = req.body;
  
        // Verificando se todos os dados necessários estão presentes
        if (!status || !tempo_carregamento || !id_caixa || !data_registro) {
          return res.status(400).json({ error: 'Dados inválidos' });
        }
  
        // Chama o service para salvar os dados no banco
        await caixasService({ status, tempo_carregamento, id_caixa, data_registro });
  
        // Retorna uma resposta de sucesso
        return res.status(200).json({ message: 'Dados recebidos e salvos com sucesso!' });
      } catch (error) {
        console.error(error);
        // Se houver erro, retorna uma resposta de erro
        return res.status(500).json({ error: 'Erro no servidor' });
      }
    } else {
      // Se o método HTTP não for POST, retorna um erro 405
      return res.status(405).json({ message: 'Método não permitido' });
    }
  }