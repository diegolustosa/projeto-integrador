import React from 'react';
import { useNavigate } from 'react-router-dom';

const Deletar = ({ id }) => {
  const navigate = useNavigate();

  
  const deletarUsuario = async () => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.');

    if (!confirmacao) {
      return; 
    }

    try {
     
      const response = await fetch(`/deletar/${id}`, {  
        method: 'DELETE',  
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Usuário deletado com sucesso!');
        
        navigate('/dashboard');
      } else {
        alert(data.error || 'Erro ao deletar o usuário');
      }

    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar o usuário');
    }
  };

  return (
    <div>
      <h1>Deletar Usuário</h1>
      {/* Botão de exclusão */}
      <button onClick={deletarUsuario}>Deletar Usuário</button>
    </div>
  );
};

export default Deletar;
