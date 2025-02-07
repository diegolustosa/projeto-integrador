import React from 'react';

const Deletar = ({ id }) => {
  // Função para deletar o usuário
  const deletarUsuario = async () => {
    try {
      // Chama a API para deletar o usuário
      const response = await fetch(`/api/deletar-usuario?id=${id}`, {
        method: 'DELETE',  // A requisição será do tipo DELETE
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);  // Exibe a mensagem de sucesso
      } else {
        alert(data.error || 'Erro ao deletar o usuário');  // Exibe mensagem de erro
      }

      // Aqui você pode redirecionar o usuário ou executar outra ação após a exclusão
      // Por exemplo: history.push('/dashboard');
      
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
