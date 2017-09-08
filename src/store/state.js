import {CMS_TOKEN} from 'common/js/config'

const state = {
  account: '',
  token: localStorage.getItem(CMS_TOKEN) || '',
  role: '',
  userName: '',
  campus: '',
  avatar: ''
}

export default state
