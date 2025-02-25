import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; 

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensagem, setMensagem] = useState(''); 
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log("enviando");

    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      
      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setMensagem(authError.message);
        return;
      }

      
      const { data, error: insertError } = await supabase
        .from('usuarios')
        .insert([
          { email, usuario: username, id_usuarios: user.id },
        ]);

      if (insertError) {
        setMensagem(insertError.message);
        return;
      }

      setMensagem('Cadastro realizado com sucesso!');
      alert('Cadastro realizado com sucesso!');
      navigate('/');  
    } catch (error) {
      console.error('Erro ao cadastrar:', error); // Aqui, ta caindo aqui
      setMensagem('Erro ao tentar se cadastrar.');
    }
  };

  return (
    <div className="auth-container cadastro">
      <h2>Cadastro</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleCadastro}>
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <a href="/">Faça login</a></p>
    </div>
  );
};

export default Cadastro;
