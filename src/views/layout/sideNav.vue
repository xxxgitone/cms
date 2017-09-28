<template>
  <el-menu 
    :default-active="activeIndex" 
    :collapse="isCollapse"
    theme="dark"
    class="el-menu-vertical"
    router
    unique-opened
  >
    <el-menu-item index="home">
      <i-svg icon="home"></i-svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i-svg icon="course"></i-svg>
        <span slot="title">导航一</span>
      </template> 
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
    </el-submenu>
    <el-menu-item index="student" :route="{path: '/admin/student'}">
      <i class="el-icon-menu"></i>
      <span slot="title">学员管理</span>
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
      <el-menu-item index="4-5">教师管理</el-menu-item>      
    </el-submenu>
  </el-menu>
</template>

<script>
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
