import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';  

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();

    try {
      
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) {
        setMensagem(error.message);  
      } else {
        setMensagem('Instruções para recuperação de senha enviadas ao seu e-mail.');
        navigate('/'); 
      }
    } catch (error) {
      console.error('Erro ao recuperar a senha:', error);
      setMensagem('Erro ao tentar recuperar a senha.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Recuperação de Senha</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
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
      <p><a href="/">Voltar para Login</a></p>
    </div>
  );
};

export default RecuperarSenha;
