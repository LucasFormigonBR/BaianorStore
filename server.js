const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const autorization = require('./src/services/auth-service');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Cookies
app.use(cors());
app.use(cookieParser());

//CSS
//app.use(express.static('./src/public'));
app.use(express.static('./node_modules/bootstrap/dist'));
//app.use(express.static('./src'));
//Config
    //Template Engine
    app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
    app.set('views', path.join(__dirname, '/src/views'));
    app.set('view engine', 'handlebars')

//PERSISTÊNCIA
mongoose.connect('mongodb+srv://luisgust08:1234567890@cluster0-pyifx.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});

//Configuração do server para usar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//Definindo a porta via arquivo de configuração
var port = process.env.port || 3000;

//ROTAS
const indexRoute = require("./src/routes/index-routes");
const gamesRoute = require("./src/routes/games-route");
const userRoute = require("./src/routes/user-route");
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
//Rotas para Lista de Jogos
//app.use('/api/lista', listaRoute);

app.get('/', function(req,res){
    res.render('login');
})

app.get('/register', function(req, res){
    res.render('cadastro');
})

app.get('/logout', function(req, res){
   res.clearCookie('x-access-token');
   res.redirect('/');
   console.log('token apagado');
});

/*app.get('/api/register',function(req,res){
    res.render('/register', {message : 'Cadastrado com sucesso.'});
});*/

app.get('/index', autorization.authorize, function(req, res){
    res.render('index');
});

app.get('/graficos', function(req, res){
    res.render('graficos');
});

app.post('/api/register', function(req, res){
    req.body.username;
    req.body.email;
    req.body.senha;
    console.log(req.body.username);
})

app.post('/api/login', function(req, res){
    req.body.email;
    req.body.senha;
})

app.listen(port, () => {
    console.log('Server up and running!');
});