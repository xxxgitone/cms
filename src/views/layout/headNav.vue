<template>
  <el-menu 
    mode="horizontal"
  >
    <el-menu-item>
      <el-dropdown>
        <span class="el-dropdown-link avatar">
          <img src="../../common/img/jerry.jpeg">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
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
