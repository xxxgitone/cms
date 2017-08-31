import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('views/layout/layout')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/manage',
      component: Layout
    }
  ]
})
