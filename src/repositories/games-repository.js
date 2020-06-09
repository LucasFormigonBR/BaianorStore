var Games = require('../app/models/games');
var mongoose = require('mongoose');

exports.post = async(data) => {
    const games = Games(data);
    await games.save();
}

exports.get = async () => {
    const res = await Games.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Games.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Games.findByIdAndUpdate(id, {
        $set:{
            titulo: data.titulo,
            preco: data.preco,
            descricao: data.descricao
        }
    });
}

exports.delete = async(id) =>{
    await Games.findOneAndRemove(id);
}