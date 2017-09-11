const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher')

router.get('/teachers', (req, res, next) => {
  const query = req.query.campus ? {campus: req.query.campus} : {}
  const pagenum = Number(req.query.pagenum) || 1
  const pagesize = Number(req.query.pagesize) || 10
  Teacher.find(query).count().then((count) => {
    const total = count
    Teacher.find(query)
      .skip((pagenum - 1) * pagesize)
      .limit(pagesize)
      .then((teachers) => {
        res.json({
          total,
          code: 0,
          teachers
        })
      })
  }).catch(next)
})

router.post('/teachers', (req, res, next) => {
  const teacher = req.body
  Teacher.create(teacher).then((teacher) => {
    res.json({
      code: 0,
      teacher: teacher
    })
  })
})

router.put('/teachers', (req, res, next) => {
  const teacher = req.body
  const _id = teacher._id
  Teacher.update({_id: _id}, teacher).then((teacher) => {
    res.json({
      code: 0,
      msg: `修改1条数据成功`
    })
  }).catch(next)
})

router.delete('/teachers', (req, res, next) => {
  const {_id} = req.query
  if (_id.indexOf(',') > -1) {
    const _ids = _id.split(',')
    Teacher.remove({_id: {$in: _ids}}).then((item) => {
      const count = item.result.n
      res.json({
        code: 0,
        msg: `删除${count}条数据成功`
      })
    })
  } else {
    Teacher.findByIdAndRemove({_id: _id}).then((item) => {
      res.json({
        code: 0,
        msg: '删除1条数据成功'
      })
    })
  }
})

module.exports = router
