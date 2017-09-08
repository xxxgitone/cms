import axios from 'axios'
import store from '../../store'

const server = axios.create({
  baseURL: process.env.BaseURL,
  timeout: 5000
})

server.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['cms-token'] = store.getters.token
  }
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
})

server.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log('err ' + error)
  return Promise.reject(error)
})

export default server
