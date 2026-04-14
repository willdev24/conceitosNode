const router = require('express').Router();
const { cadastroget, cadastrarpost, atualizarUm, deletarUm} = require('../controller/cadastro');
const { verifyiExistsccountID } = require('../middleware/middleware');


// GET
router.get('/', cadastroget); 

// POST
router.post('/' , cadastrarpost);

// PUT
router.put('/:id',verifyiExistsccountID, atualizarUm);

// DELETE
router.delete('/:id',verifyiExistsccountID, deletarUm);

module.exports = router;
