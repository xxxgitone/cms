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