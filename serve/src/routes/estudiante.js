const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearEstu, verAll, verOne, deleteEstu, putEstu } = require('../controllers/estudiante.Controllers');

router.post('/estu', autentica, storage.single('file'), crearEstu);
router.get('/estu', autentica, verAll);
router.get('/estu/:id', autentica, verOne);
router.delete('/estu/:id', autentica, deleteEstu);
router.patch('/estu/:id', autentica, putEstu);

module.exports = router;