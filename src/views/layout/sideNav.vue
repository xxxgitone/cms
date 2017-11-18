<template>
  <el-menu 
    :default-active="activeIndex" 
    :collapse="isCollapse"
    theme="dark"
    class="el-menu-vertical"
    router
    unique-opened>
    <el-menu-item index="home" :route="{path: '/admin/home'}">
      <i-svg icon="home"></i-svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1" v-if="role === 'admin'">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span>消息通知</span>
      </template>
      <el-menu-item index="task" :route="{path: '/admin/task'}">下发任务</el-menu-item>
      <el-menu-item index="schedule" :route="{path: '/admin/schedule'}">任务进度</el-menu-item>      
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i-svg icon="course"></i-svg>
        <span slot="title">试听预约</span>
      </template> 
      <el-menu-item index="audition" :route="{path:'/admin/audition'}">预约记录</el-menu-item>
      <el-menu-item index="reservation" :route="{path:'/admin/reservation'}">学员预约</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">学员管理</span>
      </template> 
      <el-menu-item index="student" :route="{path: '/admin/student'}">学员信息</el-menu-item>
      <el-menu-item index="apply" :route="{path: '/admin/apply'}">学员报名</el-menu-item>
    </el-submenu>
    <el-menu-item index="order" :route="{path: '/admin/order'}">
      <i-svg icon="order"></i-svg>
      <span slot="title">学员订单</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i> 
        <span slot="title">基础信息</span>
      </template> 
      <el-menu-item index="user" :route="{path: '/admin/user'}">用户管理</el-menu-item>
      <el-menu-item index="teacher" :route="{path: '/admin/teacher'}">教师管理</el-menu-item>
      <el-menu-item index="course" :route="{path: '/admin/course'}">课程管理</el-menu-item>
      <el-menu-item index="campus" :route="{path: '/admin/campus'}">校区管理</el-menu-item>   
    </el-submenu>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: ''
    }
  },
  created () {
    this._getActiveIndex()
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  methods: {
    _getActiveIndex () {
      const {path} = this.$route
      const start = path.lastIndexOf('/')
      this.activeIndex = path.substring(start + 1)
    }
  },
  watch: {
    $route () {
      this._getActiveIndex()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 225px;
}
</style>
