import { confirmarEmailController } from '../controller/usuariosController';  // Importa a função do controller

export default async function handler(req, res) {
  const { token } = req.query;  // Pega o token da URL

  if (req.method === 'GET') {
    // Chama o controller que vai processar a confirmação
    return confirmarEmailController(req, res, token);
  }

  // Se o método não for GET, retorna erro
  return res.status(405).json({ msg: 'Método não permitido' });
}
