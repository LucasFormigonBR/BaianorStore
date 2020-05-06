const express = require('express');
var router = express.Router(); //interceptação das rotas
const produtoController = require('../controllers/produtos-controller');
const autorization = require('../services/auth-service');

//Post
router.post("/", produtoController.post);

//Get All
router.get("/",autorization.authorize, produtoController.getAll);

//FindById
router.get("/:produtoId", produtoController.getById);

//Put
router.put("/:produtoId", produtoController.put);

//Delete
router.delete("/:produtoId", produtoController.delete);

module.exports = router;