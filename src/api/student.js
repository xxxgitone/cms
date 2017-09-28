import axios from 'common/js/axiosServer'

export const getStudents = () => {
  let url = '/api/students'
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
