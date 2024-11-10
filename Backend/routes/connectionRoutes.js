const express = require('express');
const router = express.Router();
const connectionController = require('../controller/connectionController');
const isAuth = require('../middleware/isAuth');

router.post('/sendRequest/:username', isAuth, connectionController.sendConnectionRequest);

router.post('/acceptRequest/:username', isAuth, connectionController.acceptRequest);

router.post('/rejectRequest/:username', isAuth, connectionController.rejectRequest);

router.get('/getConnections/:username', connectionController.getConnections);

router.get('/getallConnections/:username', connectionController.getallConnections); 

module.exports = router; 