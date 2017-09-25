import axios from 'common/js/axiosServer'

export const getCourses = () => {
  let url = '/api/courses'
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addCourse = (course) => {
  const url = '/api/courses'
  return axios.post(url, course)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const editCourse = (course) => {
  const url = '/api/courses'
  return axios.put(url, course)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const deleteCourse = (_id) => {
  const url = '/api/courses'
  return axios.delete(`${url}?_id=${_id}`)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
