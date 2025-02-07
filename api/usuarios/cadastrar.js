import supabase from './supabaseClient'; 
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 


async function sendConfirmationEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const linkDeConfirmacao = `https://projetointegrador2025.com/confirmar/${email}`;
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Confirmação de Cadastro',
    text: `Por favor, clique no link para confirmar seu cadastro: ${linkDeConfirmacao}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail de confirmação enviado: ' + info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario, email, senha } = req.body;

    if (!usuario || !email || !senha) {
      return res.status(400).send("Usuário, e-mail e senha são obrigatórios");
    }

    try {
      
      const { data: userExists, error } = await supabase
        .from('usuarios') 
        .select('*')
        .eq('email', email)
        .single();

      if (userExists) {
        return res.status(400).send({ msg: "Este e-mail já está cadastrado" });
      }

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);

      
      const { data, insertError } = await supabase
        .from('usuarios') 
        .insert([{ usuario, email, senha: hashedPassword, eh_verificado: false }]);

      if (insertError) {
        return res.status(500).send({ msg: `Erro ao cadastrar usuário: ${insertError.message}` });
      }

      
      sendConfirmationEmail(email);

      res.status(201).send({ msg: "Usuário cadastrado com sucesso. Verifique seu e-mail para ativação." });
    } catch (err) {
      res.status(500).send({ msg: `Erro ao cadastrar usuário: ${err.message}` });
    }
  } else {
    res.status(405).send({ msg: 'Método não permitido' });
  }
}
