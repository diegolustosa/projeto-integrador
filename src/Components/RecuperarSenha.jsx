import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { supabase } from '../utils/supabaseClient';  

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setMensagem(''); // Limpar mensagem anterior

    // Verificar se o e-mail tem o formato válido
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setMensagem('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);  // Alteração aqui

      if (error) {
        setMensagem(`Erro: ${error.message}`);  
      } else {
        setMensagem('Instruções para recuperação de senha enviadas ao seu e-mail.');
        navigate('/');  // Redireciona para a página de login
      }
    } catch (error) {
      console.error('Erro ao recuperar a senha:', error);
      setMensagem('Erro ao tentar recuperar a senha.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Recuperação de Senha</h2>
      {mensagem && <div className={`alert ${mensagem.includes('Erro') ? 'alert-error' : 'alert-info'}`}>{mensagem}</div>}
      <form onSubmit={handleRecuperarSenha}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar instruções</button>
      </form>
      <p><Link to="/">Voltar para Login</Link></p> 
    </div>
  );
};

export default RecuperarSenha;
