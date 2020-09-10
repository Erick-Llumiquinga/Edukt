const express = require('express');
const router = express.Router();
const { autentica } = require('../middleware/token');
const { newMatricula, verMatri, verOneMatri, deleteMatri, putMatri, } = require('../controllers/matriculas.Controllers');

router.post('/matricula', autentica, newMatricula);
router.get('/matriculas', autentica, verMatri);
router.get('/matricula/:id', autentica, verOneMatri);
router.delete('/matricula/:id', autentica, deleteMatri);
router.patch('/matricula/:id', autentica, putMatri);

module.exports = router;