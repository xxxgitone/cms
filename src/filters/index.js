import moment from 'moment'
moment.locale('zh-cn')

export function formatDate (timestamp) {
  return moment(timestamp).format('L')
}

export function formatAge (birthday) {
  const timestamp = Date.now() - +new Date(birthday)
  let age = Math.floor(moment.duration(timestamp).asYears())
  return age === 0 ? 1 : age
}

export function formatGender (gender) {
  if (gender === 'M') {
    return '男'
  } else {
    return '女'
  }
}
