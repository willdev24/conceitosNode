const fs = require('fs')
const path = require('path')


function verifyiExistsccountID(req, res, next){

         const { id } = req.params;

         const dados = fs.readFileSync(path.join(__dirname, '../utils/banco.json'),'utf-8')
         const dadosBancarios =JSON.parse(dados)
         const result =   dadosBancarios.some( itens => itens.id == id)

         if(result == false){
                return res.json({message:'id nao cadastrado'})
         };


         next()
      
};

module.exports={
    verifyiExistsccountID
}
