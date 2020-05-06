const express = require('express');
var router = express.Router();
const userController = require("../controllers/user-controller")

router.post("/", userController.login);

module.exports = router;