import axios from 'common/js/axiosServer'

export const addTask = (data) => {
  const url = '/api/task'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
