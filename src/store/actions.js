import * as types from './mutation-types'
import {loginByAccount, getUserByToken} from 'api/user'
import {OK_CODE, ERR_CODE} from 'api/config'
import {CMS_TOKEN} from 'common/js/config'

export const LoginByAccount = ({commit}, loginForm) => {
  return loginByAccount(loginForm).then((res) => {
    if (res.code === OK_CODE) {
      localStorage.setItem(CMS_TOKEN, res.token)
      commit(types.SET_TOKEN, res.token)
      return Promise.resolve(res.msg)
    } else if (res.code === ERR_CODE) {
      return Promise.reject(res.msg)
    }
  })
}

export const GetUsetByToken = ({commit}) => {
  return getUserByToken().then((res) => {
    if (res.code === OK_CODE) {
      commit(types.SET_ROLE, res.user.role)
      commit(types.SET_ID, res.user._id)
      commit(types.SET_CAMPUS, res.user.campus)
      commit(types.SET_ACCOUNT, res.user.account)
      commit(types.SET_USER_NAME, res.user.userName)
      commit(types.SET_AVATAR, res.user.avatar)
      return Promise.resolve(res.user)
    } else if (res.code === ERR_CODE) {
      return Promise.reject(res.msg)
    }
  })
}

export const Logout = ({commit}) => {
  return new Promise((resolve, reject) => {
    commit(types.SET_TOKEN, '')
    commit(types.SET_ROLE, '')
    commit(types.SET_ID, '')
    commit(types.SET_CAMPUS, '')
    commit(types.SET_ACCOUNT, '')
    commit(types.SET_USER_NAME, '')
    commit(types.SET_AVATAR, '')
    localStorage.clear(CMS_TOKEN)
    resolve()
  })
}
