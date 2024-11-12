const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.get('/:roomId', messageController.getMessages);

module.exports = router;