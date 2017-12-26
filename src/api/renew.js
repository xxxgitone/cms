import axios from 'common/js/axiosServer'

export const addAfterPayment = (data) => {
  let url = '/api/renew'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
