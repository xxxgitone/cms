const Course = require('../models/course')

const fetchCourse = async (ctx) => {
  const course = await Course.find()
  const tags = await Course.distinct('tag')
  ctx.body = {
    code: 0,
    course,
    tags
  }
}

const fetchCourseById = async (ctx) => {
  const _id = ctx.query._id
  const course = await Course.findOne({_id: _id})
  ctx.body = {
    code: 0,
    course
  }
}

const addCourse = async (ctx) => {
  const course = ctx.request.body
  const data = await Course.create(course)
  ctx.body = {
    code: 0,
    course: data
  }
}

const updateCourse = async (ctx) => {
  const course = ctx.request.body
  const _id = course._id
  const data = await Course.update({_id: _id}, course)
  if (data.n) {
    ctx.body = {
      code: 0,
      msg: `修改信息成功`
    }
  }
}

const deleteCourse = async (ctx) => {
  const {_id} = ctx.request.query
  const item = await Course.findByIdAndRemove({_id: _id})
  if (item._id) {
    ctx.body = {
      code: 0,
      msg: '删除1条数据成功'
    }
  }
}

module.exports = {
  fetchCourse,
  fetchCourseById,
  addCourse,
  updateCourse,
  deleteCourse
}
