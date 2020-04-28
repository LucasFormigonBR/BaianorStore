var Usuario = require('../app/models/user');
var mongoose = require('mongoose');

/*exports.login = async(email, password) => {    
}*/

exports.post = async(data) => {
    const user = Usuario(data);
    await user.save();
}

exports.get = async () => {
    const res = await Usuario.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Usuario.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Usuario.findByIdAndUpdate(id, {
        $set:{
            nome: data.nome,
            email: data.email,
            password: data.password
        }
    });
}

exports.delete = async(id) =>{
    await Usuario.findOneAndDelete(id);
}