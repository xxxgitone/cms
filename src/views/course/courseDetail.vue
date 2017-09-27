<template>
  <div class="course-detail">
    <el-row class="course-info">
      <el-col :span="12" class="course-img">
        <img src="http://px.thea.cn/Public/Upload/2687389/Intro/1458272781.png" alt="">
        <p class="campus">
          <span>授课校区：{{course.campus}}</span>
        </p>
      </el-col>
      <el-col :span="12">
        <h3 class="courseName">{{course.courseName}}</h3>
        <el-row>
          <el-col :span="3">任课老师</el-col>
          <el-col :span="21">{{course.teacher}}</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">课时</el-col>
          <el-col :span="21">{{course.period}}分钟</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">总课时</el-col>
          <el-col :span="21">56</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">价格</el-col>
          <el-col :span="21">{{course.price}}</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">上课时间</el-col>
          <el-col :span="21">每周六、日下午两点～四点</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">学员人数</el-col>
          <el-col :span="21">23</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">预计人数</el-col>
          <el-col :span="21">25</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">适合人群</el-col>
          <el-col :span="21">5岁～15岁</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">课程评分</el-col>
          <el-col :span="21">
            <el-rate 
              v-model="course.rate"
              disabled
              show-text
              text-color="#ff9900"
              text-template="{value}"
            ></el-rate>  
          </el-col>          
        </el-row>
      </el-col>      
    </el-row>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程介绍" name="introduction">{{course.introduction}}</el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">课程反馈</el-tab-pane>
        <el-tab-pane label="所有学员" name="students">所有学员</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import {getCourseById} from 'api/course'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      course: [],
      activeName: 'introduction'
    }
  },
  created () {
    const {id} = this.$route.params
    this._getCourseById(id)
  },
  methods: {
    _getCourseById (id) {
      getCourseById(id).then((res) => {
        if (res.code === OK_CODE) {
          this.course = res.course
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.course-detail {
  background: $color-bg-dark-white;
  .course-info {
    padding: 24px 0;
    .course-img {
      text-align: center;
      img {
        width: 400px;
      }
      .campus {
        text-align: left;
        padding: 4px;
        color: $color-text-silver;
        font-size: $font-size-medium;
        margin-left: 66px;
      }
    }
    .el-col:nth-child(2) {
      .courseName {
        padding: 0;
        margin: 0;
        color: $color-text-light-black;
        padding-bottom: 8px;
      }
      .el-row {
        padding-top: 8px;
        color: $color-text-light-black;
        .el-col:nth-child(1) {
          text-align: right;
          color: $color-text-silver;
        }
        .el-col:nth-child(2) {
          padding-left: 8px;
        }
      }
    }
  }
  .el-tabs {
    width: 88%;
    margin: 0 auto;
    color: $color-text-silver;
  }
}
</style>
