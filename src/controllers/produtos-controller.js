const Produto = require('../app/models/produto');
const produtoRepository = require("../repositories/product-repository");

//Post
exports.post = async (req, res) => {
   try {
       await produtoRepository.post({
           nome: req.body.nome,
           estoque: req.body.estoque,
           preco: req.body.preco,
           descricao: req.body.descricao
       });
       res.status(201).send({
           message: "Produto inserido com sucesso"
       })
   } catch (error) {
       res.status(500).send({
           message: "Falha ao inserir um produto",
           erro: error
       });
    }
}

//Get All
exports.get = async (req, res) => {
try{
    let soma;
    Produto.countDocuments({}, (err, data) => {
    soma = data;
});
        var data = await produtoRepository.get();
        res.status(200).send({
        message:"Quantidade de Produtos: " + soma,
        data: data
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message:"Falha na requisição",
            erro:error
        });
    }
}

//FindById
exports.getById = async (req, res) => {
    try{
        const id = req.params.produtoId;
        var data = await produtoRepository.getById(id);
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
        const id = req.params.produtoId;    
        const data = await produtoRepository.put(id, req.body);
        res.status(200).send({
            message:"Produto atualizado com sucesso",
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
        const id = req.params.produtoId;
        await produtoRepository.delete(id);
        console.log(id);
        res.status(200).send({
            message:"Produto removido com sucesso",
        })
    } catch (error) {
         res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }

}