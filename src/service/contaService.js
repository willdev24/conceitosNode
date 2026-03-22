const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const Conta = require("../model/conta");


function criarConta(nome, cpf){
         // Validação dos dados
         if(!nome || !cpf){
                 throw new Error('Nome e CPF são obrigatórios');
        };

         // Validação do tipo dos dados
        if(typeof nome !== 'string' || typeof cpf !== 'string'){
                throw new Error('Nome deve ser string e CPF deve ser string');
        };

        // Validação do formato do CPF
        if(cpf.toString().length !== 11){
              throw new Error('CPF deve conter 11 dígitos');  
        };    

        // Lógica para salvar o cadastro (exemplo usando um arquivo JSON)
        const data = fs.readFileSync(path.join(__dirname, '../utils/banco.json'), 'utf-8');           
        const cadastros = JSON.parse(data);

        // Verificar se o CPF já existe
        if(cadastros.some(cadastro => cadastro.cpf === cpf)){
                throw new Error('CPF já cadastrado');
        }
        console.log(cadastros);

        const novoCadastro = new Conta(nome, cpf);    
        cadastros.push(novoCadastro);
        console.log(cadastros);
        fs.writeFileSync(path.join(__dirname, '../utils/banco.json'), JSON.stringify(cadastros,null,2))

         return { message: 'Cadastro criado com sucesso' };

};

function extrato(id){
        const data = fs.readFileSync(path.join(__dirname, '../utils/banco.json'), 'utf-8');           
        const cadastros = JSON.parse(data);
        const extrconta = cadastros.find(cadastro => cadastro.id == id);           
      
        if(!extrconta){
                throw new Error('Conta não encontrada');
        }

    const  conta = new Conta(extrconta.nome, extrconta.cpf);
           conta.id = extrconta.id;
           conta.saldo = extrconta.saldo
           conta.statement = extrconta.statement
        
        return conta.estrato()
    };


module.exports = {
        criarConta,
        extrato
}