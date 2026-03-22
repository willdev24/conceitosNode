const { extrato, deposito } = require("../service/contaService");

const areaClantget  = (req,res)=>{
        res.json({message: 'servidor rodando com get'})
}   

const extratoget = (req,res)=>{
        const { id } = req.params;

        try{
              resposta = extrato(id);
              res.json(resposta);  
        } catch (error) {
              res.status(404).json({ message: error.message });
        }

}


const depositopost = (req,res)=>{
        const {depositos} = req.body;
        const {id}= req.params   
       
        try{
                const resposta = deposito(id, depositos)
                res.json(resposta)
        } catch(error){
                res.status(404).json({message:error.message})
        }


};

const saqueput = (req,res)=>{
        const { id } = req.params;
        res.json({message: 'servidor rodando', id})
}

module.exports = {
        areaClantget,
        extratoget,
        depositopost,
        saqueput
}