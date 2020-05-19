const express = require('express');
var router = express.Router(); //interceptação das rotas
const gamesController = require('../controllers/games-controller');
const autorization = require('../services/auth-service');

//Post
router.post("/", gamesController.post);

//Get All
router.get("/",autorization.authorize, gamesController.get);

//FindById
router.get("/:gameId", gamesController.getById);

//Put
router.put("/:gameId", gamesController.put);

//Delete
router.delete("/:gameId", gamesController.delete);

module.exports = router;