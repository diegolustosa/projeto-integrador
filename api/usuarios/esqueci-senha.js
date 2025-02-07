import { supabase } from './supabaseClient';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function sendPasswordResetEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `https://4b6c-177-155-118-73.ngrok-free.app/resetar-senha?token=${resetToken}`;

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
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("E-mail é obrigatório");
    }

    try {
     
      const { data, error } = await supabase
        .from('usuarios')
        .select('email')
        .eq('email', email)
        .single();

      if (error || !data) {
        return res.status(400).send({ msg: "Usuário não encontrado" });
      }

     
      await sendPasswordResetEmail(email);

      res.json({ msg: "Instruções para recuperação de senha enviadas ao seu e-mail." });
    } catch (err) {
      res.status(500).send({ msg: `Erro ao enviar e-mail de recuperação: ${err.message}` });
    }
  } else {
    res.status(405).send({ msg: 'Método não permitido' });
  }
}
