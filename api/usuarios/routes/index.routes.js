const express = ("express");           
const usuariosRoute = ("./usuarios.router.js");  

const routes = express.Router();


routes.use('/usuarios', usuariosRoute);

module.exports = routes;  
