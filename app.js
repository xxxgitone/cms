const express = require('express')
// const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./server/config/config')
const mongoose = require('mongoose')
const userRoutes = require('./server/api/user')
const teacherRoutes = require('./server/api/teacher')
// const Teacher = require('./server/models/teacher')

const PORT = process.env.PORT || '3000'
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') {
  mongoose.connect(config.mongo.dev.connectionUrl)
}
mongoose.Promise = global.Promise

const app = express()

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))

// for (var i = 0; i < 25; i++) {
//   Teacher.create({
//     userName: `田美丽${i}`,
//     birthday: +new Date('1991-06-06'),
//     phoneNumber: 18847960182,
//     entryDate: +new Date('2013-07-11'),
//     campus: '浦东校区',
//     gender: 'F',
//     job: '美术',
//     age: 22
//   })
// }

app.use(require('./server/middlewares/jwtMiddle'))
app.use('/api', userRoutes)
app.use('/api', teacherRoutes)

app.use((err, req, res, next) => {
  res.status(442).send({ error: err.message })
})

module.exports = app.listen(PORT, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + PORT)
})
