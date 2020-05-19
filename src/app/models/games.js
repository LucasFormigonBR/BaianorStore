var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    titulo: String,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Games', gamesSchema);