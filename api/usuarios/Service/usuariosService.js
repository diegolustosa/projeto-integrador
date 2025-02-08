import bcrypt from 'bcryptjs';  // Importando bcryptjs
import jwt from 'jsonwebtoken';  // Importando jsonwebtoken
import { supabase } from '../supabaseClient';  // Importando instância do Supabase
import dotenv from 'dotenv';

dotenv.config();

async function sendConfirmationEmail(email) {
  // Criando o transporter com as credenciais do Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail de envio
      pass: process.env.EMAIL_PASS, // Senha ou App Password
    },
  });

  // Gera o link de confirmação com o token JWT assinado
  const linkDeConfirmacao = `https://projetointegrador2025.com/confirmar/${jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Remetente
    to: email,  // Destinatário
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
}

export async function cadastrarUsuario(usuario, email, senha) {
  if (!usuario || !email || !senha) {
    throw new Error("Usuário, e-mail e senha são obrigatórios");
  }

  // Verificando se o usuário já existe
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

  // Inserindo o novo usuário
  const { data, insertError } = await supabase
    .from('usuarios')
    .insert([{ usuario, email, senha: hashedPassword, eh_verificado: false }]);

  if (insertError) {
    throw new Error(`Erro ao cadastrar usuário: ${insertError.message}`);
  }

  // Enviando e-mail de confirmação
  await sendConfirmationEmail(email);

  return { msg: 'Usuário cadastrado com sucesso. Verifique seu e-mail para ativação.' };
}

export async function confirmarEmailService(token) {
  try {
    // Decodifica o token JWT
    const decoded = jwt.verify(token, 'segredo');  // Aqui 'segredo' é a chave para verificar o token
    const email = decoded.email;  // O e-mail do usuário é parte do payload do token

    // Verifica se o usuário existe no banco
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new Error('Usuário não encontrado');
    }

    // Atualiza o status de verificação do usuário para true
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ eh_verificado: true })
      .eq('email', email);

    if (updateError) {
      throw new Error(`Erro ao verificar usuário: ${updateError.message}`);
    }

    return 'E-mail confirmado com sucesso!';
  } catch (err) {
    throw new Error('Token inválido ou expirado');
  }
}


export async function login(usuario, senha) {
  if (!usuario || !senha) {
    throw new Error("Usuário e senha são obrigatórios");
  }

  // Consultando o banco de dados para verificar se o usuário existe
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', usuario)  // Comparando com o campo 'email' do banco
    .single();

  if (error || !data) {
    throw new Error("Usuário não encontrado");
  }

  // Comparando a senha fornecida com a senha armazenada (usando bcrypt)
  const isMatch = await bcrypt.compare(senha, data.senha);
  if (!isMatch) {
    throw new Error("Senha incorreta");
  }

  // Gerando o token JWT se as credenciais estiverem corretas
  const token = jwt.sign({ id: data.id_usuarios }, "segredo", { expiresIn: '1h' });

  return token;
}

export async function atualizarUsuario(id, usuario, email) {
  try {
    // Atualizando usuário no banco de dados
    const { data, error } = await supabase
      .from('usuarios')
      .update({ usuario, email })
      .eq('id_usuarios', id);

    if (error) {
      throw new Error('Erro ao atualizar usuário');
    }

    return data;  // Retornando os dados do usuário atualizado
  } catch (err) {
    throw new Error(`Erro ao atualizar usuário: ${err.message}`);
  }
}


export async function obterUsuarios() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*'); // Obtendo todos os usuários

    if (error) {
      throw new Error(error.message);  // Lançando erro caso haja algum
    }

    return data; // Retornando os dados
  } catch (err) {
    throw new Error(`Erro ao carregar lista de usuários: ${err.message}`);
  }
}


export async function deletarUsuario(id) {
  try {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id_usuarios', id); // Deletando o usuário pelo ID

    if (error) {
      throw new Error(error.message);  // Lançando erro caso haja algum
    }

    return { message: 'Usuário deletado com sucesso' }; // Retornando mensagem de sucesso
  } catch (err) {
    throw new Error(`Erro ao deletar usuário: ${err.message}`); // Lançando erro
  }
}

export async function resetPassword(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `https://projeto-integrador-seven-eta.vercel.app/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de Senha',
    text: `Clique no link para redefinir sua senha: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail de recuperação enviado');
  } catch (error) {
    console.error('Erro ao enviar e-mail de recuperação:', error);
    throw new Error("Erro ao enviar o e-mail de recuperação");
  }
}


