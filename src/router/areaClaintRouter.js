const claintRouter = require('express').Router();
const areaClaint = require('../controller/areaClaint');
const { verifyiExistsccountID } = require('../middleware/middleware');

claintRouter.get('/conta', areaClaint.areaClantget);
claintRouter.get('/extrato/:id', areaClaint.extratoget);
claintRouter.post('/deposito/:id', areaClaint.depositopost);
claintRouter.put('/saque/:id',verifyiExistsccountID, areaClaint.saqueput);

module.exports = claintRouter;