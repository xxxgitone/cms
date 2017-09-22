<template>
  <div class="teacher-manage">
    <el-row class="panel-header">
      <el-col :span="20">
        <el-button type="danger" icon="delete" @click="deleteSelection">批量删除</el-button>
        <el-select 
          v-model="campusVal" 
          clearable 
          placeholder="请选择校区" 
          class="campus" 
          @change="handleChange"
        >
          <el-option 
            v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入关键字"
          icon="search"
          v-model="query"
          class="search"
        ></el-input>
      </el-col>
      <el-col :span="4" class="add">
        <el-button type="primary" icon="plus" @click="handleAdd">添加教师</el-button>
      </el-col>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        label-position="right"
        size="tiny"
        :before-close="handleClose"
      >
        <el-form :model="teacherInfo" ref="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="teacherInfo.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="teacherInfo.age" placeholder="年龄"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="出生年月" prop="birthday">
            <el-date-picker 
              v-model="teacherInfo.birthday"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              :editable="editable"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="teacherInfo.gender" label="M">男</el-radio>
            <el-radio v-model="teacherInfo.gender" label="F">女</el-radio>            
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model.number="teacherInfo.phoneNumber" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="entryDate">
            <el-date-picker 
              v-model="teacherInfo.entryDate"
              type="date"
              placeholder="选择日期"
              :editable="editable"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所任课程" prop="job">
            <el-select v-model="teacherInfo.job" clearable placeholder="请选择所任课程">
              <el-option 
                v-for="item in jobOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" prop="campus">
            <el-select v-model="teacherInfo.campus" clearable placeholder="请选择校区">
              <el-option 
                v-for="item in options" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button 
            v-show="operationType==='add'" 
            type="primary" 
            @click="addConfirm" 
            :loading="loading"
          >确定</el-button>
          <el-button 
            v-show="operationType==='edit'"
            type="primary" 
            @click="editConfirm" 
            :loading="loading"
          >确定</el-button>
        </div>
      </el-dialog>
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
        <template scope="scope">{{ formatGender(scope.row.gender) }}</template>
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
import {getTeachers, addTeacher, editTeacher, deleteTeacher} from 'api/teacher'
import {setEmptyString, getIds} from 'common/js/utils'
import {managePageMixin} from 'common/js/mixin'

export default {
  mixins: [managePageMixin],
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
      jobOptions: [
        {
          value: '美术老师',
          label: '美术老师'
        },
        {
          value: '中国舞',
          label: '中国舞'
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
      rules: {
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        gender: [
          {required: true, message: '请选择性别'}
        ],
        phoneNumber: [
          {required: true, message: '请输入电话号码'},
          {type: 'number', message: '请输入正确的电话号码'}
        ],
        entryDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        job: [
          {required: true, message: '请选择所任课程', trigger: 'change'}
        ],
        campus: [
          {required: true, message: '请选择校区', trigger: 'change'}
        ]
      },
      loading: false,
      dataLoading: true,
      operationType: 'add',
      multipleSelection: [],
      editable: false,
      pagenum: 1,
      pagesize: 10,
      total: 0,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    title () {
      if (this.operationType === 'add') {
        return '添加教师'
      } else if (this.operationType === 'edit') {
        return '修改教师'
      }
    }
  },
  created () {
    this._getTeachers()
  },
  methods: {
    formatGender (gender) {
      if (gender === 'F') {
        return '女'
      } else if (gender === 'M') {
        return '男'
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pagenum = val
      const data = {
        campus: this.campusVal ? this.campusVal : '',
        pagesize: 10,
        pagenum: this.pagenum
      }
      this._getTeachers(data)
    },
    handleChange (val) {
      this.campusVal = val
      const data = {campus: val}
      this._getTeachers(data)
      if (!val) {
        this._getTeachers()
        this.currentPage = 1
      }
    },
    handleClose () {
      this.$refs.form.resetFields()
      setEmptyString(this.teacherInfo)
      this.dialogHide()
    },
    handleAdd () {
      this.operationType = 'add'
      setEmptyString(this.teacherInfo)
      this.dialogShow()
    },
    addConfirm () {
      this.loading = true
      const teacherInfo = this.teacherInfo
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 添加，修改公用一套数据模板，当点击过修改后，在去点击添加，会存在'_id'和'_v'字段
          if (teacherInfo.hasOwnProperty('_id')) {
            delete teacherInfo._id
            delete teacherInfo._v
          }
          addTeacher(teacherInfo).then((res) => {
            this.loading = false
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.handleClose()
              this._getTeachers()
              this.currentPage = 1
              this.campusVal = ''
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleEdit (index, row) {
      this.operationType = 'edit'
      this.teacherInfo = Object.assign({}, row)
      this.dialogShow()
    },
    editConfirm () {
      this.loading = true
      const teacherInfo = this.teacherInfo
      editTeacher(teacherInfo).then((res) => {
        this.loading = false
        if (res.code === OK_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          this.handleClose()
          const data = {
            campus: this.campusVal ? this.campusVal : '',
            pagesize: 10,
            pagenum: this.pagenum
          }
          this._getTeachers(data)
        }
      })
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
            const data = {
              campus: this.campusVal ? this.campusVal : '',
              pagesize: 10,
              pagenum: this.pagenum
            }
            this._getTeachers(data)
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
            const data = {
              campus: this.campusVal ? this.campusVal : '',
              pagesize: 10,
              pagenum: this.pagenum
            }
            this._getTeachers(data)
          })
        }).catch(() => {})
      }
    },
    _getTeachers (data) {
      this.dataLoading = true
      getTeachers(data).then((res) => {
        this.dataLoading = false
        if (res.code === OK_CODE) {
          this.total = res.total
          this.teachers = res.teachers
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixins.scss';

.teacher-manage {
  .panel-header {
    display: flex;
    margin-bottom: 24px;
    .campus {
      margin-left: 8px;
      width: 120px;
      margin-right: 8px;
    }
    .search {
      width: 220px;
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
