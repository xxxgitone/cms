const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
  const {action} = req.body
  if (action === 'login') {
    next()
  } else {
    const token = req.headers['cms-token']
    if (token) {
      jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) {
          res.json({
            code: -1,
            msg: 'token验证失败'
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      res.json({
        code: -1,
        msg: 'No token provided'
      })
    }
  }
}
