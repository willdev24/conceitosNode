const fs = require('fs');
const path = require('path');
const Conta = require("../model/conta");



function extrato(id ,dataDeTransacao){
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
  
        if(dataDeTransacao){
                
                const extratoFiltrado = conta.statement.filter(transacao => transacao.data === dataDeTransacao); 
                if(extratoFiltrado.length === 0)
                throw new Error('Não foram encontradas transações para a data informada');
                return extratoFiltrado
        };



        return conta.estrato()
    };


function deposito(id,deposito){

        if(!id || !deposito){
                throw new Error('PREISA FORNECER UM VALOR')
        };

        const data = fs.readFileSync(path.join(__dirname,'../utils/banco.json'),'utf-8');
        const dados = JSON.parse(data)

        if( dados.some(val => val.id == id)== false ){
                throw new Error("Conta não encontrada")
        };

        //pega o index da posicao onde eu vou alterar o array dentro do banco de dados local
        const posicaonoJsonParaAtulizar = dados.findIndex(itens=> itens.id == id)

        //pego os dados que preciso e mando para dentro da class conta para poder usar seus metodos (saque, deposito, extrato)
        const dadosConta = dados.find(itens=> itens.id == id)
        const conta = new Conta(dadosConta.nome, dadosConta.cpf)
        conta.depositar(deposito)

        //atulizo os dados no array local
        dados[posicaonoJsonParaAtulizar].saldo += conta.saldo;
        dados[posicaonoJsonParaAtulizar].statement.push(... conta.statement)
        fs.writeFileSync(path.join(__dirname, '../utils/banco.json'), JSON.stringify(dados, null, 2))



return  "deposito relizado com sucesso"

};

async function saque(id, valor){

        const data = fs.readFileSync(path.join(__dirname,'../utils/banco.json'),'utf-8');
        const dados = JSON.parse(data)

        const posicaonoJsonParaAtulizar = dados.findIndex(itens=> itens.id == id)
        const dadosParaClass = dados.find(itens => itens.id == id)
        
        //joga os dados para a class conta executar seus metodos
        const conta = await new Conta(dados.nome, dados.pf)
        conta.saldo = dadosParaClass.saldo
        conta.saque(valor)
   
        dados[posicaonoJsonParaAtulizar].saldo = conta.saldo
        dados[posicaonoJsonParaAtulizar].statement.push(... conta.statement)
        fs.writeFileSync(path.join(__dirname, '../utils/banco.json'), JSON.stringify(dados, null, 2))


        return `saque de ${valor} realizado com sucesso!`


}


module.exports = {
        extrato,
        deposito,
        saque
}