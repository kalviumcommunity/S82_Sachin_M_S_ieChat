const express = require('express');
const router = express.Router();
const { CineBotChat,getChatHistory   } = require('../controller/chatBotController');

router.post('/chat', CineBotChat);
router.post('/history', getChatHistory);


module.exports = router;
