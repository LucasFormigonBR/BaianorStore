var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    titulo: {type: String, default:'', required:true},
    preco: {type: Number, default:'', required:true},
    descricao: {type: String, default:'', required:true},
    vendas: {type: Number, default:'', required:true}
});

users = [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }]

module.exports = mongoose.model('Games', gamesSchema);