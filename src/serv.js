const express = require('express');
const router = require('./router/cadastroRoutes');
const routerAdmin = require('./router/cadastroAdmin');
const claintRouter = require('./router/areaClaintRouter');

const app = express();
app.use(express.json());//middleware para ler json

//routes de cadastro
app.use('/cadastros', router);

//routes de adminCadastro
app.use('/Admin/cadastros', routerAdmin);

//routes de areaClaint
app.get('/extrato/:id', claintRouter)
app.get('/conta', claintRouter)
app.post('/deposito', claintRouter)
app.put('/saque/:id', claintRouter)



const PORT = process.env.PORT || 3000; 
app.listen(PORT, ()=> console.log(`servidor rodndo na porta ${PORT}`));
