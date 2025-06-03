function validateStudent(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string') errors.push('Name is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required.');
  if (!body.enrollmentNumber || typeof body.enrollmentNumber !== 'string') errors.push('Enrollment number is required.');
  if (body.courses && !Array.isArray(body.courses)) errors.push('Courses must be an array of course IDs.');
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