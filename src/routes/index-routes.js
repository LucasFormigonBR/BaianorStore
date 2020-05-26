const express = require('express');
var router = express.Router(); //interceptação das rotas
var fs = require('fs');

router.use("/", (req, res, next) => {
        try {
        data = [req.method, req.path, req.body]
        fs.appendFileSync('requests.txt', JSON.stringify(data)+"\r\n");
        } catch (err) {
  console.log(err);
}
next();
    
});

/*router.get('/', (req, res) => {
    res.sendfile('src/views/login.html');
});

router.get('/api/register', (req, res) => {
    res.sendfile('src/views/cadastro.html');
});*/

module.exports = router;