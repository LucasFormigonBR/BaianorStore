var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtosSchema = new Schema({
    nome: String,
    estoque: Number,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Produto', produtosSchema);