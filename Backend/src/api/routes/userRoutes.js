const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to register a new user
router.post('/register', userController.createUser);

// Route to login a user
router.post('/login', userController.loginUser);


module.exports = router;
