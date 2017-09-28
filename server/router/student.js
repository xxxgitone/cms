const router = require('koa-router')()
const student = require('../controllers/student')

router.get('/students', student.fetchStudents)

module.exports = router
