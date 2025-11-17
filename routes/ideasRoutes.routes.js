const express = require('express');
const router = express.Router();
const {crearIdeas, getIdeas, getIdeaId, estadisticas, ideasPublicas, eliminarIdea, actualizarIdea, editarIdea} = require('./controllers/ideas.js');

router.post('/crearIdeas', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Crea una nueva idea y la guarda en la base de datos.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        userId: "user_123",
        username: "Juan",
        titulo: "Nueva app",
        descripcion: "Descripción de la idea"
      }
    }

    #swagger.responses[200] = {
      description: "Idea creada correctamente",
      schema: { status: "Idea creada" }
    }
  */
    crearIdeas);
router.get('/misIdeas/:userId', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Obtiene todas las ideas de un usuario específico.'

    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: 'ID del usuario'
    }

    #swagger.responses[200] = {
      description: "Lista de ideas del usuario",
      schema: [{ _id: "id_idea", titulo: "Idea 1", descripcion: "Desc", estado: "privado", fecha: "2025-01-01" }]
    }
  */
    getIdeas);
router.get('/getIdeaId/:id', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Obtiene una idea específica por su ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID de la idea'
    }

    #swagger.responses[200] = {
      description: "Idea encontrada",
      schema: { _id: "id_idea", titulo: "Idea 1", descripcion: "Desc", estado: "privado", fecha: "2025-01-01" }
    }
  */
    getIdeaId);
router.get('/estadisticas/:userId', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Obtiene estadísticas de las ideas de un usuario.'

    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: 'ID del usuario'
    }

    #swagger.responses[200] = {
      description: "Estadísticas de ideas",
      schema: { total: 5, conFeedback: 2, sinFeedback: 3, conPitch: 1 }
    }
  */
    estadisticas);
router.get('/ideasPublicas', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Obtiene todas las ideas públicas.'

    #swagger.responses[200] = {
      description: "Lista de ideas públicas",
      schema: [{ _id: "id_idea", userId: "user_123", username: "Juan", titulo: "Idea pública", descripcion: "Desc", fecha: "2025-01-01", aiFeedback: true, pitch: true }]
    }
  */
    ideasPublicas);
router.delete('/eliminarIdea/:ideaId', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Elimina una idea por su ID.'

    #swagger.parameters['ideaId'] = {
      in: 'path',
      required: true,
      description: 'ID de la idea a eliminar'
    }

    #swagger.responses[200] = {
      description: "Idea eliminada correctamente",
      schema: { status: "Idea eliminada" }
    }
  */
    eliminarIdea);
router.put('/publicarIdea', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Actualiza el estado de una idea (por ejemplo, de privado a público).'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        ideaId: "id_idea",
        nuevoEstado: "publico"
      }
    }

    #swagger.responses[200] = {
      description: "Idea actualizada correctamente",
      schema: { status: "Idea actualizada" }
    }
  */
    actualizarIdea);
router.put('/editarIdea/:id', 
    /*
    #swagger.tags = ['Ideas']
    #swagger.description = 'Edita el contenido de una idea existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID de la idea a editar'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        titulo: "Nuevo título",
        descripcion: "Nueva descripción",
        pitch: "Nuevo pitch"
      }
    }

    #swagger.responses[200] = {
      description: "Idea editada correctamente",
      schema: { _id: "id_idea", titulo: "Nuevo título", descripcion: "Nueva descripción", pitch: "Nuevo pitch" }
    }
  */
    editarIdea);


module.exports = router;