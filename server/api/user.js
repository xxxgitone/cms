const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/users', (req, res, next) => {
  User.find({}, {password: 0}).then(users => {
    res.json({
      code: 0,
      users
    })
  }).catch(next)
})

module.exports = router
