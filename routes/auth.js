const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/username-check/:username?', authController.validateUsername);
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

module.exports = router;
