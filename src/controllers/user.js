'use strict';

const ValidationContract = require('../validators/validators');
const repository = require('../repositories/user');
const md5 = require('md5');
const authService = require('../services/auth');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    //TODO contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    //TODO contract.isEmail(req.body.email, 'E-mail inválido');
    //TODO contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {     
        req.body.password = md5(req.body.password + global.SALT_KEY);

        let id = await repository.create(req);

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
            data: {
                id: id
            }
        });
        
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async (req, res, next) => {  
    try {
        const user = await repository.authenticate({
            company_cpf_cnpj: req.body.company_cpf_cnpj,
            code: req.body.code,            
            password: md5(req.body.password + global.SALT_KEY)
        });

        //console.log(user);
        
        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
        });

        Server.emitter.emit('event', 'teste')
        console.log('evwnrrwarw');


        res.status(200).send({
            token: token,            
            user: user
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: "Cliente não encontrado"
            });
            return;
        }
        const tokenData = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

