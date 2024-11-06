const express = require('express');
const isAuth = require('../middleware/isAuth.js');

const router = express.Router();

const authController = require('../controller/authController.js');


router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.get('/signup', authController.getSignup);

router.post('/logout', isAuth, authController.postLogout);

router.get('/index', authController.getIndex);

module.exports = router;