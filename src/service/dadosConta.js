const fs = require('fs');
const path = require('path');
const Conta = require("../model/conta");

function pegarDados(){
        const data = fs.readFileSync(path.join(__dirname, '../utils/banco.json'), 'utf-8');           
        const cadastros = JSON.parse(data);
       
        return cadastros;
        
};

function devolverDados(contaAtualizada){
       const arualizar =  pegarDados();
       const contaIndex = arualizar.findIndex(cadastro => cadastro.id == contaAtualizada.id);//encontrar o index da conta que eu quero atualizar

       if (contaIndex === -1) {
        throw new Error('Conta não encontrada');
        }       

        atualizar[contaIndex] = contaAtualizada; //atualizar a conta no array local

        fs.writeFileSync(path.join(__dirname, '../utils/banco.json'), JSON.stringify(atualizar,null,2))       
        return { message: 'Dados atualizados com sucesso' };
};


function criarConta(nome, cpf){
        
        // Validação do formato do CPF
        if(cpf.toString().length !== 11){
              throw new Error('CPF deve conter 11 dígitos');  
        };    

        // Lógica para salvar o cadastro (exemplo usando um arquivo JSON)          
        const cadastros = fs.readFileSync(path.join(__dirname, '../utils/banco.json'), 'utf-8');
        const cadastrosArray = JSON.parse(cadastros);   

        // Verificar se o CPF já existe
        if(cadastrosArray.some(cadastro => cadastro.cpf === cpf)){
                throw new Error('CPF já cadastrado');
        }

        const novoCadastro = new Conta(nome, cpf);    
        cadastrosArray.push(novoCadastro);
        fs.writeFileSync(path.join(__dirname, '../utils/banco.json'), JSON.stringify(cadastrosArray, null, 2));
        
         return { message: 'Cadastro criado com sucesso' };

};


function atualizar(id, nome, cpf) { //ajeitar para atualizar sem apagar os otros user
    const cadastro = pegarDados(id)
    const extrconta = cadastro.find(cadastro => cadastro.id == id);   

    if (!extrconta) {
    throw new Error('Conta não encontrada');
    }

    if (nome) extrconta.nome = nome;
    if (cpf) extrconta.cpf = cpf;

   return devolverDados(extrconta);
    

};


function deletar(id) {
       
        const cadastros = fs.readFileSync(path.join(__dirname, '../utils/banco.json'), 'utf-8');
        const cadastrosArray = JSON.parse(cadastros);
      
        const novoCadastrosArray = cadastrosArray.filter(cadastro => cadastro.id !== id);
        devolverDados(novoCadastrosArray );

}


module.exports = {
    atualizar,
    criarConta,
    deletar
}   