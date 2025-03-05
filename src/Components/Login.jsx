import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import logo from '../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    // A variável loginValue vai ser o email ou username, dependendo do que foi fornecido
    const loginValue = username;  // Se o email estiver presente, ele é usado, caso contrário, o username será usado
    console.log('Login Value:', loginValue);
    if (!loginValue || !password) {
        setError('Por favor, preencha o e-mail ou nome de usuário e a senha.');
        return;
    }

    try {
        let emailToUse = loginValue;
        console.log('Login Value:', loginValue);
        // Verifica se o loginValue não é um e-mail e tenta buscar pelo username no banco de dados
        if (!loginValue.includes('@')) {  // Se o loginValue não é um e-mail (não contém "@")
            const { data, error } = await supabase
                .from('usuarios')  // A tabela de usuários onde você armazena os dados
                .select('email')  // Pegamos o email do usuário
                .eq('usuario', loginValue)  // Verificamos se o campo 'usuario' é igual ao username fornecido
                .single();  // Espera um único resultado (um usuário por vez)

            if (error || !data) {
                setError('Usuário não encontrado.');
                return;
            }

            emailToUse = data.email;  // Substituímos o loginValue pelo e-mail encontrado no banco de dados
        }

        // Fazemos o login com o e-mail
        const { user, authError } = await supabase.auth.signInWithPassword({
            email: emailToUse,  // Se for username, já substituímos por e-mail; se for e-mail, ele vai diretamente
            password,
        });

        if (authError) {
            setError(authError.message);
            return;
        }

        // Se o login for bem-sucedido, redirecionamos para a dashboard (ou qualquer outra página desejada)
        setError('');
        navigate('/dashboard');  // Ou qualquer outra página que você deseja redirecionar após o login

    } catch (error) {
        setError('Erro ao tentar fazer login.');
        console.error('Erro ao fazer login:', error);
        alert("Usuario não encontrado");
    }
};

  return (
    <div className="auth-container">
      <img src={logo} alt="logo" className='logo' />
      <h4 className='nomeMarca'> Boxlvl</h4>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Usuário ou email</label>
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
        <button className='buttonAuth' type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link></p>
      <p><Link to="/recuperar-senha">Esqueci minha senha</Link></p>
    </div>
  );
};

export default Login;
