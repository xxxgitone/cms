import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getTeachers = (data) => {
  let url = '/api/teachers'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const getCampusAllTeachers = (campus) => {
  let url = '/api/getAllTeachers'
  return axios.get(`${url}?campus=${campus}`)
  .then(res => Promise.resolve(res.data))
}

export const getTeacherById = (id) => {
  let url = '/api/teacher'
  return axios.get(`${url}?_id=${id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addTeacher = (teacher) => {
  const url = '/api/teachers'
  return axios.post(url, teacher)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const editTeacher = (teacher) => {
  const url = '/api/teachers'
  return axios.put(url, teacher)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const deleteTeacher = (_id) => {
  const url = '/api/teachers'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
