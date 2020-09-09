const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const Rutas = require('../middleware/rutasClases');
const { autentica } = require('../middleware/token');
const { crearClase, find, verClases, eliminar, editar } = require('../controllers/clases.Contrallers');


router.post('/clases', autentica, Rutas.crearClase, storage.single('file'), crearClase);
router.get('/clases', autentica, Rutas.verClases, verClases)
router.delete('/clases/:id', autentica, Rutas.eliminar, eliminar);
router.patch('/clases/:id', autentica, Rutas.editar, editar);

module.exports = router;