const express = require('express');
const router = express.Router();
const Rutas = require('../middleware/rutasCursos');
const { autentica } = require('../middleware/token');
const { crearClase, find, verClases, eliminar, editar } = require('../controllers/clases.Contrallers');




router.post('/clases', autentica, Rutas.crearCurso, crearClase);
router.get('/clases', autentica, Rutas.verCursos, verClases)
router.delete('/clases/:id', autentica, Rutas.eliminar, eliminar);
router.patch('/clases/:id', autentica, Rutas.editar, editar);

module.exports = router;