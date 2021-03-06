import axios from 'common/js/axiosServer'

export const fetchCommentsByCourseIdAndType = (id, type) => {
  let url = `/api/comments?courseId=${id}&type=${type}`
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const fetchCommentsByType = (type) => {
  const url = `/api/comments?type=${type}`
  return axios.get(url)
  .then(res => Promise.resolve(res.data))
}

export const addComment = (data) => {
  let url = '/api/comments'
  return axios.post(url, data)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

export const updateIsRead = (courseId) => {
  const url = '/api/comments'
  return axios.put(url, {courseId})
  .then(res => Promise.resolve(res.data))
}
