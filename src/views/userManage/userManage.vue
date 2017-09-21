<template>
  <div class="user-manage">
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
          placeholder="输入姓名查询"
          icon="search"
          v-model="query"
          class="search"
        ></el-input>
      </el-col>
      <el-col :span="4" class="add">
        <el-button type="primary" icon="plus" @click="handleAdd">添加用户</el-button>
      </el-col>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        label-position="right"
        size="tiny"
        :before-close="handleClose"
      >
        <el-form :model="userInfo" ref="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户" prop="account">
                <el-input v-model="userInfo.account" auto-complete="off" placeholder="账户"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="userInfo.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="出生年月" prop="birthday">
            <el-date-picker 
              v-model="userInfo.birthday"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              :editable="editable"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="密码" :prop="operationType === 'edit' ? '' : 'password'">
            <el-input v-model="userInfo.password" type="password" :placeholder="operationType === 'edit' ? '如需修改请填写' : '请输入密码'"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model.number="userInfo.phoneNumber" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="entryDate">
            <el-date-picker 
              v-model="userInfo.entryDate"
              type="date"
              placeholder="选择日期"
              :editable="editable"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-select v-model="userInfo.role" clearable placeholder="请选择身份">
              <el-option 
                v-for="item in roleOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" prop="campus">
            <el-select v-model="userInfo.campus" clearable placeholder="请选择校区">
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
      :data="users"
      border
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="账户" 
        width="100" 
        prop="account"
      ></el-table-column>
      <el-table-column 
        label="姓名" 
        width="100" 
        prop="userName"
      ></el-table-column>
      <el-table-column 
        label="生日" 
      >
        <template scope="scope">{{ scope.row.birthday | formatDate }}</template>
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
        label="身份" 
        width="100" 
      >
        <template scope="scope">{{ formatRole(scope.row.role) }}</template>
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="130" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="操作" 
        width="150" 
      >
        <template scope="scope">
          <el-button :plain="true" type="info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" class="pagination" v-show="!dataLoading && users.length > 0 && total > 10">
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
import {OK_CODE, ERR_CODE} from 'api/config'
import {getUsers, addUser, editUser, deleteUser} from 'api/user'
import {setEmptyString, getIds, debounce} from 'common/js/utils'
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
      roleOptions: [
        {
          value: 'admin',
          label: '管理员'
        },
        {
          value: 'front',
          label: '校区前台'
        }
      ],
      campusVal: '',
      query: '',
      users: [],
      userInfo: {
        account: '',
        userName: '',
        birthday: '',
        password: '',
        phoneNumber: '',
        entryDate: '',
        role: '',
        campus: '',
        avatar: ''
      },
      rules: {
        account: [
          {required: true, message: '请输入账户名', trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请填写密码', trigger: 'blur'},
          {min: 6, message: '不得少于6位', trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请输入电话号码'},
          {type: 'number', message: '请输入正确的电话号码'}
        ],
        entryDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        role: [
          {required: true, message: '请选择身份', trigger: 'change'}
        ],
        campus: [
          {required: true, message: '请选择校区', trigger: 'change'}
        ]
      },
      loading: false,
      dataLoading: true,
      operationType: 'add',
      currentPage: 1,
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
        return '添加用户'
      } else if (this.operationType === 'edit') {
        return '修改用户'
      }
    }
  },
  created () {
    this._getUsers()
    this.$watch('query', debounce((newQyery) => {
      const data = {
        campus: this.campusVal ? this.campusVal : '',
        name: newQyery
      }
      console.log(data)
      this._getUsers(data)
    }, 200))
  },
  methods: {
    formatRole (role) {
      if (role === 'admin') {
        return '管理员'
      } else if (role === 'front') {
        return '校区前台'
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
      this._getUsers(data)
    },
    handleChange (val) {
      this.campusVal = val
      const data = {campus: val}
      this._getUsers(data)
      if (!val) {
        this._getUsers()
        this.currentPage = 1
      }
    },
    handleClose () {
      this.$refs.form.resetFields()
      setEmptyString(this.userInfo)
      this.dialogHide()
    },
    handleAdd () {
      this.operationType = 'add'
      setEmptyString(this.userInfo)
      this.dialogShow()
    },
    addConfirm () {
      this.loading = true
      const userInfo = this.userInfo
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 添加，修改公用一套数据模板，当点击过修改后，在去点击添加，会存在'_id'和'_v'字段
          if (userInfo.hasOwnProperty('_id')) {
            delete userInfo._id
            delete userInfo._v
          }
          addUser(userInfo).then((res) => {
            this.loading = false
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.handleClose()
              this._getUsers()
              this.currentPage = 1
              this.campusVal = ''
            } else if (res.code === ERR_CODE) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
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
      this.userInfo = Object.assign({}, row)
      this.dialogShow()
    },
    editConfirm () {
      this.loading = true
      const userInfo = this.userInfo
      editUser(userInfo).then((res) => {
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
          this._getUsers(data)
        } else if (res.code === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row._id).then((res) => {
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
            this._getUsers(data)
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
          deleteUser(_ids).then((res) => {
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
            this._getUsers(data)
          })
        }).catch(() => {})
      }
    },
    _getUsers (data) {
      this.dataLoading = true
      getUsers(data).then((res) => {
        this.dataLoading = false
        if (res.code === OK_CODE) {
          this.total = res.total
          this.users = res.users
        }
      })
    }
  }
}
</script>

<style lang="scss" socped>
.user-manage {
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
}
</style>
