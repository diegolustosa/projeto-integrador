const resetPasswordController = require("../controller/usuariosController");  

module.exports = async function handler(req, res) {
  const { token } = req.query;

  if (req.method === 'POST') {
    return resetPasswordController(req, res, token);  
  }

  return res.status(405).json({ msg: 'Método não permitido' });  
}
