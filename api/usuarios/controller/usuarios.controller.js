const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");  
const express = require("express");
const routes = express.Router();
const supabase = require("../supabaseClient");  
const dotenv = require("dotenv");

dotenv.config();  

module.exports = ({
  cadastrarController: async (req, res) => {
    const { usuario, email, senha } = req.body;

    try {
      // Verificando se os dados necessários foram fornecidos
      if (!usuario || !email || !senha) {
        throw new Error("Usuário, e-mail e senha são obrigatórios");
      }

      // Verificando se o usuário já existe no banco
      const { data: userExists, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

      if (userExists) {
        throw new Error("Este e-mail já está cadastrado");
      }

      // Criptografando a senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);

      // Inserindo o novo usuário no banco de dados
      const { data, insertError } = await supabase
        .from('usuarios')
        .insert([{ usuario, email, senha: hashedPassword, eh_verificado: false }]);

      if (insertError) {
        throw new Error(`Erro ao cadastrar usuário: ${insertError.message}`);
      }

      // Enviando e-mail de confirmação para o usuário
      await sendConfirmationEmail(email);

      // Retornando uma resposta de sucesso
      res.status(201).send({ msg: 'Usuário cadastrado com sucesso. Verifique seu e-mail para ativação.' });
    } catch (err) {
      // Tratando erros
      res.status(500).send({ msg: err.message });
    }
  },

  confirmarEmailController: async (req, res) => {
    const { token } = req.params;

    try {
      await confirmarEmailService(token);
      return res.status(200).json({ msg: 'E-mail confirmado com sucesso! Sua conta foi ativada.' });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  sendConfirmationEmail: async (email) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const linkDeConfirmacao = `https://projetointegrador2025.com/confirmar/${jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmação de Cadastro',
      text: `Por favor, clique no link para confirmar seu cadastro: ${linkDeConfirmacao}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('E-mail de confirmação enviado');
    } catch (error) {
      console.error("Erro ao enviar e-mail de confirmação:", error);
      throw new Error('Erro ao enviar e-mail de confirmação');
    }
  },

  loginController: (req, res) => {
    if (req.method === 'POST') {
      const { usuario, senha } = req.body;  // Recebe 'usuario' e 'senha' do corpo da requisição
  
      // Verifica se os dados necessários foram fornecidos
      if (!usuario || !senha) {
        return res.status(400).json({ msg: 'Usuário e senha são obrigatórios' });
      }
  
      // Realiza a autenticação com Supabase
      supabase.auth.signInWithPassword({
        email: usuario,  // 'usuario' como 'email' para o Supabase
        password: senha,
      }).then(({ data, error }) => {
        if (error) {
          return res.status(401).json({ msg: 'Credenciais inválidas' });
        }
  
        // Se a autenticação for bem-sucedida
        return res.status(200).json({
          msg: 'Login realizado com sucesso',
          user: {
            id: data.user.id,
            email: data.user.email,  // Retorna o 'email' (o campo 'usuario')
          }
        });
      }).catch((err) => {
        // Caso ocorra algum erro inesperado
        return res.status(500).json({ msg: 'Erro ao tentar fazer login', error: err.message });
      });
    } else {
      // Se o método não for POST, retorna erro 405 (Método Não Permitido)
      res.status(405).json({ msg: 'Método não permitido' });
    }
  },

  atualizarController: async (req, res) => {
    if (req.method === 'PUT') {
      const { id } = req.query;
      const { usuario, email } = req.body;

      if (!usuario || !email) {
        return res.status(400).json({ msg: 'Usuário e email são obrigatórios' });
      }

      try {
        const data = await atualizarUsuario(id, usuario, email);
        res.status(200).json({ msg: 'Usuário atualizado com sucesso', data });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(405).json({ msg: 'Método não permitido' });
    }
  },

  consultarController: async (req, res) => {
    if (req.method === 'GET') {
      try {
        const usuarios = await obterUsuarios();
        res.status(200).send(usuarios);
      } catch (error) {
        res.status(500).send({ msg: `Erro ao carregar lista de usuários: ${error.message}` });
      }
    } else {
      res.status(405).send({ msg: 'Método não permitido' });
    }
  },

  deletarController: async (req, res) => {
    if (req.method === 'DELETE') {
      const { id } = req.query;

      // Verificando se o ID foi fornecido
      if (!id) {
        return res.status(400).json({ error: 'ID do usuário é necessário' });
      }

      try {
        // Deletando o usuário no banco de dados
        const { error } = await supabase
          .from('usuarios')
          .delete()
          .eq('id_usuarios', id); // Deletando o usuário pelo ID

        if (error) {
          throw new Error(error.message); // Lançando erro caso haja algum
        }

        // Retornando a resposta de sucesso
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
      } catch (err) {
        // Tratamento de erro
        return res.status(500).json({ error: err.message });
      }
    } else {
      // Caso o método não seja DELETE
      return res.status(405).json({ message: 'Método não permitido' });
    }
  },

  resetPasswordController: async (req, res) => {
    if (req.method === 'POST') {
      const { email } = req.body;  // Pegando o e-mail do corpo da requisição

      // Verifica se o e-mail foi fornecido
      if (!email) {
        return res.status(400).json({ msg: 'E-mail é obrigatório' });  // Retorna erro se o e-mail não for fornecido
      }

      try {
        await resetPassword(email);
        res.status(200).json({ msg: 'E-mail de redefinição de senha enviado com sucesso!' });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    } else {
      res.status(405).json({ msg: 'Método não permitido' });
    }
  }
});
