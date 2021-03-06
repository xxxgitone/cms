<template>
  <div class="user-manage">
    <el-row class="panel-header">
      <el-col :span="20">
        <el-button type="danger" icon="delete" @click="deleteSelection">批量删除</el-button>
        <search-boxs 
          @handleChange="handleChange" 
          @query="searchByQuery">
        </search-boxs>
      </el-col>
      <el-col :span="4" class="add">
        <el-button type="primary" icon="plus" @click="handleAdd">添加用户</el-button>
      </el-col>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        label-position="right"
        :before-close="handleClose">
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
              :picker-options="pickerOptions">
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
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="upload-demo"
              drag
              :action="url"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              name="image">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <el-input v-model="userInfo.avatar" type="hidden" size="small"></el-input>
            </el-upload>   
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
        <template scope="scope">{{ scope.row.role | formatRole }}</template>
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
import {mapGetters} from 'vuex'
import {getUsers, addUser, editUser, deleteUser} from 'api/user'
import {setEmptyString, getIds} from 'common/js/utils'
import {managePageMixin} from 'common/js/mixin'
import SearchBoxs from 'components/search-boxs/search-boxs'

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
    url () {
      return `/api/upload?token=${this.token}`
    },
    ...mapGetters([
      'token'
    ]),
    title () {
      if (this.operationType === 'add') {
        return '添加用户'
      } else if (this.operationType === 'edit') {
        return '修改用户'
      }
    }
  },
  created () {
    this._getUsersByQuery()
  },
  methods: {
    searchByQuery (newQyery) {
      this.query = newQyery
      this._getUsersByQuery()
      this.currentPage = 1
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.$router.push(`/admin/user?pagenum=${this.pagenum}`)
    },
    handleChange (val) {
      this.campusVal = val
      this._getUsersByQuery()
      this.currentPage = 1
      if (!val) {
        this._getUsersByQuery()
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
          this._getUsersByQuery()
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
            this._getUsersByQuery()
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
            this._getUsersByQuery()
          })
        }).catch(() => {})
      }
    },
    beforeUpload (file) {
      const type = file.type
      const reg = /^(image)/i
      if (!reg.test(type)) {
        this.$message.error('请选择正确图片')
        return false
      }
    },
    handleSuccess (response, file, fileList) {
      if (response.code === OK_CODE) {
        this.$message({
          type: 'success',
          message: response.msg
        })
        this.userInfo.avatar = response.url
      } else {
        this.$message({
          type: 'error',
          message: '上传失败，请重新上传'
        })
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
    },
    _getUsersByQuery () {
      const {pagenum} = this.$route.query
      const campusVal = this.campusVal ? this.campusVal : ''
      const userName = this.query ? this.query : ''
      const data = {
        pagenum,
        campus: campusVal,
        name: userName,
        pagesize: 10
      }
      this.currentPage = Number(pagenum) || 1
      this._getUsers(data)
    }
  },
  watch: {
    $route () {
      this._getUsersByQuery()
    }
  },
  components: {
    SearchBoxs
  }
}
</script>

<style lang="scss" socped>
.user-manage {
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
}
</style>
