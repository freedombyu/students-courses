function validateStudent(body) {
  const errors = [];
  if (!body.firstName || typeof body.firstName !== 'string') errors.push('firstName is required.');
  if (!body.lastName || typeof body.lastName !== 'string') errors.push('lastName is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required.');
  if (!body.studentId || typeof body.studentId !== 'string') errors.push('studentId is required.');
  if (body.enrolledCourses && !Array.isArray(body.enrolledCourses)) errors.push('enrolledCourses must be an array of course IDs.');
  return errors;
}

function validateCourse(body) {
  const errors = [];
  if (!body.coursesTitle || typeof body.coursesTitle !== 'string') errors.push('coursesTitle is required.');
  if (!body.courseId || typeof body.courseId !== 'string') errors.push('courseId is required.');
  if (!body.instructor || typeof body.instructor !== 'string') errors.push('instructor is required.');
  if (!body.classMax || typeof body.classMax !== 'string') errors.push('classMax is required.');
  if (!body.currentEnrollment || typeof body.currentEnrollment !== 'string') errors.push('currentEnrollment is required.');
  if (!body.startDate || typeof body.startDate !== 'string') errors.push('startDate is required.');
  if (!body.endDate || typeof body.endDate !== 'string') errors.push('endDate is required.');
  return errors;
}

module.exports = { validateStudent, validateCourse };