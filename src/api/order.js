import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getOrders = (data) => {
  let url = '/api/orders'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => Promise.resolve(res.data))
}

export const getOrdersCountByDate = (date) => {
  let url = '/api/order/count'
  return axios.get(`${url}?date=${date}`)
  .then(res => Promise.resolve(res.data))
}

export const addOrder = (data) => {
  let url = '/api/orders'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
