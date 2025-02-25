import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import logo from '../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: username,  
        password: password,
      });

      if (error) {
        setMensagem(error.message || 'Credenciais inválidas');
      } else {
        navigate('/dashboard');  
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMensagem('Erro ao tentar fazer login.');
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="logo" className='logo' />
      <h2> lvl Box</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário (Email)</label>
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
      <p>Não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link></p>
      <p><Link to="/recuperar-senha">Esqueci minha senha</Link></p>
    </div>
  );
};

export default Login;
