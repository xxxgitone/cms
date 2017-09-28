const Student = require('../models/student')

const fetchStudents = async (ctx) => {
  const [
    total,
    students
  ] = await Promise.all([
    Student.find().count(),
    Student.find()
  ])
  ctx.body = {
    code: 0,
    total,
    students
  }
}

module.exports = {
  fetchStudents
}
