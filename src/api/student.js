import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getStudents = (data) => {
  let url = '/api/students'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => Promise.resolve(res.data))
}

export const getStudentsCountByDate = (date, campus) => {
  let url = '/api/students/count'
  return axios.get(`${url}?date=${date}&campus=${campus}`)
  .then(res => Promise.resolve(res.data))
}

export const deleteStudent = (_id) => {
  const url = '/api/students'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => Promise.resolve(res.data))
}

export const getStudentsByCourseId = (_id) => {
  const url = '/api/studentsByCourseId'
  return axios.get(`${url}?_id=${_id}`)
  .then(res => Promise.resolve(res.data))
}
