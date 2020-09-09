const express = require('express');
const router = express.Router();
const { autentica } = require('../middleware/token');
const { crearMateria, verAll, verOne, deleteMater, putMater } = require('../controllers/materias.Controllers');

router.post('/materia', autentica, crearMateria);
router.get('/materias', autentica, verAll);
router.get('/materia/:id', autentica, verOne);
router.delete('/materia/:id', autentica, deleteMater);
router.patch('/materia/:id', autentica, putMater);

module.exports = router;