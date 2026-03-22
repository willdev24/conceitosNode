const routerAdmin = require('express').Router();
const { atualizarTodos, deletarTodos } = require('../controller/adminCadastro');    

// PUT
routerAdmin.put('/', atualizarTodos);

// DELETE
routerAdmin.delete('/', deletarTodos); 

module.exports = routerAdmin;
