const Teacher = require('../models/teacher')

const fetchTeachers = async (ctx) => {
  const query = ctx.query.campus ? {campus: ctx.query.campus} : {}
  const pagenum = Number(ctx.query.pagenum) || 1
  const pagesize = Number(ctx.query.pagesize) || 10
  const total = await Teacher.find(query).count()
  const teachers = await Teacher.find(query)
      .skip((pagenum - 1) * pagesize)
      .limit(pagesize)
  ctx.body = {
    total,
    code: 0,
    teachers
  }
}

const addTeacher = async (ctx) => {
  const teacher = ctx.request.body
  const data = await Teacher.create(teacher)
  ctx.body = {
    code: 0,
    teacher: data
  }
}

const updateTeacher = async (ctx) => {
  const teacher = ctx.request.body
  const _id = teacher._id
  const data = Teacher.update({_id: _id}, teacher)
  if (data) {
    ctx.body = {
      code: 0,
      msg: `修改1条数据成功`
    }
  }
}

const deleteTeacher = async (ctx) => {
  const {_id} = ctx.request.query
  if (_id.indexOf(',') > -1) {
    const _ids = _id.split(',')
    const item = Teacher.remove({_id: {$in: _ids}})
    const count = item && item.result && item.result.n
    if (count > 0) {
      ctx.body = {
        code: 0,
        msg: `删除${count}条数据成功`
      }
    }
  } else {
    const item = Teacher.findByIdAndRemove({_id: _id})
    if (item) {
      ctx.body = {
        code: 0,
        msg: '删除1条数据成功'
      }
    }
  }
}

module.exports = {
  fetchTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher
}
