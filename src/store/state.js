import {CMS_TOKEN} from 'common/js/config'

const state = {
  account: '',
  id: '',
  token: localStorage.getItem(CMS_TOKEN) || '',
  role: '',
  userName: '',
  campus: '',
  avatar: ''
}

export default state
