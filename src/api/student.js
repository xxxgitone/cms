import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getStudents = (data) => {
  let url = '/api/students'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const deleteStudent = (_id) => {
  const url = '/api/students'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const getStudentsByCourseId = (_id) => {
  const url = '/api/studentsByCourseId'
  return axios.get(`${url}?_id=${_id}`)
  .then(res => Promise.resolve(res.data))
}
