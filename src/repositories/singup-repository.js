const Usuario = require('.../app/models/user');
const mongoose = require('mongoose');

//Register
exports.post = async(data) => {
    const user = Usuario(data);
    await user.save();
}

//Login