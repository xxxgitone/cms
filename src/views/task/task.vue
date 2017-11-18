<template>
  <div class="task">
    <el-form :model="task" ref="form" label-width="80px">
      
    </el-form>
    <div class="handle-button">
      <el-button 
        type="primary"
        @click="applyConfirm">
        确定预约
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // task: {

      // }
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.task {
  width: 100%;
  background: $color-bg-dark-white;
  border-radius: 8px;
  padding: 16px 0 16px 0;
  .el-form {
    margin: 0 auto;
    width: 60%;
  }
  .handle-button {
    width: 60%;
    margin: 0 auto;
    text-align: right;
  }
}
</style>
