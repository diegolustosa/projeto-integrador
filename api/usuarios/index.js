const express = require("express");
const usuariosRoute = require("./routes/usuarios.router.js");
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json());


app.use('/api/usuarios', usuariosRoute);


app.use((req, res) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
