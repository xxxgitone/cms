import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('views/layout/layout')
const UserManage = () => import('views/userManage/userManage')
const Home = () => import('views/home/home')
const Login = () => import('views/login/login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/manage',
      component: Layout,
      redirect: '/manage/home',
      children: [
        {
          path: 'home',
          component: Home,
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'user',
          component: UserManage,
          name: ['基础数据', '用户管理'],
          meta: {role: ['admin', 'front']}
        }
      ]
    }
  ]
})
