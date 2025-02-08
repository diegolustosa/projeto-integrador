import { cadastrarController } from './controller/usuariosController';
import { loginController } from './controller/usuariosController';
import { atualizarController } from './controller/usuariosController';
import { consultarController, resetPasswordController} from './controller/usuarios.controller';
import { deletarController} from './controller/usuarios.controller';
import { resetPasswordController } from './controller/usuarios.controller';

import { caixasController } from './controller/caixas.controller';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.url === '/cadastrar') {
    return cadastrarController(req, res); // Chama o controller de cadastro
  }
  
  if (req.method === 'POST' && req.url === '/login') {
    return loginController(req, res); // Chama o controller de login
  }

  if (req.method === 'POST' && req.url === '/esqueci-senha') {
    return resetPasswordController(req, res); // Chama o controller de cadastro
  }

  if (req.method === 'PUT' && req.url === '/atualizar/:id([0-9]+') {
    return atualizarController(req, res); // Chama o controller de atualização
  }

  if(req.method === 'GET' && req.url === '/consultar') {
    return consultarController(req,res);
  }

  if(req.method === 'DELETE' && req.url === '/deletar/:id([0-9]+') {
    return deletarController(req,res);
  }

  if(req.method === 'POST' && req.url === '/consultar-caixas') {
    return caixasController(req,res);
  }

  return res.status(405).json({ msg: 'Método não permitido' }); // Caso o método não seja permitido
}
