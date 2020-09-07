const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const Rutas = require('../middleware/rutasPersona');
const { autentica } = require('../middleware/token');
const { crearPerson, verAll, loginA, eliminarPer, editarPer } = require('../controllers/personas.Controllers'); 


router.get('/persons', autentica, Rutas.verification, verAll);
router.post('/person', autentica, Rutas.verification, storage.single('file'), crearPerson);
router.post('/loginP', loginA);
router.patch('/person/:id', autentica, Rutas.verification, editarPer);
router.delete('/person/:id', autentica,Rutas.verification, eliminarPer);

module.exports = router;