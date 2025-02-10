const confirmarEmailController = require("../controller/usuariosController"); 

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    
    return confirmarEmailController(req, res);  
  }

  // Se o método não for GET, retorna erro
  return res.status(405).json({ msg: 'Método não permitido' });
}
