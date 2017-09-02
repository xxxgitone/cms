import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('views/layout/layout')
const UserManage = () => import('views/userManage/userManage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/manage',
      component: Layout,
      redirect: '/manage/home',
      children: [
        {
          path: 'home',
          component: UserManage
        },
        {
          path: 'user',
          component: UserManage,
          name: ['基础数据', '用户管理']
        }
      ]
    }
  ]
})
