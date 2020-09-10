const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearTarea, verTarea, eliminar, editar, find, show, byId } = require('../controllers/tareas.Controllers');

const Rutas = require('../middleware/rutasTareas');

router.post('/tarea', autentica,  storage.single('file'), crearTarea);
router.get('/tarea', autentica,  verTarea);
router.delete('/tarea/:id', autentica,  eliminar);
router.patch('/tarea/:id', autentica, editar);

router.get('/tarea/:id', byId);

module.exports = router;