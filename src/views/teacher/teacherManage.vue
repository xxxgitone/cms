<template>
  <div class="teacher-manage">
    <el-row class="panel-header">
      <el-col :span="20">
        <el-button type="danger" icon="delete" @click="deleteSelection">批量删除</el-button>
        <search-boxs 
          @handleChange="handleChange" 
          @query="searchByQuery"
        ></search-boxs>
      </el-col>
      <el-col :span="4" class="add">
        <el-button type="primary" icon="plus" @click="handleAdd()">添加教师</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading.body="dataLoading"

      :data="teachers"
      border
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="头像" 
        width="70" 
        align="center"
      >
        <template scope="scope">
          <img width="30" height="30" class="teacher-avatar" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column 
        label="姓名" 
        width="100" 
      >
        <template scope="scope">
          <router-link class="teacherLink" :to="`/admin/teacher/${scope.row._id}`">
            {{scope.row.userName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column 
        label="性别" 
        width="70" 
      >
        <template scope="scope">{{ scope.row.gender | formatGender }}</template>
      </el-table-column>
      <el-table-column 
        label="年龄" 
        width="70" 
      >
        <template scope="scope">{{ scope.row.birthday | formatAge }}</template>
      </el-table-column>
      <el-table-column 
        label="电话号码" 
        prop="phoneNumber"
      ></el-table-column>
      <el-table-column 
        label="入职日期" 
      >
        <template scope="scope">{{ scope.row.entryDate | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="所任课程" 
        width="100" 
        prop="job"
      >
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="100" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="操作" 
        width="140" 
      >
        <template scope="scope">
          <el-button :plain="true" type="info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" class="pagination" v-show="!dataLoading && teachers.length > 0 && total > 10">
        <el-pagination 
          layout="total, prev, pager, next" 
          :total="total"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getTeachers, deleteTeacher} from 'api/teacher'
import {getIds} from 'common/js/utils'
import SearchBoxs from 'components/search-boxs/search-boxs'

export default {
  data () {
    return {
      options: [
        {
          value: '浦东校区',
          label: '浦东校区'
        },
        {
          value: '九亭校区',
          label: '九亭校区'
        },
        {
          value: '泗泾校区',
          label: '泗泾校区'
        },
        {
          value: '七宝校区',
          label: '七宝校区'
        },
        {
          value: '华泾校区',
          label: '华泾校区'
        }
      ],
      campusVal: '',
      query: '',
      currentPage: 1,
      teachers: [],
      teacherInfo: {
        _id: '',
        userName: '',
        birthday: '',
        phoneNumber: '',
        entryDate: '',
        campus: '',
        gender: 'M',
        job: '',
        age: ''
      },
      loading: false,
      dataLoading: true,
      multipleSelection: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  created () {
    this._getTeachersByQuery()
  },
  methods: {
    searchByQuery (newQyery) {
      this.query = newQyery
      this._getTeachersByQuery()
      this.currentPage = 1
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.$router.push(`/admin/teacher?pagenum=${this.pagenum}`)
    },
    handleChange (val) {
      this.campusVal = val
      this._getTeachersByQuery()
      this.currentPage = 1
      if (!val) {
        this._getTeachersByQuery()
        this.currentPage = 1
      }
    },
    handleAdd (id) {
      this.$router.push(`/admin/teacher/info/add`)
    },
    handleEdit (index, row) {
      this.$router.push(`/admin/teacher/edit/${row._id}`)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTeacher(row._id).then((res) => {
          if (res.code === OK_CODE) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
            this._getTeachersByQuery()
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
          deleteTeacher(_ids).then((res) => {
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'success'
              })
            }
            this._getTeachersByQuery()
          })
        }).catch(() => {})
      }
    },
    _getTeachers (data) {
      this.dataLoading = true
      getTeachers(data).then((res) => {
        console.log(res.teachers)
        this.dataLoading = false
        if (res.code === OK_CODE) {
          this.total = res.total
          this.teachers = res.teachers
        }
      })
    },
    _getTeachersByQuery () {
      const {pagenum} = this.$route.query
      const campusVal = this.campusVal ? this.campusVal : ''
      const userName = this.query ? this.query : ''
      const data = {
        pagenum,
        campus: campusVal,
        userName
      }
      console.log(data)
      this.currentPage = Number(pagenum) || 1
      this._getTeachers(data)
    }
  },
  watch: {
    '$route': '_getTeachersByQuery'
  },
  components: {
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixins.scss';

.teacher-manage {
  .panel-header {
    display: flex;
    margin-bottom: 24px;
    .el-col:nth-child(1) {
      display: flex;
    }
    .add {
      text-align: right;
    }
  }
  .pagination {
    margin: 16px 0 8px 0;
    text-align: right;
  }
  img.teacher-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    @include transformCenter;
  }
  .teacherLink {
    text-decoration: none;
  }
}
</style>
