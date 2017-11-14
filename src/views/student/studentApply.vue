<template>
  <div class="student-apply">
    <!-- :rules="rules"  -->
    <el-form :model="applyInfo" ref="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="studentName">
            <el-input v-model="applyInfo.studentName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家长姓名" prop="parentName">
            <el-input v-model="applyInfo.parentName" placeholder="家长姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker 
          v-model="applyInfo.birthday"
          type="date"
          placeholder="选择出生年月"
          :editable="editable">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="applyInfo.gender" label="M">男</el-radio>
        <el-radio v-model="applyInfo.gender" label="F">女</el-radio>            
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model.number="applyInfo.phoneNumber" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="课程" prop="course">
        <el-button type="text" @click="dialogTableVisible = true">选择课程</el-button>
        <span>所选课程:<span style="color:red;">{{courseName}}</span></span>
        <el-dialog 
          title="课程列表" 
          :visible.sync="dialogTableVisible">
          <el-table :data="courses" @cell-dblclick="handleDbclick">
            <el-table-column property="courseName" label="课程名" width="150"></el-table-column>
            <el-table-column property="campus" label="校区" width="200"></el-table-column>
            <el-table-column property="price" label="价格"></el-table-column>
            <el-table-column property="teacher" label="教师"></el-table-column>
          </el-table>
        </el-dialog>
      </el-form-item>
      <el-form-item label="实付" prop="revenue">
        <el-input v-model.number="applyInfo.revenue" placeholder="请输入实付金额"></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="payment">
        <el-select v-model="applyInfo.payment" clearable placeholder="请选择付款方式">
          <el-option 
            v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经办校区" prop="handleCampus">
        <el-select v-model="applyInfo.handleCampus" clearable placeholder="请选择经办校区">
          <el-option 
            v-for="item in campus" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经办人" prop="handlePeople">
        <el-select v-model="applyInfo.handlePeople" clearable placeholder="请选择经办人">
          <el-option 
            v-for="item in people" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="handle-button">
      <el-button 
        type="primary"
        @click="applyConfirm">
        确定报名
      </el-button>
    </div>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {addOrder} from 'api/order'
import {getCourseByType} from 'api/course'

export default {
  data () {
    return {
      applyInfo: {
        studentName: '',
        parentName: '',
        birthday: '',
        gender: '',
        phoneNumber: '',
        courseId: '',
        revenue: '',
        payment: '',
        handleCampus: '',
        handlePeople: ''
      },
      courseName: '',
      options: [
        {
          value: '微信',
          label: '微信'
        },
        {
          value: '支付宝',
          label: '支付宝'
        },
        {
          value: '现金',
          label: '现金'
        },
        {
          value: '银行卡',
          label: '银行卡'
        }
      ],
      campus: [
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
      people: [
        {
          value: '徐小江',
          label: '徐小江'
        },
        {
          value: '李天花',
          label: '李天花'
        }
      ],
      editable: false,
      courses: [],
      dialogTableVisible: false
    }
  },
  created () {
    this._getCourseByType('formal')
  },
  methods: {
    handleDbclick (row, column, cell, event) {
      this.courseName = row.courseName
      this.applyInfo.courseId = row._id
      console.log(this.applyInfo)
      this.dialogTableVisible = false
    },
    applyConfirm () {
      addOrder(this.applyInfo).then(res => {
        if (res.code === OK_CODE) {
          this.$message({
            message: '报名成功',
            showClose: true,
            type: 'success'
          })
          this.$router.push('/admin/order')
        }
      })
    },
    _getCourseByType (type) {
      getCourseByType(type).then((res) => {
        if (res.code === OK_CODE) {
          this.courses = res.course
          console.log(this.courses)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.student-apply {
  width: 100%;
  background: $color-bg-dark-white;
  border-radius: 8px;
  padding: 16px 0 16px 0;
  .el-form {
    margin: 0 auto;
    width: 60%;
  }
  .handle-button {
    width: 60%;
    margin: 0 auto;
    text-align: right;
  }
}
</style>
