<template>
  <div class="course-detail">
    <el-row class="course-info">
      <el-col :span="12" class="course-img">
        <img :src="course.picUrl" alt="">
        <p class="campus">
          <span>授课校区：{{course.campus}}</span>
        </p>
      </el-col>
      <el-col :span="12">
        <h3 class="courseName">
          {{course.courseName}}
          <el-tag type="success">{{course.courseType | formatType}}</el-tag>
        </h3>
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
          <el-col :span="3">开课时间</el-col>
          <el-col :span="21">{{course.startDate | formatDate}}</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">结课时间</el-col>
          <el-col :span="21">{{course.endDate | formatDate}}</el-col>          
        </el-row>
        <el-row>
          <el-col :span="3">上课时间</el-col>
          <el-col :span="21">{{course.classTime}}</el-col>          
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
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="课程介绍" name="introduction">{{course.introduction}}</el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
          <comment :comments="commnetsFeedback" @submit="handleSubmit"></comment>
          <span v-show="commnetsFeedback.length === 0">暂无反馈</span>
        </el-tab-pane>
        <el-tab-pane label="课程咨询" name="advisory">
          <comment :comments="commentsAdv" @submit="handleSubmit"></comment>
          <span v-show="commentsAdv.length === 0">暂无咨询</span>
        </el-tab-pane>
        <el-tab-pane :label="getLabelName" :name="course.courseType === 'formal' ? 'students' : 'audition'">
          <el-table
            :data="course.courseType === 'formal' ? students : auditions"
            v-show="students.length > 0 || auditions.length > 0">
            <el-table-column
              prop="studentName"
              label="姓名">
            </el-table-column>
            <el-table-column
              label="性别">
              <template scope="scope">
                {{ scope.row.gender | formatGender }}
              </template>
            </el-table-column>
            <el-table-column 
              label="年龄">
              <template scope="scope">{{ scope.row.birthday | formatAge }}</template>
            </el-table-column>
            <el-table-column 
              label="家长姓名" 
              prop="parentName">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="电话号码">
            </el-table-column>
            <el-table-column 
              label="出生日期" >
              <template scope="scope">{{ scope.row.birthday | formatDate }}</template>
            </el-table-column>
            <el-table-column 
              label="是否停课">
              <template scope="scope">
                <el-tag :type="scope.row.closed ? 'danger' : 'primary'">
                  {{ scope.row.closed ? '是' : '否'}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <span v-if="students.length === 0 && course.courseType === 'formal'">暂无学员</span>
          <span v-if="auditions.length === 0 && course.courseType === 'audition'">暂无试听</span>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import {getCourseById} from 'api/course'
import {fetchCommentsByCourseIdAndType, addComment, updateIsRead} from 'api/comment'
import {getStudentsByCourseId} from 'api/student'
import {getAuditionsByCourseId} from 'api/audition'
import {OK_CODE} from 'api/config'
import Comment from 'components/comment/comment'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      course: {},
      activeName: 'introduction',
      courseId: '',
      commentsAdv: [],
      commnetsFeedback: [],
      students: [],
      auditions: [],
      type: ''
    }
  },
  created () {
    this.courseId = this.$route.params.id
    const {from} = this.$route.query
    this._getCourseById(this.courseId)
    if (from === 'check') {
      updateIsRead(this.courseId).then(res => {
        console.log(res)
      })
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ]),
    getLabelName () {
      if (this.course.courseType === 'formal') {
        return '所有学员'
      } else if (this.course.courseType === 'audition') {
        return '试听学员'
      }
    }
  },
  methods: {
    handleTabClick (tab, event) {
      const type = tab.name
      if (type === 'introduction') {

      } else if (type === 'students') {
        getStudentsByCourseId(this.courseId).then((res) => {
          if (res.code === OK_CODE) {
            this.students = res.students
          }
        })
      } else if (type === 'audition') {
        getAuditionsByCourseId(this.courseId).then(res => {
          console.log(res.auditions)
          if (res.code === OK_CODE) {
            this.auditions = res.auditions
          }
        })
      } else {
        fetchCommentsByCourseIdAndType(this.courseId, type).then((res) => {
          if (res.code === OK_CODE) {
            if (type === 'advisory') {
              this.commentsAdv = res.comments
            } else if (type === 'feedback') {
              this.commnetsFeedback = res.comments
            }
          }
        })
      }
    },
    handleSubmit (comment, content) {
      if (!content) {
        return
      }
      const data = {
        id: comment._id,
        from: this.id,
        content
      }
      addComment(data).then((res) => {
        if (res.code === OK_CODE) {
          fetchCommentsByCourseIdAndType(this.courseId, comment.type).then((res) => {
            if (res.code === OK_CODE) {
              if (comment.type === 'advisory') {
                this.commentsAdv = res.comments
              } else if (comment.type === 'feedback') {
                this.commnetsFeedback = res.comments
              }
            }
          })
        }
      })
    },
    _getCourseById (id) {
      getCourseById(id).then((res) => {
        if (res.code === OK_CODE) {
          this.course = res.course
        }
      })
    }
  },
  components: {
    Comment
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
        height: 250px;
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
