<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/manage/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scpoed>
.breadcrumb {
  margin: 24px;
}
</style>
