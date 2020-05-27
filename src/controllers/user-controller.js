const Usuario = require('../app/models/user');
const express = require('express');
const userRepository = require("../repositories/user-repository");
const singupRepository = require('../repositories/singup-repository');
const cookieParser = require('cookie-parser');

exports.login = async (req, res) => {
    try {
        const token = await userRepository.login(req.body.email, req.body.password);
        res.cookie('x-access-token', token);
        console.log("controller " + req.cookies['x-access-token']);
        res.redirect('/index');
    } catch (error) {
        if (!error.status) {
            res.status(500).json({ error: { code: 'Erro Desconhecido.', message: 'Um erro desconhecido ocorreu.' } });
        } else {
            res.status(error.status).json({ error: {code: error.code, message: error.message}});
        }
    }
}

//Register
exports.userRegister = async function (req, res) {
    //chamar repositório para registrar um usuário
    try {
        await singupRepository.post({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.render('cadastrado');
        /*res.status(201).send({
            message: "Usuário registrado com sucesso"
        })*/
    } catch (error) {
        res.status(500).send({
            message: "Falha ao registrar um usuário",
            erro: error
        });
    }
}

//Post
exports.post = async (req, res) => {
    try {
        await userRepository.post({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: "Usuário inserido com sucesso"
        })
    } catch (error) {
        res.status(500).send({
            message: "Falha ao inserir um usuário",
            erro: error
        });
    }
}

//Get All
exports.get = async (req, res) => {
    try {
        var data = await userRepository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
}

//FindById
exports.getById = async (req, res) => {
    try {
        const id = req.params.usuarioId;
        var data = await userRepository.getById(id);
        if (data == null) {
            res.status(200).send({
                message: "O id especificado não foi encontrado."
            });
        }
        else {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição.",
            erro: error
        });
    }
}

//Put
exports.put = async (req, res) => {
    try {
        const id = req.params.usuarioId;
        console.log(id);
        const data = await userRepository.put(id, req.body);
        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            dados: data
        })
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
}

//Delete
exports.delete = async (req, res) => {
    try {
        const id = req.params.usuarioId;
        await userRepository.delete(id)
        console.log(id);
        res.status(200).send({
            message: "Usuário removido com sucesso",
        })
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
}