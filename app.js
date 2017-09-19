const Koa = require('koa')
// const path = require('path')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const config = require('./server/config/config')
const router = require('koa-router')()
const mongoose = require('mongoose')
const userRoutes = require('./server/router/user')
const teacherRoutes = require('./server/router/teacher')

const PORT = process.env.PORT || '3000'
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') {
  mongoose.connect(config.mongo.dev.connectionUrl)
}
mongoose.Promise = global.Promise

const app = new Koa()

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger())
app.use(bodyParser())
app.use(json())

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: -1,
        token: 0,
        msg: 'token验证失败'
      }
    } else {
      throw err
    }
  }
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.use(require('./server/middlewares/jwtMiddle'))
router.use('/api', userRoutes.routes())
router.use('/api', teacherRoutes.routes())

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
