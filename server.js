// import express from 'express';
// import bodyParser from 'body-parser';
var express = require ('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
var mongoose = require('mongoose');

//PERSISTÊNCIA
mongoose.connect('mongodb+srv://luisgust08:1234567890@cluster0-pyifx.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});

//Configuração do server para usar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static('./app/public'));
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//Definindo a porta via arquivo de configuração
var port = process.env.port || 3000;

//ROTAS
var indexRoute = require("./src/routes/index-routes");
var gamesRoute = require("./src/routes/games-route");
var userRoute = require("./src/routes/user-route");
const signupRoute = require('./src/routes/singup-route');
const loginRoute = require('./src/routes/login-route');

//Vincular a aplicacao (app) com o motor de rotas
app.use('/', indexRoute);

//Rotas para produtos
app.use('/api/games', gamesRoute);
//Rotas para usuários
app.use('/api/users', userRoute);
//Rotas para Registros
app.use('/api/register', signupRoute);
//Rotas para Login
app.use('/api/login', loginRoute);

app.listen(port, () => {
    console.log('Server up and running!');
});