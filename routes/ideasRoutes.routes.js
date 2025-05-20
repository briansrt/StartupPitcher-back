const express = require('express');
const router = express.Router();
const {crearIdeas, getIdeas, getIdeaId, estadisticas, ideasPublicas, eliminarIdea, actualizarIdea, editarIdea} = require('./controllers/ideas.js');

router.post('/crearIdeas', crearIdeas);
router.get('/misIdeas/:userId', getIdeas);
router.get('/getIdeaId/:id', getIdeaId);
router.get('/estadisticas/:userId', estadisticas);
router.get('/ideasPublicas', ideasPublicas);
router.delete('/eliminarIdea/:ideaId', eliminarIdea);
router.put('/publicarIdea', actualizarIdea);
console.log('📥 Ruta /editarIdea/:id registrada');
router.put('/editarIdea/:id', editarIdea);


module.exports = router;