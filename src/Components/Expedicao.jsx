import React, { useState } from 'react';
import './Expedicao.css';
import lixeira from '../assets/lixeira.svg'

const Expedicao = () => {
  const [pallets, setPallets] = useState([
    {
      id: 1,
      highlighted: false,
      produtos: [
        { id: 1, nome: 'Super Lava Louças 5L', quantidade: 70 },
      ],
    },
    {
      id: 2,
      highlighted: false,
      produtos: [
        { id: 2, nome: 'Multiuso Perfumado Lavanda 2L', quantidade: 50 },
      ],
    },
  ]);

  const [novoProduto, setNovoProduto] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addPallet = () => {
    if (novoProduto && novaQuantidade) {
      const novoPallet = {
        id: pallets.length + 1,
        highlighted: false,
        produtos: [{ id: 1, nome: novoProduto, quantidade: parseInt(novaQuantidade) }],
      };
      setPallets([...pallets, novoPallet]);
      setNovoProduto('');
      setNovaQuantidade('');
    } else {
      alert('Por favor, insira um nome de produto e uma quantidade válida.');
    }
  };

  const removePallet = (id) => {
    setPallets(pallets.filter(pallet => pallet.id !== id));
  };

  const highlightPallet = (id) => {
    setPallets(pallets.map(pallet =>
      pallet.id === id
        ? { ...pallet, highlighted: !pallet.highlighted }
        : pallet
    ));
  };

  const handleQuantidadeChange = (palletId, produtoId, value) => {
    if (value >= 0) {
      setPallets(pallets.map(pallet =>
        pallet.id === palletId
          ? {
              ...pallet,
              produtos: pallet.produtos.map(produto =>
                produto.id === produtoId
                  ? { ...produto, quantidade: parseInt(value) }
                  : produto
              ),
            }
          : pallet
      ));
    } else {
      alert('Quantidade não pode ser negativa');
    }
  };

  const filteredPallets = pallets.filter(pallet =>
    pallet.produtos.some(product =>
      product.nome.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="main">
      <div className="expedicao1">
        <div className="container1">
          <h1
            style={{
              color: '#7397df',
              fontFamily: 'Source Code Pro, monospace',
              fontWeight: 800,
            }}
          >
            Expedição
          </h1>

          <input
            className='pesquisaNome'
            type="text"
            placeholder="Pesquisar pelo nome do produto:"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="add-pallet-form">
            <input
              type="text"
              style={{width: '20vw', 
                color: 'black',
                fontFamily: 'Source Code Pro, monospace',
                fontWeight: 800,
              }}
              value={novoProduto}
              onChange={(e) => setNovoProduto(e.target.value)}
              placeholder="Nome do Produto:"
            />
            <input
              type="number"
              value={novaQuantidade}
              style={{ width: '20vw',
                color: 'black',
                fontFamily: 'Source Code Pro, monospace',
                fontWeight: 800,
               }}
              onChange={(e) => {
                const value = e.target.value;
                if (value <= 0) {
                  alert('Quantidade não pode ser menor que zero');
                } else {
                  setNovaQuantidade(value);
                }
              }}
              placeholder="Quantidade:"
            />
            <button
              style={{
                color: 'black',
                fontFamily: 'Source Code Pro, monospace',
                fontWeight: 800,
              }}
              onClick={addPallet}
            >
              Adicionar Pallet
            </button>
          </div>
        </div>
      </div>

      
      <div className="expedicao2">
        <div className="container2">
          {filteredPallets.map((pallet) => (
            <div
              key={pallet.id}
              className={`pallet ${pallet.highlighted ? 'highlighted' : ''}`}
              style={{
                zIndex: pallet.highlighted ? 10 : 1,
              }}
            >
              <h2>Pallet {pallet.id}</h2>
              {pallet.produtos.map((produto) => (
                <div key={produto.id} className="produto">
                  <p>{produto.nome}:</p>
                  <input
                    type="number"
                    value={produto.quantidade}
                    onChange={(e) => handleQuantidadeChange(pallet.id, produto.id, e.target.value)}
                    onBlur={(e) => handleQuantidadeChange(pallet.id, produto.id, e.target.value)} 
                    style={{ width: '5vw' }}
                  />
                </div>
              ))}
              <button  onClick={() => highlightPallet(pallet.id)}>
                {pallet.highlighted ? 'Desmarcar' : 'Destacar'}
              </button>
              <button
                className="remove-btn"
                onClick={() => removePallet(pallet.id)}
              ><img src={lixeira} alt='lixeiraButton' style={{width: '25vw', height: '5vh'}} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expedicao;
