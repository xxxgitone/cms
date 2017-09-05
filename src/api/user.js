import axios from 'axios'

export const getUsers = () => {
  const url = '/api/users'
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addUser = (userInfo) => {
  const url = '/api/users'
  return axios.post(url, userInfo)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const editUser = (userInfo) => {
  const url = '/api/users'
  return axios.put(url, userInfo)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const deleteUser = (_id) => {
  const url = '/api/users'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
