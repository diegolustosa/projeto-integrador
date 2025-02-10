const express = require("express");
const usuariosController = require("../controller/usuarios.controller.js");
const caixasController = require("../controller/caixas.controller.js");

const router = express.Router();

router.post('/cadastrar', (usuariosController.cadastrarController));
router.post('/login', (usuariosController.loginController));
router.get('/confirmar/:token', (usuariosController.confirmarEmailController));
router.post('/recuperar-senha', (usuariosController.resetPasswordController));
router.post('/consultar-caixas', (caixasController.caixasController));
router.get('/', (usuariosController.consultarController));
router.put('/:id([0-9]+)', (usuariosController.atualizarController));
router.delete('/:id([0-9]+)', (usuariosController.deletarController));

module.exports = router;
