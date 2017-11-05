import axios from 'common/js/axiosServer'

export const getAuditions = () => {
  const url = '/api/audition'
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}
