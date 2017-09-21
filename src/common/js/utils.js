export const setEmptyString = (obj) => {
  for (let k in obj) {
    obj[k] = ''
  }
}

export const param = (data) => {
  let url = ''
  for (var k in data) {
    let val = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${val}`
  }
  return url ? url.substr(1) : ''
}

export const getIds = (arr) => {
  let _ids = []
  arr.forEach((item) => {
    if (item._id) {
      _ids.push(item._id)
    }
  })
  return _ids
}

export const debounce = (func, wait) => {
  let timer

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
