<template>
  <div class="profile">
    <div class="profile-left">
      <img class="profile-avatar" :src="teacher.avatar">
      <span class="profile-name">
        {{teacher.userName}}
        <i-svg :icon="iconName"></i-svg>
      </span>
      <p class="profile-motto">不为失败找借口不为失败找借口不为失败找借口不为失败找借口不为失败找借口</p>
      <p class="profile-rank">
        <span>
          <i-svg icon="jinpai"></i-svg>
          {{teacher.rank}}
        </span>
        <span>|</span>
        <el-rate 
          v-model="teacher.rate"
          disabled
          show-text
          text-color="#ff9900"
          text-template="{value}"
        ></el-rate>
      </p>
      <el-row>
        <el-col :span="8">年龄</el-col>
        <el-col :span="16">{{teacher.birthday | formatAge}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">出生日期</el-col>
        <el-col :span="16">{{teacher.birthday | formatDate}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">入职日期</el-col>
        <el-col :span="16">{{teacher.entryDate | formatDate}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">电话号码</el-col>
        <el-col :span="16">{{teacher.phoneNumber}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">所任课程</el-col>
        <el-col :span="16">{{teacher.job}}</el-col>
      </el-row>
    </div>
    <div class="profile-right">
      <Card title="介绍">
        <div>{{teacher.profile}}</div>    
      </Card>
    </div>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getTeacherById} from 'api/teacher'
import Card from 'components/card/card'
import ISvg from 'components/i-svg/i-svg'

export default {
  components: {
    Card,
    ISvg
  },
  data () {
    return {
      teacher: {
      }
    }
  },
  computed: {
    iconName () {
      if (this.teacher.gender === 'F') {
        return 'nv'
      } else {
        return 'nan'
      }
    }
  },
  created () {
    this._getTeacherById(this.$route.params.id)
  },
  methods: {
    _getTeacherById (id) {
      getTeacherById(id).then((res) => {
        if (OK_CODE === res.code) {
          this.teacher = this._formatRate(res.teacher)
        }
      })
    },
    _formatRate (obj) {
      for (let k in obj) {
        if (k === 'rate') {
          obj[k] = Number(Number(obj[k]).toFixed(1))
        }
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixins.scss";

.profile {
  width: 100%;
  .profile-left {
    float: left;
    width: 280px;
    margin-right: 16px;
    background: $color-text-dark-white;
    border-radius: 8px;
    @include boxShadow;
    @include flexCenter;
    color: $color-text-silver;
    flex-direction: column;
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 32px;
    }
    .profile-name {
      display: block;
      font-size: $font-size-medium;
      padding: 16px 0 8px 0;
      letter-spacing: 2px;
      color: $color-text-light-black;
    }
    .profile-motto {
      font-size: $font-size-small;
      padding: 0 8px;
      text-align: center;
      line-height: 1.5;
    }
    .profile-rank {
      display: flex;
      align-items: center;
      padding: 16px 0;
      span:nth-child(2) {
        margin: 0 8px;
      }
      margin-bottom: 40px;
    }
    .el-row {
      padding: 0 8px;
      width: 100%;
      margin: 8px 0;
      .el-col:nth-child(1){
        text-align: right;
        padding: 0 4px 0 0;
      }
      .el-col:nth-child(2){
        color: $color-text-light-black;
        padding-left: 4px;
      }
    }
  }
  .profile-right {
    overflow: hidden;
  }
}
</style>
