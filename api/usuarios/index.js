import { cadastrarController } from './controller/usuariosController';
import { loginController } from './controller/usuariosController';
import { atualizarController } from './controller/usuariosController';
import { consultarController, resetPasswordController} from './controller/usuarios.controller';
import { deletarController} from './controller/usuarios.controller';
import { resetPasswordController } from './controller/usuarios.controller';

import { caixasController } from './controller/caixas.controller';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.url === 'api/usuarios/cadastrar') {
    return cadastrarController(req, res); 
  }
  
  if (req.method === 'POST' && req.url === 'api/usuarios/login') {
    return loginController(req, res); 
  }

  if (req.method === 'POST' && req.url === 'api/usuarios/esqueci-senha') {
    return resetPasswordController(req, res); 
  }

  if (req.method === 'PUT' && req.url === 'api/usuarios/atualizar/:id([0-9]+') {
    return atualizarController(req, res); 
  }

  if(req.method === 'GET' && req.url === 'api/usuarios/consultar') {
    return consultarController(req,res);
  }

  if(req.method === 'DELETE' && req.url === 'api/usuarios/deletar/:id([0-9]+') {
    return deletarController(req,res);
  }

  if(req.method === 'POST' && req.url === 'api/usuarios/consultar-caixas') {
    return caixasController(req,res);
  }

  return res.status(405).json({ msg: 'Método não permitido' }); 
}
