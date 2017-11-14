import axios from 'common/js/axiosServer'

export const getAuditions = () => {
  const url = '/api/audition'
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}

export const getAuditionsByCourseId = (id) => {
  const url = '/api/auditionsByCourseId'
  console.log(`${url}？_id=${id}`)
  return axios.get(`${url}?_id=${id}`)
  .then(res => Promise.resolve(res.data))
}

export const addAudition = (data) => {
  const url = '/api/audition'
  return axios.post(url, data)
  .then(res => Promise.resolve(res.data))
}
