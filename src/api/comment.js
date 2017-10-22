import axios from 'common/js/axiosServer'

export const fetchCommentsByCourseIdAndType = (id, type) => {
  let url = `/api/comments?courseId=${id}&type=${type}`
  return axios.get(url)
  .then((res) => {
    return Promise.resolve(res.data)
  })
}
