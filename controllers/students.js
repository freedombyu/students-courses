const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('students').find();
    const students = await result.toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const student = await mongodb.getDatabase().collection('students').findOne({ _id: studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentId: req.body.studentId,
      enrolledCourses: req.body.enrolledCourses || [],
    };
    const response = await mongodb.getDatabase().collection('students').insertOne(student);
    if (response.acknowledged && response.insertedId) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create student' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentIdObj = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentId: req.body.studentId,
      enrolledCourses: req.body.enrolledCourses || [],
    };
    const response = await mongodb.getDatabase().collection('students').replaceOne({ _id: studentIdObj }, student);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Student not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentIdObj = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('students').deleteOne({ _id: studentIdObj });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
};