const express= require('express');
var router = express.Router(); //interceptação das rotas

var Produto = require("../app/models/product");

router
    .post("/", function(req, res){
        var produtos = new Produto();
        produtos.nome = req.body.nome;
        produtos.preco = req.body.preco;
        produtos.descricao = req.body.descricao;

        produto.save(function(error){
            if(error)
                res.send("Erro ao tentar salvar um produto." + error);

            res.status(201).json({message:'Produto inserido com sucesso.'});

        });
    });

    router.get("/", function(req, res){
        Produto.find(function(err, prods){
            if(err)
                res.send(err);

            res.status(200).json({
                message:'Produtos retornados.',
                produtos: prods
            });
       });
    });

    module.exports = router;