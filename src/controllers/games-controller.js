const Games = require('../app/models/games.js');

//Post
exports.post = function (req, res) {
    var games = new Games();
    games.titulo = req.body.titulo;
    games.preco = req.body.preco;
    games.descricao = req.body.descricao;
    games.vendas = req.body.vendas;

    games.save(function (error) {
        if (error)
            res.send("Erro ao tentar salvar um jogo." + error);

        res.status(201).json({ message: 'Jogo inserido com sucesso.' });

    });
}

//Get All
exports.get = function (req, res) {
    Games.find(function (err, gams) {
        if (err)
            res.send(err);

        res.status(200).json({
            qtde:gams.length,
            games: gams
        });
    });
}

//FindById
exports.getById = function (req, res) {
    const id = req.params.gameId;

    Game.findById(id, function (err, game) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar jogo, ID mal formado."
            });
        }

        else if (game == null) {
            res.status(400).json({
                message: "Jogo não encontrado."
            });
        }
        else {
            res.status(200).json({
                message: "Jogo encontrado.",
                game: game
            });
        }
    });
}


//Put
exports.put = function (req, res) {
    const id = req.params.gameId;

    Game.findById(id, function (err, produto) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar jogo, ID mal formado."
            });
        }

        else if (game == null) {
            res.status(400).json({
                message: "Jogo não encontrado."
            });
        }
        else {
            game.titulo = req.body.titulo;
            game.preco = req.body.preco;
            game.descricao = req.body.descricao;

            game.save(function(error){
                if(error)
                    res.send("Erro ao tentar atualizar jogo" + error);

                res.status(200).json({
                    message:"Jogo atualizado com sucesso."
                });
            });
        }
    });
}

//Delete
exports.delete = function(req, res){
    Game.findByIdAndRemove(req.params.gameId, (err, game) =>{
        if(err)
            return res.status(500).send(err);

        const response = {
            message:"Jogo removido com sucesso.",
            id: game.id
        };
        return res.status(200).send(response);
    });
}