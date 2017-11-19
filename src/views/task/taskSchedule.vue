<template>
  <div class="schedule">
    <ul>
      <li v-for="item in tasks" :key="item._id" class="schedule-item">
        <span class="title">
          <span>任务名称：</span>
          <span v-if="item.content">{{item.content}}</span>
          <span v-if="item.type === 'performance'">本月业绩目标</span>
          <p class="time">任务时间： <span>{{item.startDate | formatDate}}</span> ~ <span>{{item.endDate | formatDate}}</span> </p>
        </span>
        <el-steps 
          v-if="item.type === 'ordinary'" 
          :space="100" 
          :active="active[item.status]" 
          finish-status="success">
          <el-step title="准备"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-progress 
          v-if="item.type === 'performance'"  
          type="circle" 
          :percentage="percentage">
        </el-progress>
      </li>
    </ul>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getTasks} from 'api/task'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      tasks: [],
      active: {
        pending: 1,
        progress: 2,
        fulfilled: 3
      },
      percentage: 0
    }
  },
  created () {
    this._getTasks()
  },
  computed: {
    ...mapGetters([
      'campus'
    ])
  },
  methods: {
    _getTasks () {
      const data = {
        campus: this.campus
      }
      getTasks(data).then(res => {
        if (res.code === OK_CODE) {
          this.tasks = res.tasks
          console.log(this.tasks)
        }
      })
    }
  }
}
</script>

<style lang="scss" soped>
@import ".././../common/scss/variable.scss";

.schedule {
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .schedule-item {
    width: 30%;
    margin-left: 1%;
    margin-right: 2%;
    margin-bottom: 16px;
    padding: 8px 16px;
    color: $color-text-silver;
    background: $color-bg-dark-white;
    .title {
      display: inline-block;
      padding-bottom: 10px;
    }
    .time {
      padding: 4px 0;
      span {
        font-size: $font-size-small;
      }
    }
  }
}
</style>
