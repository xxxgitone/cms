const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const config = require('./server/config/config')
const router = require('koa-router')()
const mongoose = require('mongoose')
const userRoutes = require('./server/router/user')
const teacherRoutes = require('./server/router/teacher')
const campusRoutes = require('./server/router/campus')
const courseRoutes = require('./server/router/course')
// const axios = require('axios')
// const Course = require('./server/models/course')

const PORT = process.env.PORT || '3000'
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') {
  mongoose.connect(config.mongo.dev.connectionUrl)
}
mongoose.Promise = global.Promise

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(json())

// axios.get('https://www.easy-mock.com/mock/59c35a9fe0dc663341b2ec0c/api/course').then((res) => {
//   res.data.data.forEach(item => {
//     console.log(item)
//     Course.create(item)
//   })
// })

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.use(require('./server/middlewares/jwtMiddle'))
router.use('/api', userRoutes.routes())
router.use('/api', teacherRoutes.routes())
router.use('/api', campusRoutes.routes())
router.use('/api', courseRoutes.routes())

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(PORT, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + PORT)
})
