import { login } from '../Service/usuariosService'; // Importando o serviço de login
import { cadastrarUsuario } from '../Service/usuariosService';
import { deletarUsuario } from '../Service/usuariosService'; // Importando o serviço de deletar usuário
import { resetPassword } from '../Service/usuariosService'; // Importando o service para enviar o e-mail de recuperação
import { obterUsuarios } from '../Service/usuariosService';
import { atualizarUsuario } from '../Service/usuariosService';

import dotenv from 'dotenv';

dotenv.config(); 

export default async function cadastrarController(req, res) {
    if (req.method === 'POST') {
      const { usuario, email, senha } = req.body;
  
      // Chamando o serviço de cadastro
      try {
        const response = await cadastrarUsuario(usuario, email, senha);
        res.status(201).send(response);  // Retorna a resposta do serviço
      } catch (err) {
        res.status(500).send({ msg: err.message });  // Retorna erro se houver falha
      }
    } else {
      res.status(405).send({ msg: 'Método não permitido' });  // Caso o método não seja POST
    }
  }

  export const confirmarEmailController = async (req, res, token) => {
    try {
      // Chama o serviço de confirmação de e-mail
      await confirmarEmailService(token);  
      return res.status(200).json({ msg: 'E-mail confirmado com sucesso! Sua conta foi ativada.' });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  export default async function loginController(req, res) {
    if (req.method === 'POST') {
      const { usuario, senha } = req.body;  // Extrai usuário e senha do corpo da requisição
  
      // Verifica se os dados necessários foram enviados
      if (!usuario || !senha) {
        return res.status(400).json({ msg: "Usuário e senha são obrigatórios" });
      }
  
      try {
        // Chama a função de login do serviço passando as credenciais
        const token = await login(usuario, senha);
  
        // Retorna o token gerado se o login for bem-sucedido
        return res.status(200).json({ token });
      } catch (error) {
        // Retorna erro caso algo dê errado
        return res.status(400).json({ msg: error.message });
      }
    } else {
      // Caso não seja um método POST
      return res.status(405).json({ msg: "Método não permitido" });
    }
  }

export default async function atualizarController(req, res) {
    if (req.method === 'PUT') {
      const { id } = req.query;  // Pegando o id da query
      const { usuario, email } = req.body;  // Pegando usuário e email do corpo da requisição
  
      try {
        // Chama o service para realizar a atualização
        const data = await atualizarUsuario(id, usuario, email);
  
        // Retorna a resposta com o sucesso
        res.status(200).json({ msg: "Usuário atualizado com sucesso", data });
      } catch (err) {
        // Se ocorrer um erro, retorna o erro
        res.status(500).json({ msg: err.message });
      }
    } else {
      // Se o método não for PUT, retorna "Método não permitido"
      res.status(405).json({ msg: 'Método não permitido' });
    }
  }
 // Importando o serviço que faz a consulta

export default async function consultarController(req, res) {
  if (req.method === 'GET') {
    try {
      // Chama o serviço para obter a lista de usuários
      const usuarios = await obterUsuarios();
      
      // Retorna os dados dos usuários com status 200
      res.status(200).send(usuarios);
    } catch (error) {
      // Caso haja erro, retorna erro 500
      res.status(500).send({ msg: `Erro ao carregar lista de usuários: ${error.message}` });
    }
  } else {
    // Caso o método não seja GET, retorna "Método não permitido"
    res.status(405).send({ msg: 'Método não permitido' });
  }
}


export default async function deletarController(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Pegando o ID da query string

    if (!id) {
      return res.status(400).json({ error: 'ID do usuário é necessário' }); // Se não passar o ID
    }

    try {
      // Chama o serviço para deletar o usuário
      const response = await deletarUsuario(id);
      
      // Retorna sucesso caso o serviço tenha completado com sucesso
      return res.status(200).json(response);
    } catch (error) {
      // Se ocorrer erro, retorna erro 500
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Se o método não for DELETE, retorna 'Método não permitido'
    res.status(405).json({ message: 'Método não permitido' });
  }
}

export async function resetPasswordController(req, res) {
    if (req.method === 'POST') {
      const { email } = req.body;
  
      try {
        await resetPassword(email);  // Chama a função de resetPassword do service
        res.status(200).json({ msg: "E-mail de redefinição de senha enviado com sucesso!" });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(405).json({ msg: 'Método não permitido' });
    }
  }




