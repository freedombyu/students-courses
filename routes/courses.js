const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');
const validate = require('../middleware/validate');
const { validateCourse } = require('../utils/validators');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', validate(validateCourse), controller.createCourse);
router.put('/:id', validate(validateCourse), controller.updateCourse);
router.delete('/:id', controller.deleteCourse);

module.exports = router;