const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

router.get('/users', (req, res, next) => {
  const query = req.query.campus ? {campus: req.query.campus} : {}
  const pagenum = Number(req.query.pagenum) || 1
  const pagesize = Number(req.query.pagesize) || 10
  User.find(query, {password: 0}).count().then((count) => {
    const total = count
    User.find(query, {password: 0})
      .skip((pagenum - 1) * pagesize)
      .limit(pagesize)
      .then((users) => {
        res.json({
          total,
          code: 0,
          users
        })
      })
  }).catch(next)
})

router.get('/user', (req, res, next) => {
  const {id} = req.decoded
  User.findById(id).then((user) => {
    res.json({
      code: 0,
      user
    })
  })
})

router.post('/users', (req, res, next) => {
  const userInfo = req.body
  const {action} = userInfo
  if (action === 'login') {
    User.findOne({account: userInfo.account}).then((user) => {
      if (user != null) {
        if (user.password !== userInfo.password) {
          res.json({
            code: -1,
            msg: '验证失败，密码错误'
          })
        } else {
          const userToken = {
            account: user.account,
            id: user._id
          }
          const token = jwt.sign(userToken, config.tokenSecret)
          res.json({
            code: 0,
            msg: '登录成功',
            token: token,
            role: user.role
          })
        }
      } else {
        res.json({
          code: -1,
          msg: '用户不存在'
        })
      }
    })
  } else {
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
  }
})

router.put('/users', (req, res, next) => {
  const userInfo = req.body
  const _id = userInfo._id
  User.findOne({_id: _id}).then((user) => {
    if (user.account === userInfo.account) {
      User.update({_id: _id}, userInfo).then((item) => {
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
          User.update({_id: _id}, userInfo).then((item) => {
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
  if (_id.indexOf(',') > -1) {
    const _ids = _id.split(',')
    User.remove({_id: {$in: _ids}}).then((item) => {
      const count = item.result.n
      res.json({
        code: 0,
        msg: `删除${count}条数据成功`
      })
    })
  } else {
    User.findByIdAndRemove({_id: _id}).then((item) => {
      res.json({
        code: 0,
        msg: '删除1条数据成功'
      })
    })
  }
})

module.exports = router
