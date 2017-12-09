<template>
  <el-menu 
    mode="horizontal"
  >
    <el-menu-item index="1">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link avatar">
          <img :src="avatar">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="layout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    handleCommand (command) {
      if (command === 'layout') {
        this.Logout().then(() => {
          this.$router.push('/')
          this.$message({
            showClose: true,
            message: '退出成功',
            type: 'success'
          })
        })
      }
    },
    ...mapActions([
      'Logout'
    ])
  }
}
</script>

<style lang="scss" scopde>
.avatar {
  width: 45px;
  height: 45px;
  img {
    max-height: 100%;
    width: 45px;
    border-radius: 50%;
  }
}
</style>
