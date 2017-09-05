export const setEmptyString = (obj) => {
  for (let o in obj) {
    obj[o] = ''
  }
}
