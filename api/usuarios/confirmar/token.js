const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

module.exports = confirmarEmailService = async (token) => {
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Utilizando o segredo JWT configurado no .env

    // Verificando se o token é válido e contém o e-mail
    if (!decoded || !decoded.email) {
      throw new Error('Token inválido ou expirado.');
    }

    const email = decoded.email;

   
    const { data, error } = await supabase
      .from('usuarios')  
      .update({ eh_verificado: true })  
      .eq('email', email);  

  
    if (error) {
      throw new Error('Erro ao atualizar a verificação do e-mail.');
    }

    return data;  
  } catch (err) {
    throw new Error(`Erro ao confirmar e-mail: ${err.message}`);
  }
};
