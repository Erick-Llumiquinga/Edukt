const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearTarea, verTarea, eliminar, editar, find, show } = require('../controllers/tareas.Controllers');

const Rutas = require('../middleware/rutasTareas');

router.post('/tarea', autentica, Rutas.crearTarea, storage.single('file'), crearTarea);
router.get('/tarea', autentica, Rutas.verTarea, verTarea);
router.delete('/tarea/:id', autentica, Rutas.eliminar, eliminar);
router.patch('/tarea/:id', autentica,  Rutas.editar , editar);

module.exports = router;