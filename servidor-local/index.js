const express = require('express');
const fetch = require('node-fetch');  
const SerialPort = require('serialport');  
const Readline = require('@serialport/parser-readline');  
const app = express();

const port = new SerialPort('/dev/COM5', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on('open', () => {
  console.log('Conectado ao LoRa');
});

async function sendDataToAPI(data) {
  try {
    const response = await fetch('https://projetointegrador2025.com/api/consultar-caixas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('Resposta da API:', responseData);
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

parser.on('data', (data) => {
  console.log('Dados recebidos via LoRa:', data);
  
  const dadosArduino = parseLoRaData(data);

  if (dadosArduino) {
    sendDataToAPI(dadosArduino);  
  }
});

function parseLoRaData(data) {
  const [status, tempo_carregamento, id_caixa] = data.split(',');

  if (!status || isNaN(tempo_carregamento) || isNaN(id_caixa)) {
    console.error('Dados inválidos:', data);
    return null;  
  }

  return {
    status,
    tempo_carregamento: parseInt(tempo_carregamento),
    id_caixa: parseInt(id_caixa),
    data_registro: new Date().toISOString(),
  };
}

app.get('/', (req, res) => {
  res.send('Servidor Local de LoRa');
});

app.listen(3000, () => {
  console.log('Servidor local rodando na porta 3000');
});
