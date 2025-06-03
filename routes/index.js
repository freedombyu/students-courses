const express = require('express');
const router = express.Router();

const studentsRoutes = require('./students');
const coursesRoutes = require('./courses');

router.use('/students', studentsRoutes);
router.use('/courses', coursesRoutes);

module.exports = router;