const express = require('express');
const router = express.Router();
const {solicitarFeedback, mejorarPitch, demoChatbot, guardarPitch} = require('./controllers/chatbots.js');

router.post('/FeedbackIdeas', 
    /*
    #swagger.tags = ['Chatbot']
    #swagger.description = 'Solicita feedback generado por IA sobre una idea específica.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        ideaId: "id_idea"
      }
    }

    #swagger.responses[200] = {
      description: "Feedback generado correctamente",
      schema: { feedback: "✅ Fortalezas: ... ⚠️ Áreas de mejora: ... 💡 Ideas adicionales: ..." }
    }
  */
    solicitarFeedback);
router.post('/mejorarPitch', 
    /*
    #swagger.tags = ['Chatbot']
    #swagger.description = 'Mejora un pitch existente usando IA para hacerlo más claro, persuasivo y profesional.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        descripcion: "Descripción de la idea",
        pitch: "Pitch original"
      }
    }

    #swagger.responses[200] = {
      description: "Pitch mejorado",
      schema: { pitchMejorado: "Pitch optimizado por IA" }
    }
  */
    mejorarPitch);
router.post('/demoChatbot', 
     /*
    #swagger.tags = ['Chatbot']
    #swagger.description = 'Envía un mensaje de prueba al chatbot de soporte a emprendedores.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        message: "¿Cómo puedo mejorar mi idea de negocio?"
      }
    }

    #swagger.responses[200] = {
      description: "Respuesta generada por el chatbot",
      schema: { reply: "Aquí está el consejo de IA sobre tu idea..." }
    }
  */
    demoChatbot);
router.put('/guardarPitch', 
    /*
    #swagger.tags = ['Chatbot']
    #swagger.description = 'Guarda o actualiza el pitch de una idea específica en la base de datos.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        ideaId: "id_idea",
        pitch: "Nuevo pitch"
      }
    }

    #swagger.responses[200] = {
      description: "Pitch guardado correctamente",
      schema: { message: "Pitch guardado correctamente" }
    }
  */
    guardarPitch);

module.exports = router;