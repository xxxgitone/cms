import * as types from './mutation-types'

const mutations = {
  [types.SET_ACCOUNT] (state, account) {
    state.account = account
  },
  [types.SET_ID] (state, id) {
    state.id = id
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_ROLE] (state, role) {
    state.role = role
  },
  [types.SET_USER_NAME] (state, userName) {
    state.userName = userName
  },
  [types.SET_CAMPUS] (state, campus) {
    state.campus = campus
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar
  }
}

export default mutations
