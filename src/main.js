// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ISvg from 'components/i-svg/i-svg'
import moment from 'moment'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'common/scss/index.scss'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

moment.locale('zh-cn')
Vue.filter('formatDate', timestamp => {
  return moment(timestamp).format('L')
})

Vue.filter('formatAge', birthday => {
  const timestamp = Date.now() - +new Date(birthday)
  let age = Math.floor(moment.duration(timestamp).asYears())
  return age === 0 ? 1 : age
})

Vue.use(ElementUI)
Vue.component('i-svg', ISvg)

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.role) {
    if (store.getters.token) {
      if (!store.getters.role) {
        store.dispatch('GetUsetByToken').then(() => {
          if (to.meta.role.includes(store.getters.role)) {
            next()
          }
        })
      } else {
        if (to.meta.role.includes(store.getters.role)) {
          next()
        }
      }
    } else {
      NProgress.done()
      ElementUI.Message({
        showClose: true,
        message: '请登录',
        type: 'error'
      })
      next({path: '/login'})
    }
  } else {
    if (store.getters.token) {
      NProgress.done()
      next({path: '/admin'})
    } else {
      NProgress.done()
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
