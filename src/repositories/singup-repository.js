const User = require('../app/models/user');
const mongoose = require('mongoose');

//Register
exports.post = async(data) => {
    console.log(data);

const newUser = new User();
        newUser.email = data.email;
        newUser.password = newUser.generateHash(data.password)
        newUser.save((err, res) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Não foi possível salvar o usuário.'
                });
            }
        });
    }

//Login
