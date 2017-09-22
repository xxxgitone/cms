<template>
  <div class="teacherEdit">
    <el-form :model="teacherInfo" ref="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="teacherInfo.userName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="教师等级" prop="rank">
            <el-select v-model="teacherInfo.rank" clearable placeholder="请选择等级">
              <el-option 
                v-for="item in rankOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
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
      <el-form-item label="评分" prop="rate" style="line-height:1.5">
        <el-rate v-model="teacherInfo.rate"></el-rate>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="teacherInfo.gender" label="M">男</el-radio>
        <el-radio v-model="teacherInfo.gender" label="F">女</el-radio>            
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="teacherInfo.avatar" placeholder="请填写头像地址"></el-input>        
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
      <el-form-item label="座右铭" prop="mottos">
        <el-input type="textarea" placeholder="请填写座右铭" v-model="teacherInfo.motto"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍" prop="profile">
        <el-input type="textarea" placeholder="请填写个人介绍" v-model="teacherInfo.profile"></el-input>
      </el-form-item>
    </el-form>
    <div class="handle-button">
      <el-button @click="handleCancel">取消</el-button>
      <el-button 
        v-show="operationType==='add'"
        type="primary" 
        @click="addConfirm"
        :loading="loading"
      >确定添加</el-button>
      <el-button 
        v-show="operationType==='edit'"
        type="primary" 
        @click="editConfirm" 
        :loading="loading"
      >确定修改</el-button>
    </div>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getTeacherById, addTeacher, editTeacher} from 'api/teacher'
export default {
  data () {
    return {
      loading: false,
      operationType: 'add',
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
      rankOptions: [
        {
          value: '金牌教师',
          label: '金牌教师'
        },
        {
          value: '高级教师',
          label: '高级教师'
        }
      ],
      teacherInfo: {
        userName: '',
        birthday: '',
        phoneNumber: '',
        entryDate: '',
        campus: '',
        gender: '',
        job: '',
        rank: '',
        rate: 5,
        profile: '',
        avatar: '',
        motto: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        rank: [
          {required: true, message: '请选择教师等级', trigger: 'blur'}
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
      editable: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      }
    }
  },
  created () {
    const id = this.$route.params.id
    if (id) {
      this.operationType = 'edit'
      this._getTeacherById(id)
    }
  },
  methods: {
    handleCancel () {
      this.$router.push('/admin/teacher')
    },
    addConfirm () {
      console.log(this.teacherInfo)
      this.loading = true
      const teacherInfo = this.teacherInfo
      this.$refs.form.validate((valid) => {
        if (valid) {
          addTeacher(teacherInfo).then((res) => {
            this.loading = false
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.$router.push(`/admin/teacher/${res.teacher._id}`)
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
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
          this.$router.push(`/admin/teacher/${this.teacherInfo._id}`)
        }
      })
    },
    _getTeacherById (id) {
      getTeacherById(id).then((res) => {
        if (res.code === OK_CODE) {
          this.teacherInfo = res.teacher
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.teacherEdit {
  width: 100%;
  background: $color-bg-dark-white;
  border-radius: 8px;
  padding: 16px 0 16px 0;
  .el-form {
    margin: 0 auto;
    width: 60%;
    .el-rate {
      line-height: 2;
    }
  }
  .handle-button {
    width: 60%;
    margin: 0 auto;
    text-align: right;
  }
}
</style>

