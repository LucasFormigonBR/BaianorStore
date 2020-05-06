var Usuario = require('../app/models/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
require("dotenv-safe").config();

exports.login = async(mail, pass) => {    
    const user = await Usuario.findOne({ email: mail });
    const id = user._id;
    if (user.email === mail && user.ValidPassword(pass)){
        const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 60}); //1 min
        return token;
    } else{
        throw({status: 404, code: 'Usuário não encontrado.', message: 'Tente outro E-mail.'});
    }
}

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