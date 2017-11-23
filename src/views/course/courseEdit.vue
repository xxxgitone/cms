<template>
  <div class="courseEdit">
    <el-form :model="courseInfo" ref="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名" prop="courseName">
            <el-input v-model="courseInfo.courseName" placeholder="课程名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类" prop="tag">
            <el-select v-model="courseInfo.tag" clearable placeholder="请选择分类">
              <el-option 
                v-for="item in tagOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开课时间" prop="startDate">
            <el-date-picker 
              v-model="courseInfo.startDate"
              type="date"
              placeholder="选择日期"
              :editable="editable">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结课时间" prop="endDate">
            <el-date-picker 
              v-model="courseInfo.endDate"
              type="date"
              placeholder="选择日期"
              :editable="editable">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-show="courseInfo.rate" label="评分" prop="rate" style="line-height:1.5">
        <el-rate v-model="courseInfo.rate"></el-rate>
      </el-form-item>
      <el-form-item label="课程图片" prop="picUrl">
        <el-upload
          class="upload-demo"
          drag
          :action="url"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          name="image">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          <el-input v-model="courseInfo.picUrl" type="hidden" size="small"></el-input>
        </el-upload>   
        
      </el-form-item>
      <el-form-item label="学费" prop="price" v-show="courseType === 'formal'">
        <el-input v-model.number="courseInfo.price" placeholder="金额"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课时" prop="period">
            <el-input v-model.number="courseInfo.period" placeholder="课时"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总课时" prop="totalPeriod">
            <el-input v-model.number="courseInfo.totalPeriod" placeholder="总课时"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="任课老师" prop="teacher">
        <el-select v-model="courseInfo.teacher" clearable placeholder="请选择任课老师">
          <el-option 
            v-for="item in teacherOptions" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属校区" prop="campus">
        <el-select v-model="courseInfo.campus" clearable placeholder="请选择校区">
          <el-option 
            v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程介绍" prop="introduction">
        <el-input type="textarea" placeholder="请填写课程介绍" v-model="courseInfo.introduction"></el-input>
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
import {addCourse, editCourse, getCourseById} from 'api/course'
import {OK_CODE} from 'api/config'
import {mapGetters} from 'vuex'

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
      teacherOptions: [
        {
          value: '侯涛',
          label: '侯涛'
        },
        {
          value: '薛磊',
          label: '薛磊'
        }
      ],
      tagOptions: [
        {
          value: '中国舞',
          label: '中国舞'
        },
        {
          value: '钢琴',
          label: '钢琴'
        },
        {
          value: '美术',
          label: '美术'
        },
        {
          value: '武术',
          label: '武术'
        }
      ],
      courseInfo: {
        courseName: '',
        tag: '',
        startDate: '',
        endDate: '',
        rate: '',
        picUrl: '',
        price: '',
        period: '',
        totalPeriod: '',
        teacher: '',
        campus: '',
        introduction: '',
        courseType: ''
      },
      rules: {
        courseName: [
          {required: true, message: '请输入课程名', trigger: 'blur'}
        ],
        tag: [
          {required: true, message: '请选择分类', trigger: 'change'}
        ],
        startDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        endDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        price: [
          {required: true, message: '请输入金额'},
          {type: 'number', message: '请输入正确的金额'}
        ],
        period: [
          {required: true, message: '请输入课时'},
          {type: 'number', message: '请输入正确的课时'}
        ],
        totalPeriod: [
          {required: true, message: '请输入总课时'},
          {type: 'number', message: '请输入正确的总课时'}
        ],
        teacher: [
          {required: true, message: '请选择任课老师', trigger: 'change'}
        ],
        campus: [
          {required: true, message: '请选择校区', trigger: 'change'}
        ]
      },
      editable: false
    }
  },
  created () {
    const id = this.$route.params.id
    const {type} = this.$route.query
    this.courseType = type
    this.courseInfo.courseType = type
    this.courseInfo.price = type === 'audition' ? 0 : ''
    if (id) {
      this.operationType = 'edit'
      this._getCourseById(id)
    }
  },
  computed: {
    url () {
      return `/api/upload?token=${this.token}`
    },
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    handleCancel () {
      this.$router.push('/admin/course')
    },
    addConfirm () {
      this.loading = true
      const courseInfo = this.courseInfo
      console.log(courseInfo)
      this.$refs.form.validate((valid) => {
        if (valid) {
          addCourse(courseInfo).then((res) => {
            this.loading = false
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.$router.push(`/admin/course`)
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
      const courseInfo = this.courseInfo
      editCourse(courseInfo).then((res) => {
        this.loading = false
        if (res.code === OK_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          this.$router.push(`/admin/course`)
        }
      })
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
        this.courseInfo.picUrl = response.url
      } else {
        this.$message({
          type: 'error',
          message: '上传失败，请重新上传'
        })
      }
    },
    _getCourseById (id) {
      getCourseById(id).then((res) => {
        if (res.code === OK_CODE) {
          this.courseInfo = res.course
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.courseEdit {
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
