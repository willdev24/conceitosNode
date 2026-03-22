const claintRouter = require('express').Router();
const areaClaint = require('../controller/areaClaint');

claintRouter.get('/conta', areaClaint.areaClantget);
claintRouter.get('/extrato/:id', areaClaint.extratoget);
claintRouter.post('/deposito', areaClaint.depositopost);
claintRouter.put('/saque/:id', areaClaint.saqueput);

module.exports = claintRouter;