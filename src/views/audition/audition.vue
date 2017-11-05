<template>
  <div class="audition-manage">
    <el-row class="search-boxs">
      <!-- @click="deleteSelection" -->
      <el-button type="danger" icon="delete">批量删除</el-button>
      <!-- @handleChange="handleChange" 
        @query="searchByQuery" -->
      <search-boxs>
      </search-boxs>
    </el-row> 
    <!-- @selection-change="handleSelectionChange" -->
    <el-table
      :data="auditions"
      border
      tooltip-effect="dark">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column 
        label="姓名" 
        width="100" 
        prop="studentName">
      </el-table-column>
      <el-table-column 
        label="性别" 
        width="70">
        <template scope="scope">{{ scope.row.gender | formatGender }}</template>
      </el-table-column>
      <el-table-column 
        label="电话号码" 
        width="140"
        prop="phoneNumber">
      </el-table-column>
      <el-table-column 
        label="家长姓名" 
        width="100" 
        prop="parentName">
      </el-table-column>
      <el-table-column 
        label="出生日期" 
        width="160">
        <template scope="scope">{{ scope.row.birthday | formatDate }}</template>
      </el-table-column>
      <el-table-column 
        label="年龄" 
        width="70">
        <template scope="scope">{{ scope.row.birthday | formatAge }}</template>
      </el-table-column>
      <el-table-column 
        label="预约课程"
        width="100">
        <template scope="scope">
          <router-link :to="`/admin/course/${scope.row.course._id}`">
            {{scope.row.course.courseName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column 
        label="校区" 
        prop="course.campus"
        width="100">
      </el-table-column>
      <el-table-column 
        label="预约时间">
        <template scope="scope">{{ scope.row.createAt | formatDate }}</template>
      </el-table-column>
      <!--<el-table-column 
        label="操作" 
        width="140" 
      >
        <template scope="scope">-->
           <!-- @click="handleEdit(scope.$index, scope.row)" -->
          <!-- <el-button :plain="true" type="info" size="small">编辑</el-button> -->
          <!-- @click="handleDelete(scope.$index, scope.row)" -->
          <!-- <el-button type="danger" size="small">删除</el-button> -->
        <!-- </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import SearchBoxs from 'components/search-boxs/search-boxs'
import {getAuditions} from 'api/audition'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      auditions: []
    }
  },
  created () {
    this._getAuditions()
  },
  methods: {
    _getAuditions () {
      getAuditions().then(res => {
        if (res.code === OK_CODE) {
          console.log(res.auditions)
          this.auditions = res.auditions
        }
      })
    }
  },
  components: {
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
.audition-manage {
  .search-boxs {
    display: flex;
  }
  .el-table {
    margin-top: 24px;
  }
 }
</style>
