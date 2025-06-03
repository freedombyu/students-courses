const express = require('express');
const router = express.Router();
const controller = require('../controllers/students');
const validate = require('../middleware/validate');
const { validateStudent } = require('../utils/validators');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', validate(validateStudent), controller.createStudent);
router.put('/:id', validate(validateStudent), controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;