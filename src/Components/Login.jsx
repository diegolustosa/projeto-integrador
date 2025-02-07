import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState(''); 
  const navigate = useNavigate();

  
  const API_URL = '/api/usuarios/login'; 

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const dados = { usuario: username, senha: password };
    console.log(dados);

    try {
     
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();

      if (response.ok) {
        
        navigate('/dashboard');
      } else {
       
        setMensagem(result.msg || 'Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMensagem('Erro ao tentar fazer login.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
      <p><a href="/recuperar-senha">Esqueci minha senha</a></p> {/* Link para recuperação de senha */}
    </div>
  );
};

export default Login;
