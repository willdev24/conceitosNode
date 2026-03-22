const router = require('express').Router();
const { cadastroget, cadastrarpost, atualizarUm, deletarUm} = require('../controller/cadastro');


// GET
router.get('/', cadastroget);

// POST
router.post('/', cadastrarpost);

// PUT
router.put('/:id', atualizarUm);

// DELETE
router.delete('/:id', deletarUm);

module.exports = router;
