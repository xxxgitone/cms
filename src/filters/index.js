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

export function timeAgo (timestamp) {
  const nowTime = Date.now()
  timestamp = new Date(timestamp)
  const diff = nowTime - timestamp
  const int = parseInt
  let timeAgo
  if (diff < 60 * 1000) {
    timeAgo = '刚刚'
  } else if (60 * 1000 <= diff && diff < 60 * 60 * 1000) {
    timeAgo = `${int(diff / (60 * 1000))}分钟前`
  } else if (60 * 60 * 1000 <= diff && diff < 24 * 60 * 60 * 1000) {
    timeAgo = `${int(diff / (1000 * 60 * 60))}小时前`
  } else if (24 * 60 * 60 * 1000 <= diff && diff < 30 * 24 * 60 * 60 * 1000) {
    timeAgo = `${int(diff / (1000 * 60 * 60 * 24))}天前`
  } else if (30 * 24 * 60 * 60 * 1000 <= diff && diff < 12 * 30 * 24 * 60 * 60 * 1000) {
    timeAgo = `${int(diff / (1000 * 60 * 60 * 24 * 30))}月前`
  } else {
    timeAgo = `${int(diff / (12 * 30 * 24 * 60 * 60 * 1000))}`
  }
  return timeAgo
}

export function formatGender (gender) {
  if (gender === 'M') {
    return '男'
  } else {
    return '女'
  }
}

export function formatRole (role) {
  if (role === 'admin') {
    return '管理员'
  } else if (role === 'front') {
    return '校区前台'
  }
}
