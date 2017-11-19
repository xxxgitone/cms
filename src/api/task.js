import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getTasks = (data) => {
  let url = '/api/task'
  url += '?' + param(data)
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}

export const addTask = (data) => {
  const url = '/api/task'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
