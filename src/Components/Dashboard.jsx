import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Para navegação entre páginas
import './Dashboard.css';  // Certifique-se de que o caminho do CSS está correto

const Dashboard = () => {
  const [tempoCarregamento, setTempoCarregamento] = useState(0);
  const [caixasDia, setCaixasDia] = useState(0);
  const [caixasSemana, setCaixasSemana] = useState(0);
  const [statusCaixa, setStatusCaixa] = useState('Em Progresso');

  useEffect(() => {
    const fetchData = async () => {
      setTempoCarregamento(20); // Exemplo de valor
      setCaixasDia(50);         // Exemplo de valor
      setCaixasSemana(200);     // Exemplo de valor
      setStatusCaixa('Concluído'); // Exemplo de status
    };

    fetchData();
  }, []);  // O array vazio indica que o fetch será feito apenas na montagem do componente

  return (
    <div className="dashboard">
      <div className="box">
        <div className="box1">Caixas dia: {caixasDia}</div>
        <div className="box2">Caixas semana: {caixasSemana}</div>
        <div className="box3">Caixas mês: {/* lógica para o mês */}</div>
        <div className="status">Status do processamento de caixa: {statusCaixa}</div>
        <div className="comando">Parar motores e caixa!</div>
      </div>

      <Link to="/expedicao" className="expedicao-link" style={{color:'white',
                fontSize: '2rem',
                fontFamily: 'Source Code Pro, monospace',
                fontWeight: 800,}}>
        Ir para a Expedição <i className="fa fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default Dashboard;
