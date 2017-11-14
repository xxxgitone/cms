import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getOrders = (data) => {
  let url = '/api/orders'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addOrder = (data) => {
  let url = '/api/orders'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
