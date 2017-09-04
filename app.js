const express = require('express')
// const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./server/config/config')
const mongoose = require('mongoose')
const userRoutes = require('./server/api/user')
// const User = require('./server/models/user')

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

// User.create({
//   account: 'A0001',
//   userName: '徐小江',
//   birthday: +new Date('1994-02-03'),
//   phoneNumber: 18947960122,
//   entryDate: +new Date('2013-01-01'),
//   campus: '浦东校区',
//   role: 'admin',
//   password: 123456,
//   avatar: 'https://raw.githubusercontent.com/xxxgitone/learningProcess/master/issueImg/jerry.jpeg'
// })

app.use('/api', userRoutes)

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
