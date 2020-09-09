const express = require('express');
const router = express.Router();
const Rutas = require('../middleware/rutasCursos');
const { autentica } = require('../middleware/token');
const { crearCurso, verCursos, verParalelo, eliminar, editar } = require('../controllers/cursos.Controllers');


router.post('/curso', autentica, crearCurso);
router.get('/cursos', autentica, verCursos);
router.delete('/curso/:id', autentica, eliminar);
router.patch('/curso/:id', autentica, editar  );

module.exports = router;