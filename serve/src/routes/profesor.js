const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');

const { crearProf, verAll, verOne, deleteProf, putProf } = require('../controllers/profesor.Controllers');

router.post('/profesor', storage.single('file'), crearProf);
router.get('/profesores', verAll);
router.get('/profesor/:id', verOne);
router.delete('/profesor/:id', deleteProf);
router.patch('/profesor/:id', putProf);

module.exports = router;