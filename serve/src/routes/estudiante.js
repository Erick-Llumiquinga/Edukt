const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearEstu, verAll, verOne, deleteEstu, putEstu } = require('../controllers/estudiante.Controllers');

router.post('/estudiante', autentica, storage.single('file'), crearEstu);
router.get('/estudiantes', autentica, verAll);
router.get('/estudiante/:id', autentica, verOne);
router.delete('/estudiante/:id', autentica, deleteEstu);
router.patch('/estudiante/:id', autentica, putEstu);

module.exports = router;