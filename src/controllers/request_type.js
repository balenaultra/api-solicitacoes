'use strict';

const repository = require('../repositories/request_type');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
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
            message: 'Tipo da solicitação cadastrada com sucesso!'
        });
        
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
            message: 'Tipo de requisição atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
};


