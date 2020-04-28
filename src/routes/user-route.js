const express = require('express');
var router = express.Router(); //interceptação das rotas
const userController = require('../controllers/user-controller');

//Login
router.post("/login", userController.login);

//Post
router.post("/registrar", userController.post);

//Get All
router.get("/", userController.get);

//FindById
router.get("/:usuarioId", userController.getById);

//Put
router.put("/:usuarioId", userController.put);

//Delete
router.delete("/:usuarioId", userController.delete);

module.exports = router;