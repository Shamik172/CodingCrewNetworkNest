const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');

const userController = require('../controller/userController');

router.get('/profile/:username', userController.getUserProfile);

router.post('/edit/:username', isAuth, userController.postEditUser);

module.exports = router;