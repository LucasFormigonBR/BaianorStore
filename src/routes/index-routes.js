const express = require('express');
var router = express.Router(); //interceptação das rotas
var fs = require('fs');

router.use("/", (req, res, next) => {
        try {
        data = [req.method, req.path, req.body]
        fs.appendFileSync('requests.txt', JSON.stringify(data)+"\r\n");
        console.log('Os requests foram salvos no arquivo de log "requests.txt"!');
        } catch (err) {
  console.log(err);
}
next();
    
});

module.exports = router;