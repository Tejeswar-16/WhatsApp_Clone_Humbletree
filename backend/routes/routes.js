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
router.put('/editChat/:id',chatController.editChat);
router.put('/deleteme/:id',chatController.deleteMeChat);
router.put('/deleteall/:id',chatController.deleteAllChat);

module.exports = router;