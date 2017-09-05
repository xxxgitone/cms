<template>
  <div class="user-manage">
    <el-row class="panel-header">
      <el-col :span="20">
        <el-select v-model="campusVal" clearable placeholder="请选择校区" class="campus">
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
        <el-button type="primary" icon="plus" @click="addUser">添加用户</el-button>
      </el-col>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        label-position="right"
        size="tiny"
        :before-close="handleClose"
      >
        <el-form :model="userInfo" ref="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户" label-width="80px">
                <el-input v-model="userInfo.account" auto-complete="off" placeholder="账户"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" label-width="80px">
                <el-input v-model="userInfo.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="出生年月" label-width="80px">
            <el-date-picker 
              v-model="userInfo.birthday"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input v-model="userInfo.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" label-width="80px">
            <el-input v-model="userInfo.phoneNumber" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" label-width="80px">
            <el-date-picker 
              v-model="userInfo.entryDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份" label-width="80px">
            <el-select v-model="userInfo.role" clearable placeholder="请选择身份">
              <el-option 
                v-for="item in roleOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" label-width="80px">
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
      :data="users"
      border
      tooltip-effect="dark"
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
          <el-button :plain="true" type="info" size="small" @click="editUser(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {OK_CODE, ERR_CODE} from 'api/config'
import {getUsers, addUser, editUser, deleteUser} from 'api/user'
import {setEmptyString} from 'common/js/utils'

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
      dialogVisible: false,
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
      loading: false,
      operationType: 'add',
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
  },
  methods: {
    dialogShow () {
      this.dialogVisible = true
    },
    dialogHide () {
      this.dialogVisible = false
    },
    formatRole (role) {
      if (role === 'admin') {
        return '管理员'
      } else if (role === 'front') {
        return '校区前台'
      }
    },
    handleClose () {
      this.dialogHide()
      setEmptyString(this.userInfo)
      this.$refs.form.$el.reset()
    },
    addUser () {
      this.dialogShow()
      this.operationType = 'add'
      setEmptyString(this.userInfo)
    },
    addConfirm () {
      this.loading = true
      const userInfo = this.userInfo
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
        } else if (res.code === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    editUser (index, row) {
      this.dialogShow()
      this.operationType = 'edit'
      this.userInfo = Object.assign({}, row)
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
          this._getUsers()
        } else if (res.code === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    deleteUser (index, row) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
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
            this._getUsers()
          }
        })
      }).catch(() => {
      })
    },
    _getUsers () {
      getUsers().then((res) => {
        if (res.code === OK_CODE) {
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
}
</style>
