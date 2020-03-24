const express= require('express');
var router = express.Router(); //interceptação das rotas

var Fornecedor = require("../app/models/fornecedor");

router
    .post("/", function(req, res){
        var fornecedor = new Fornecedor();
        fornecedor.nome = req.body.nome;
        fornecedor.email = req.body.email;
        fornecedor.tel = req.body.tel;

        fornecedor.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar um fornecedor." + error);

            res.status(201).json({message:'Fornecedor inserido com sucesso.'});

        });
    });

    router.get("/", function(req, res){
        Fornecedor.find(function(err, forns){
            if(err)
                res.send(err);

            res.status(200).json({
                message:'Fornecedores retornados.',
                fornecedor: forns
            });
       });
    });

    module.exports = router;