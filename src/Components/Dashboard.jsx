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
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="overlay">
            <div class="card-image-wrapper">
            <div className="mt-4">
                  {/* Informações sobre o tempo de carregamento */}
                  <div className="info mb-3">
                    <h4>Tempo de Carregamento da Caixa</h4>
                    <ul className="list-unstyled">
                      {tempoCarregamento && !isNaN(tempoCarregamento) ? (
                        <li>Tempo total: {tempoCarregamento} minutos</li>
                      ) : (
                        <li>Aguardando dados para tempo de carregamento.</li>
                      )}
                    </ul>
                  </div>

                  {/* Informações sobre as caixas */}
                  <div className="info mb-3">
                    <h4>Caixas Carregadas</h4>
                    <p>Hoje: {caixasDia}</p>
                    <p>Esta Semana: {caixasSemana}</p>
                  </div>

                  {/* Status da caixa atual */}
                  <div className="status mb-4">
                    <h4>Status da Caixa Atual</h4>
                    <div className={`status-indicator p-2 rounded text-white ${statusCaixa.toLowerCase().replace(' ', '-')}`}>
                      {statusCaixa}
                    </div>
                  </div>

                  {/* Botão para enviar os dados para a API */}
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={sendDataToAPI}>
                      Enviar Dados para a API
                    </button>
                  </div>
                </div>
              <div className='card-image'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
