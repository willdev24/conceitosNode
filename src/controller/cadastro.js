const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const { criarConta } = require('../service/contaService');

const cadastroget  = (req,res)=>{
        res.json({message: 'servidor rodando com get'})
}


/**
 * Cria um novo cadastro
 * @returns {Object} - A resposta do servidor
 * @property {string} nome
 * @property {string} cpf
 * @param {import('express').Request} req - Dados enviados pelo cliente
 * @param {import('express').Response} res - Resposta da API
 * @returns {void}
 */
  const cadastrarpost = (req,res)=>{
        const { nome, cpf } = req.body;
            
        try{
                const resposta = criarConta(nome, cpf);
                res.status(201).json(resposta);
        }catch(error){
                res.status(400).json({ message: error.message });
        };
};   




const atualizarUm = (req,res)=>{
        const { id } = req.params;
        
}   

const  deletarUm = (req,res)=>{
        const { id } = req.params;
        res.json({message: 'servidor rodando', id})
}   

module.exports = {
        cadastroget,
        cadastrarpost,
        atualizarUm,
        deletarUm
}   