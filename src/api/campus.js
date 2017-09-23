import axios from 'common/js/axiosServer'

export const getCampus = () => {
  let url = '/api/campus'
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addCampus = (Campus) => {
  const url = '/api/campus'
  return axios.post(url, Campus)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const editCampus = (Campus) => {
  const url = '/api/campus'
  return axios.put(url, Campus)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const deleteCampus = (_id) => {
  const url = '/api/campus'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
