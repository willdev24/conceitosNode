const atualizarTodos = (req,res)=>{
        res.json({message: 'ATUALIZAR TODOS'})
}   

const  deletarTodos = (req,res)=>{
        res.json({message: 'DELETAR TODOS'})
}   


module.exports = {
        atualizarTodos,
        deletarTodos
}   