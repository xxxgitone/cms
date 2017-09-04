import axios from 'axios'

export const getUsers = () => {
  const url = '/api/users'
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
