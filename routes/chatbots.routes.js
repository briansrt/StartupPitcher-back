const express = require('express');
const router = express.Router();
const {solicitarFeedback, mejorarPitch, guardarPitch} = require('./controllers/chatbots.js');

router.post('/FeedbackIdeas', solicitarFeedback);
router.post('/mejorarPitch', mejorarPitch);
router.put('/guardarPitch', guardarPitch);

module.exports = router;