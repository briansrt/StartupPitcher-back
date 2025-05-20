const express = require('express');
const router = express.Router();
const {solicitarFeedback, mejorarPitch, demoChatbot, guardarPitch} = require('./controllers/chatbots.js');

router.post('/FeedbackIdeas', solicitarFeedback);
router.post('/mejorarPitch', mejorarPitch);
router.post('/demoChatbot', demoChatbot);
router.put('/guardarPitch', guardarPitch);

module.exports = router;