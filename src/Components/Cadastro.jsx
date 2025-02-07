import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; // Importando o cliente do Supabase

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensagem, setMensagem] = useState(''); // Para exibir mensagens de erro ou sucesso
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log("enviando");

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // 1. Cadastrar o usuário com o email e senha usando o Supabase Auth
      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setMensagem(authError.message);
        return;
      }

      // 2. Após o usuário ser registrado, armazenamos informações adicionais (como o nome) na tabela 'usuarios'
      const { data, error: insertError } = await supabase
        .from('usuarios')
        .insert([
          { email, usuario: username, id_usuarios: user.id }, // Criando o usuário na tabela 'usuarios'
        ]);

      if (insertError) {
        setMensagem(insertError.message);
        return;
      }

      setMensagem('Cadastro realizado com sucesso!');
      alert('Cadastro realizado com sucesso!');
      navigate('/');  // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
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
