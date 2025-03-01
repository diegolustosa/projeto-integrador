import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [tempoCarregamento, setTempoCarregamento] = useState(null);
  const [caixasDia, setCaixasDia] = useState(0);
  const [caixasSemana, setCaixasSemana] = useState(0);
  const [statusCaixa, setStatusCaixa] = useState('Em Progresso');
  const [nomeUsuario, setNomeUsuario] = useState('');

  // Função para enviar os dados para a API
  const sendDataToAPI = async () => {
    try {
      const dadosAPI = {
        status: statusCaixa,
        tempo_carregamento: tempoCarregamento,
        id_caixa: 1, // Exemplo
        data_registro: new Date().toISOString(),
      };

      const response = await fetch('projeto-integrador-seven-eta.vercel.app/api/consultar-caixas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAPI),
      });

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  // Hook para carregar os dados da API ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://projeto-integrador-1-i8dx.onrender.com/api/usuarios/consultar-caixas');  // Ajuste aqui
        const data = await response.json();
        setTempoCarregamento(data.tempo_carregamento);
        setCaixasDia(data.caixasNoDia);
        setCaixasSemana(data.caixasNaSemana);

        const user = { email: 'usuario@example.com' };
        setNomeUsuario(user.email || 'Usuário Exemplo');
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
          <div className="overlay">
            <div class="card-image-wrapper">
            <div className="mt-4">
                  <div className="info mb-3">
                    {/* Informações sobre o tempo de carregamento */}
                    <ul>
                      <strong><p>TEMPO DE CARREGAMENTO DA CAIXA</p></strong>
                      {tempoCarregamento && !isNaN(tempoCarregamento) ? (
                        <li>Tempo total: {tempoCarregamento} minutos</li>
                      ) : (
                        <li>Aguardando dados para tempo de carregamento.</li>
                      )}
                    </ul>
                  </div>

                  
                  <div className="info mb-4">
                    {/* Informações sobre as caixas */}
                    <h5>Caixas Carregadas</h5>
                    <p>Hoje: {caixasDia}</p>
                    <p>Esta Semana: {caixasSemana}</p>
                  </div>

                  
                  <div className="status mb-4">
                    <h4>Status da Caixa Atual</h4>
                    <div>
                      {/* Status da caixa atual */}
                      {statusCaixa}
                    </div>
                  </div>

                  {/* Botão para enviar os dados para a API */}
                  <div className="buttonApi">
                    <button onClick={sendDataToAPI}>
                      Enviar Dados para a API
                    </button>
                  </div>
                </div>
              <div className='card-image'>
              </div>
            </div>
          </div>
  );
};

export default Dashboard;
