import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Cadastro from './Components/Cadastrar';
import RecuperarSenha from './Components/RecuperarSenha';
import Deletar from './Components/Deletar';
import Dashboard from './Components/Dashboard'; 
import Expedicao from './Components/Expedicao';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/deletar" element={<Deletar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expedicao" element={<Expedicao />} />
      </Routes>
    </Router>
  );
}

export default App;
