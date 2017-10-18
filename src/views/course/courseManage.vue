<template>
  <div class="course">
    <el-row class="course-search">
      分类
      <tags-list :data="tags" @clicked="handleTagClick"></tags-list>
      <el-select 
        v-model="courseType" 
        clearable 
        placeholder="课程类型" 
        class="course-type" 
        @change="handleTypeChange"
      >
        <el-option 
          v-for="item in options" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value"
        ></el-option>
      </el-select>
      <search-boxs
        @handleChange="handleChange"
        @query="searchByQuery"
        placeholder="请输入课程名查询"
      ></search-boxs>
    </el-row>
    <course-list 
      :data="courses" 
      @edit="handleEdit"
      @deleted="handleDelete"
      @checked="handleCheck"
    ></course-list>
    <span class="add" @click="handleAdd">
      <i class="el-icon-plus"></i>
    </span>
    <el-dialog title="选择新增课程类型" :visible.sync="dialogTableVisible" size="tiny">
      <div class="type-buttons">
        <a href="#" @click.prevent="handleAddFormal">正式课程</a>
        <a href="#" @click.prevent="handleAddAudition">试听课程</a>  
      </div>    
    </el-dialog>
    <el-row>
      <el-col :span="24" class="pagination" v-show="courses.length > 0 && total > 16">
        <el-pagination 
          layout="total, prev, pager, next" 
          :total="total"
          :page-size="pagesize"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TagsList from 'components/tags-list/tags-list'
import CourseList from 'components/course-list/course-list'
import SearchBoxs from 'components/search-boxs/search-boxs'
import {getCourses, deleteCourse} from 'api/course'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      courses: [],
      tags: [],
      total: 0,
      pagenum: 1,
      currentPage: 1,
      pagesize: 16,
      campusVal: '',
      query: '',
      tag: '',
      dialogTableVisible: false,
      courseType: '',
      options: [
        {
          label: '正式课程',
          value: 'formal'
        },
        {
          label: '试听课程',
          value: 'audition'
        }
      ]
    }
  },
  created () {
    this._getCoursesByQuery()
  },
  methods: {
    handleCurrentChange (val) {
      this.pagenum = val
      this.$router.push(`/admin/course?pagenum=${this.pagenum}`)
    },
    handleChange (val) {
      this.campusVal = val
      this.handleVal(val)
    },
    handleTypeChange (val) {
      this.courseType = val
      this.handleVal(val)
    },
    handleVal (val) {
      console.log(val)
      this._getCoursesByQuery()
      this.currentPage = 1
      if (!val) {
        this._getCoursesByQuery()
        this.currentPage = 1
      }
    },
    searchByQuery (query) {
      this.query = query
      this._getCoursesByQuery()
      this.currentPage = 1
    },
    handleTagClick (tag) {
      if (tag === '全部') {
        this.tag = ''
      } else {
        this.tag = tag
      }
      this._getCoursesByQuery()
      this.currentPage = 1
    },
    handleAdd () {
      this.dialogTableVisible = true
    },
    handleAddFormal () {
      this.$router.push('/admin/course/info/add?type=formal')
    },
    handleAddAudition () {
      this.$router.push('/admin/course/info/add?type=audition')
    },
    handleEdit (item) {
      this.$router.push(`/admin/course/edit/${item._id}`)
    },
    handleCheck (item) {
      this.$router.push(`/admin/course/${item._id}`)
    },
    handleDelete (item) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCourse(item._id).then((res) => {
          if (res.code === OK_CODE) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
            this._getCoursesByQuery()
          }
        })
      }).catch(() => {
      })
    },
    _getCourses (data) {
      getCourses(data).then((res) => {
        if (res.code === OK_CODE) {
          this.tags = ['全部'].concat(res.tags)
          this.courses = res.course
          this.total = res.total
        }
      })
    },
    _getCoursesByQuery () {
      const {pagenum} = this.$route.query
      const campusVal = this.campusVal ? this.campusVal : ''
      const courseName = this.query ? this.query : ''
      const courseType = this.courseType ? this.courseType : ''
      const tag = this.tag ? this.tag : ''
      const data = {
        pagenum,
        campus: campusVal,
        courseName,
        tag,
        courseType
      }
      this.currentPage = Number(pagenum) || 1
      this._getCourses(data)
    }
  },
  watch: {
    $route () {
      this._getCoursesByQuery()
    }
  },
  components: {
    TagsList,
    CourseList,
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.course {
  .course-search {
    display: flex;
    color: $color-text-light-black;
    align-items: center;
    margin-bottom: 16px;
  }
  .add {
    display: block;
    position: fixed;
    right: 32px;
    bottom: 48px;
    background: $color-button-light-blue;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    .el-icon-plus {
      color: #fff;
    }
  }
  .course-type {
    width: 120px;
  }
  .pagination {
    text-align: center;
  }
  .el-dialog {
    .type-buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      a {
        text-decoration: none;
        display: inline-block;
        padding: 10px;
        width: 100px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background: $color-button-light-blue;
        text-align: center;
      }
    }
  }
}
</style>
