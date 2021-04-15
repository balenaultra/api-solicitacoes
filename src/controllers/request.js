'use strict';

const repository = require('../repositories/request');
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get(req);
        res.status(200).send(data);    
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {    
    try {
        await repository.create(req);

        res.status(201).send({
            message: 'Solicitação cadastrada com sucesso!'
        });
        next();
                
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        
        res.status(200).send({
            message: 'Solicitação atualizado com sucesso!'            
        });
        next();
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
};


