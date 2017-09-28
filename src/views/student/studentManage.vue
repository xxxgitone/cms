<template>
  <div class="student-manage">
    <el-row class="search-boxs">
      <el-button type="danger" icon="delete">批量删除</el-button>
      <serach-boxs></serach-boxs>
    </el-row> 
    <!-- @selection-change="handleSelectionChange" -->
    <el-table
      v-loading.body="dataLoading"
      :data="students"
      border
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="姓名" 
        width="100" 
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
        width="120"
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
        width="100" 
        prop="course"
      >
      </el-table-column>
      <el-table-column 
        label="所属校区" 
        width="100" 
        prop="campus"
      ></el-table-column>
      <el-table-column 
        label="开始时间" 
        width="160"
      >
        <template scope="scope">{{ scope.row.startDate | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="结束时间" 
        width="160"
      >
        <template scope="scope">{{ scope.row.endDate | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="报名时间" 
        width="160"
      >
        <template scope="scope">{{ scope.row.applyDate | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="应交" 
        width="80" 
        prop="receivable"
      ></el-table-column>
      <el-table-column 
        label="实交" 
        width="80" 
        prop="revenue"
      ></el-table-column>
      <el-table-column 
        label="欠费" 
        width="80" 
        prop="arrears"
      ></el-table-column>
      <el-table-column 
        label="是否停课" 
        width="100" 
        prop="arrears"
      ></el-table-column>
      <el-table-column 
        label="操作" 
        width="140" 
      >
        <template scope="scope">
           <!-- @click="handleEdit(scope.$index, scope.row)" -->
          <el-button :plain="true" type="info" size="small">编辑</el-button>
          <!-- @click="handleDelete(scope.$index, scope.row)" -->
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SerachBoxs from 'components/search-boxs/search-boxs'
import {getStudents} from 'api/student'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      total: 0,
      students: [],
      dataLoading: true
    }
  },
  created () {
    this._getStudents()
  },
  methods: {
    _getStudents () {
      this.dataLoading = true
      getStudents().then((res) => {
        this.dataLoading = false
        console.log(res)
        if (res.code === OK_CODE) {
          this.total = res.total
          this.students = res.students
        }
      })
    }
  },
  components: {
    SerachBoxs
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
}
</style>
