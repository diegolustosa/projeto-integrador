import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Cadastrar from './Components/Cadastrar';
import RecuperarSenha from './Components/RecuperarSenha';
import Deletar from './Components/Deletar';
import Dashboard from './Components/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/deletar" element={<Deletar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
