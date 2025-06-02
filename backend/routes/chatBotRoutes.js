const express = require('express');
const router = express.Router();
const { CineBotChat,getChatHistory   } = require('../controller/chatBotController');
const ChatLimiter  = require("../middleware/chatLimiter")

router.post('/chat', ChatLimiter,CineBotChat);
router.post('/history', getChatHistory);


module.exports = router;
