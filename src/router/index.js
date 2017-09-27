import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('views/layout/layout')
const UserManage = () => import('views/userManage/userManage')
const Home = () => import('views/home/home')
const Login = () => import('views/login/login')
const TeacherManage = () => import('views/teacher/teacherManage')
const TeacherEdit = () => import('views/teacher/teacherEdit')
const Profile = () => import('views/profile/profile')
const Campus = () => import('views/campus/campusManage')
const CourseManage = () => import('views/course/courseManage')
const CourseEdit = () => import('views/course/courseEdit')
const CourseDetail = () => import('views/course/courseDetail')

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
      path: '/admin',
      component: Layout,
      redirect: '/admin/home',
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
        },
        {
          path: 'teacher',
          component: TeacherManage,
          name: ['基础数据', '教师管理'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'teacher/:id',
          component: Profile,
          name: ['基础数据', '教师管理', '个人简介'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'teacher/info/add',
          component: TeacherEdit,
          name: ['基础数据', '教师管理', '添加教师'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'teacher/edit/:id',
          component: TeacherEdit,
          name: ['基础数据', '教师管理', '修改信息'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'campus',
          component: Campus,
          name: ['基础数据', '校区管理'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'course',
          component: CourseManage,
          name: ['基础数据', '课程管理'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'course/info/add',
          component: CourseEdit,
          name: ['基础数据', '课程管理', '添加课程'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'course/edit/:id',
          component: CourseEdit,
          name: ['基础数据', '课程管理', '修改课程'],
          meta: {role: ['admin', 'front']}
        },
        {
          path: 'course/:id',
          component: CourseDetail,
          name: ['基础数据', '课程管理', '课程信息'],
          meta: {role: ['admin', 'front']}
        }
      ]
    }
  ]
})
