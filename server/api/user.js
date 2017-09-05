const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/users', (req, res, next) => {
  User.find({}, {password: 0}).then((users) => {
    res.json({
      code: 0,
      users
    })
  }).catch(next)
})

router.post('/users', (req, res, next) => {
  const userInfo = req.body
  User.find({account: userInfo.account}).then((user) => {
    if (user.length > 0) {
      res.json({
        code: -1,
        msg: '账户名已存在'
      })
    } else {
      User.create(userInfo).then((newUser) => {
        res.json({
          code: 0,
          user: newUser
        })
      })
    }
  })
})

router.put('/users', (req, res, next) => {
  const userInfo = req.body
  const _id = userInfo._id
  User.findOne({_id: _id}).then((user) => {
    if (user.account === userInfo.account) {
      User.update({_id: _id}, userInfo).then((count) => {
        res.json({
          code: 0,
          msg: `修改1条数据成功`
        })
      }).catch(next)
    } else {
      User.find({account: userInfo.account}).then((newUser) => {
        if (newUser.length > 0) {
          res.json({
            code: -1,
            msg: '账户名已存在'
          })
        } else {
          User.update({_id: _id}, userInfo).then((count) => {
            res.json({
              code: 0,
              msg: `修改1条数据成功`
            })
          }).catch(next)
        }
      })
    }
  })
})

router.delete('/users', (req, res, next) => {
  const {_id} = req.query
  User.findByIdAndRemove({_id: _id}).then((item) => {
    res.json({
      code: 0,
      msg: '删除1条数据成功'
    })
  })
})

module.exports = router
