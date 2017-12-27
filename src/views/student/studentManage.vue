<template>
  <div class="student-manage">
    <el-row class="search-boxs">
      <el-button type="danger" icon="delete" @click="deleteSelection">批量删除</el-button>
      <search-boxs 
        @handleChange="handleChange" 
        @query="searchByQuery">
      </search-boxs>
    </el-row> 
    <el-table
      v-loading.body="dataLoading"
      :data="students"
      border
      @selection-change="handleSelectionChange"
      tooltip-effect="dark">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="姓名" 
        width="100" 
        fixed
        prop="studentName"
      ></el-table-column>
      <el-table-column 
        label="性别" 
        width="70" 
      >
        <template scope="scope">{{ scope.row.gender | formatGender }}</template>
      </el-table-column>
      <el-table-column 
        label="电话号码" 
        width="130"
        prop="phoneNumber"
      ></el-table-column>
      <el-table-column 
        label="家长姓名" 
        width="100" 
        prop="parentName"
      >
      </el-table-column>
      <el-table-column 
        label="出生日期" 
        width="160"
      >
        <template scope="scope">{{ scope.row.birthday | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="年龄" 
        width="70" 
      >
        <template scope="scope">{{ scope.row.birthday | formatAge }}</template>
      </el-table-column>
      <el-table-column 
        label="所报课程" 
        prop="course"
        width="160">
        <template scope="scope">
          <router-link v-for="item in scope.row.course" :key="item._id" :to="`/admin/course/${item._id}`">
            {{ item.courseName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="100" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="报名时间" 
        width="160"
      >
        <template scope="scope">{{ scope.row.applyDate | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="操作" 
        width="140" 
      >
        <template scope="scope">
           <!-- @click="handleEdit(scope.$index, scope.row)" -->
          <el-button :plain="true" type="info" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-row>
      <el-col :span="24" class="pagination" v-show="!dataLoading && students.length > 0 && total > 10">
        <el-pagination 
          layout="total, prev, pager, next" 
          :total="total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchBoxs from 'components/search-boxs/search-boxs'
import {getStudents, deleteStudent} from 'api/student'
import {OK_CODE} from 'api/config'
import {getIds} from 'common/js/utils'

export default {
  data () {
    return {
      total: 0,
      students: [],
      dataLoading: true,
      currentPage: 1,
      campusVal: '',
      query: '',
      multipleSelection: []
    }
  },
  created () {
    this._getStudentsByQuery()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleChange (val) {
      this.campusVal = val
      this._getStudentsByQuery()
      this.currentPage = 1
      if (!val) {
        this._getStudentsByQuery()
        this.currentPage = 1
      }
    },
    searchByQuery (newQyery) {
      this.query = newQyery
      this._getStudentsByQuery()
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.$router.push(`/admin/student?pagenum=${this.pagenum}`)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStudent(row._id).then((res) => {
          if (res.code === OK_CODE) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
            this._getStudentsByQuery()
          }
        })
      }).catch(() => {
      })
    },
    deleteSelection () {
      const _ids = getIds(this.multipleSelection)
      if (_ids.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择要删除的数据',
          type: 'warning'
        })
      } else {
        this.$confirm(`此操作将永久删除该${_ids.length}条数据，是否继续`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteStudent(_ids).then((res) => {
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'success'
              })
            }
            this._getStudentsByQuery()
          })
        }).catch(() => {})
      }
    },
    _getStudents (data) {
      this.dataLoading = true
      getStudents(data).then((res) => {
        this.dataLoading = false
        console.log(res)
        if (res.code === OK_CODE) {
          this.total = res.total
          this.students = res.students
          console.log(this.students)
        }
      })
    },
    _getStudentsByQuery () {
      const {pagenum} = this.$route.query
      const campusVal = this.campusVal ? this.campusVal : ''
      const studentName = this.query ? this.query : ''
      const data = {
        pagenum,
        campus: campusVal,
        studentName
      }
      console.log(data)
      this.currentPage = Number(pagenum) || 1
      this._getStudents(data)
    }
  },
  watch: {
    $route () {
      this._getStudentsByQuery()
    }
  },
  components: {
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
.student-manage {
  .search-boxs {
    display: flex;
  }
  .el-table {
    margin-top: 24px;
  }
  .pagination {
    margin: 16px 0 8px 0;
    text-align: right;
  }
}
</style>
