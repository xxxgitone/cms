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
        <el-button type="primary" icon="plus">添加用户</el-button>
      </el-col>
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
        width="150" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="操作" 
        width="150" 
      >
        <template scope="scope">
          <el-button :plain="true" type="info" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getUsers} from 'api/user'

export default {
  data () {
    return {
      options: [
        {
          value: '校区一',
          label: '浦东校区'
        },
        {
          value: '校区二',
          label: '九亭校区'
        },
        {
          value: '校区三',
          label: '泗泾校区'
        },
        {
          value: '校区四',
          label: '七宝校区'
        },
        {
          value: '校区五',
          label: '华泾校区'
        }
      ],
      campusVal: '',
      query: '',
      users: []
    }
  },
  created () {
    this._getUsers()
  },
  methods: {
    formatRole (role) {
      if (role === 'admin') {
        return '管理员'
      }
    },
    _getUsers () {
      getUsers().then((res) => {
        console.log(res)
        if (res.code === OK_CODE) {
          this.users = res.users
          console.log(this.users)
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
