const {v4: uuidv4} = require('uuid');


const data = new Date();
const formatada = data.toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
});

class contaBancaria{
    constructor(nome, cpf){
        this.id = uuidv4();
        this.nome = nome;
        this.cpf = cpf;
        this.saldo = 0;
        this.statement = [];
    }

depositar(valor){
    if(valor <= 0){
        throw new Error('Valor de depósito deve ser positivo');
    }   
    this.saldo += valor;
    this.statement.push({tipo: 'depósito', valor, data:formatada, saldo: this.saldo});
   }

saque(valor){
    if(valor <= 0){
        throw new Error('Valor de saque deve ser positivo');
    }   
    if(valor > this.saldo){
        throw new Error('Saldo insuficiente');
    }
    this.saldo -= valor;
    this.statement.push({tipo: 'saque', valor, data:formatada , saldo: this.saldo});
  }

 estrato(){
    return this.statement;
  } 

}


module.exports = contaBancaria;