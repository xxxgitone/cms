import axios from 'common/js/axiosServer'
import {param} from 'common/js/utils'

export const getOrders = (data) => {
  let url = '/api/orders'
  url += '?' + param(data)
  return axios.get(url)
  .then((res) => Promise.resolve(res.data))
}

export const getOrdersCountByDate = (date, campus) => {
  let url = '/api/order/count'
  return axios.get(`${url}?date=${date}&campus=${campus}`)
  .then(res => Promise.resolve(res.data))
}

export const getTotalSalesByCurrentMonth = () => {
  let url = '/api/order/curMonth'
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}

export const getTotalSalesByWeekday = () => {
  let url = '/api/order/week'
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}

export const getTotalSalesByDate = (date, campus) => {
  let url = '/api/order/totalSales'
  return axios.get(`${url}?date=${date}&campus=${campus}`)
  .then(res => Promise.resolve(res.data))
}

export const addOrder = (data) => {
  let url = '/api/orders'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
