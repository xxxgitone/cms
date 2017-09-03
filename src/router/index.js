import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('views/layout/layout')
const UserManage = () => import('views/userManage/userManage')
const Home = () => import('views/home/home')

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
          component: Home
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
