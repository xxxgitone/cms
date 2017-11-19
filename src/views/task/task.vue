<template>
  <div class="task">
    <el-form :model="task" ref="form" label-width="100px">
      <el-form-item label="任务类型">
        <el-select v-model="task.type" placeholder="请选择任务类型" clearable>
          <el-option label="业绩任务" value="performance"></el-option>
          <el-option label="普通任务" value="ordinary"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务时间" v-if="task.type === 'ordinary'">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="task.startDate" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center;">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择时间" v-model="task.endDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="任务内容" v-if="task.type === 'ordinary'">
        <el-input v-model="task.content" placeholder="请填写任务内容"></el-input>
      </el-form-item>
      <el-form-item label="本月业绩目标" v-if="task.type === 'performance'">
        <el-input v-model="task.performance" placeholder="请填写业绩目标"></el-input>
      </el-form-item>
    </el-form>
    <div class="handle-button">
      <el-button 
        type="primary"
        @click="addConfirm">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {addTask} from 'api/task'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      task: {
        user: '',
        status: 'pending',
        startDate: '',
        createAt: '',
        performance: '',
        content: '',
        endDate: '',
        type: '',
        campus: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'campus'
    ])
  },
  methods: {
    addConfirm () {
      Object.assign(this.task, {
        user: this.id,
        campus: this.campus
      })
      addTask(this.task).then(res => {
        if (res.code === OK_CODE) {
          this.$message({
            showClose: true,
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/admin/schedule')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.task {
  width: 100%;
  border-radius: 8px;
  padding: 16px 0 16px 0;
  background: $color-bg-dark-white;
  .el-form {
    margin: 0 auto;
    width: 40%;
  }
  .handle-button {
    width: 40%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
