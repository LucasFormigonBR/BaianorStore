const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
//Chamar o controller de singup

router.post("/", userController.userRegister);

module.exports = router;