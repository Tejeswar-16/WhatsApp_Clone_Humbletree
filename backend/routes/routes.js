const express = require('express');
const authController = require("../controllers/authController");
const chatController = require("../controllers/chatController")

const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/getUsers/:id',authController.getUsers);
router.get('/getUserById/:id',authController.getUserById);
router.post('/sendMessage',chatController.sendMessage);
router.post('/getChat',chatController.getChat);

module.exports = router;