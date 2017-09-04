// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import ISvg from 'components/i-svg/i-svg'
import moment from 'moment'

import 'common/scss/index.scss'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

moment.locale('zh-cn')
Vue.filter('formatDate', timestamp => {
  return moment(timestamp).format('L')
})

Vue.use(ElementUI)
Vue.component('i-svg', ISvg)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
