const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('courses').find();
    const courses = await result.toArray();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const course = await mongodb.getDatabase().collection('courses').findOne({ _id: courseId });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = {
      coursesTitle: req.body.coursesTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const response = await mongodb.getDatabase().collection('courses').insertOne(course);
    if (response.acknowledged && response.insertedId) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create course' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseIdObj = new ObjectId(req.params.id);
    const course = {
      coursesTitle: req.body.coursesTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const response = await mongodb.getDatabase().collection('courses').replaceOne({ _id: courseIdObj }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Course not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse,
};