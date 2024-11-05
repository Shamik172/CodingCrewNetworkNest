const express = require('express');
const router = express.Router();
const connectionController = require('../controller/connectionController');
const isAuth = require('../middleware/isAuth');

router.post('/sendRequest/:username', isAuth, connectionController.sendConnectionRequest);

router.post('/acceptRequest/:userId', isAuth, connectionController.acceptRequest);

router.post('/rejectRequest/:userId', isAuth, connectionController.rejectRequest);

module.exports = router;