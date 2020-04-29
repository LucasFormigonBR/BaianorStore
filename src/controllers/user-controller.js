const Usuario = require('../app/models/user');
const express = require('express');
const userRepository = require("../repositories/user-repository");
const singupRepository = require('../repositories/singup-repository');

//Register
exports.userRegister = async function(req, res){
    try{
        //chamar repositório para registrar um usuário
        await singupRepository.post({
            username: req.body.username,
            password: req.body.password
        });

    } catch (error){

    }
}

//Login
exports.login = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    Usuario.findOne({email: email, password: password}, function(err, user){
        if(!user){
            return res.status(404).send({
                message: "Email ou senha incorretos"
            });
        }
        return res.status(200).send({
            message: email + " Logado"
        });
    })
};

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
    try{
        var data = await userRepository.get();
        res.status(200).send(data);
    } catch(error) {
        res.status(500).send({
            message:"Falha na requisição",
            erro:error
        });
    }
}

//FindById
exports.getById = async (req, res) => {
    try{
        const id = req.params.usuarioId;
        var data = await userRepository.getById(id);
        if(data==null){
            res.status(200).send({
                message: "O id especificado não foi encontrado."
            });}
        else{
            res.status(200).send(data);
            }
    } catch (error){
        res.status(500).send({
            message:"Falha ao processar requisição.",
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
            message:"Usuário atualizado com sucesso",
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
exports.delete = async (req, res) =>{
    try {
        const id = req.params.usuarioId;
        await userRepository.delete(id)
        console.log(id);
        res.status(200).send({
            message:"Usuário removido com sucesso",
        })
    } catch (error) {
         res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
}