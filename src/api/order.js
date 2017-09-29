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
