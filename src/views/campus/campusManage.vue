<template>
  <div class="campus">
    <div class="campus-item" v-for="item in campusInfo" :key="item._id">
      <div class="item-header">
        <i class="el-icon-edit" @click="handleEdit(item)"></i>
        <i class="el-icon-close" @click="handleDelete(item)"></i>
        <img :src="item.picUrl">
        <h2>{{item.campusName}}</h2>
      </div>
      <div class="item-body">
        <el-row>
          <el-col :span="10">负责人</el-col>
          <el-col :span="14">{{item.principal}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="10">校区电话</el-col>
          <el-col :span="14">{{item.telephone}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="10">成立时间</el-col>
          <el-col :span="14">{{item.buildDate | formatDate}}</el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
        :title="title"
        label-position="right"
        size="tiny"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
      <el-form :model="campus" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="校区名" prop="campusName">
          <el-input v-model="campus.campusName" auto-complete="off" placeholder="校区名"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="campus.principal" placeholder="负责人"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" prop="buildDate">
          <el-date-picker 
            v-model="campus.buildDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            :editable="editable"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone">
          <el-input v-model.number="campus.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="校区图片" prop="picUrl">
          <el-input v-model.number="campus.picUrl" placeholder="请输入图片地址"></el-input>
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
    <span class="add" @click="handleAdd">
      <i class="el-icon-plus"></i>
    </span>
  </div>
</template>

<script>
import {OK_CODE} from 'api/config'
import {getCampus, addCampus, editCampus, deleteCampus} from 'api/campus'
import {managePageMixin} from 'common/js/mixin'
import {setEmptyString} from 'common/js/utils'

export default {
  mixins: [managePageMixin],
  data () {
    return {
      operationType: 'add',
      campus: {
        campusName: '',
        principal: '',
        telephone: '',
        buildDate: '',
        picUrl: ''
      },
      campusInfo: [],
      editable: false,
      loading: false,
      rules: {
        campusName: [
          {required: true, message: '请输入校区名', trigger: 'blur'}
        ],
        principal: [
          {required: true, message: '请输入负责人姓名', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入电话号码'},
          {type: 'number', message: '请输入正确的电话号码'}
        ],
        buildDate: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        picUrl: [
          {required: true, message: '请输入校区图片地址', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.operationType === 'add') {
        return '添加校区'
      } else {
        return '修改校区'
      }
    }
  },
  created () {
    this._getCampus()
  },
  methods: {
    handleClose () {
      this.$refs.form.resetFields()
      setEmptyString(this.campus)
      this.dialogHide()
    },
    handleAdd () {
      this.operationType = 'add'
      setEmptyString(this.campus)
      this.dialogShow()
    },
    addConfirm () {
      this.loading = true
      const campus = this.campus
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 添加，修改公用一套数据模板，当点击过修改后，在去点击添加，会存在'_id'和'_v'字段
          if (campus.hasOwnProperty('_id')) {
            delete campus._id
            delete campus._v
          }
          addCampus(campus).then((res) => {
            this.loading = false
            if (res.code === OK_CODE) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.handleClose()
              this._getCampus()
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleEdit (campus) {
      this.operationType = 'edit'
      this.campus = Object.assign({}, campus)
      this.dialogShow()
    },
    editConfirm () {
      this.loading = true
      const campus = this.campus
      editCampus(campus).then((res) => {
        this.loading = false
        if (res.code === OK_CODE) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          this.handleClose()
          this._getCampus()
        }
      })
    },
    handleDelete (campus) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCampus(campus._id).then((res) => {
          if (res.code === OK_CODE) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
            this._getCampus()
          }
        })
      }).catch(() => {
      })
    },
    _getCampus () {
      getCampus().then((res) => {
        if (res.code === OK_CODE) {
          this.campusInfo = res.campus
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixins.scss";

.campus {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .campus-item {
    color: $color-text-silver;
    cursor: pointer;
    width: 220px;
    border: 2px solid $color-bg-dark-white;
    border-radius: 16px;
    margin-right: 24px;
    margin-bottom: 24px;
    @include boxShadow;
    &:hover {
      box-shadow: 0 6px 6px 0 rgba(0,0,0,.15), 
              0 0 6px 0 rgba(0,0,0,.04);
    }

    &:hover > .item-header >.el-icon-edit {
      display: block;
      opacity: 1;
    }
    &:hover > .item-header >.el-icon-close {
      display: block;
      opacity: 1;
    }
    .item-header {
      background: $color-bg-dark-white;
      text-align: center;
      display: flex;
      flex-direction: column;
      padding-top: 32px;
      position: relative;
      img {
        margin: 0 auto;
        overflow: hidden;
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .el-icon-edit {
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: $font-size-small;
        opacity: 0;
        display: none;
      }
      .el-icon-close {
        position: absolute;
        top: 40px;
        right: 16px;
        font-size: $font-size-small;
        opacity: 0;
        display: none;
        color: red;
      }
    }
    .item-body {
      .el-row {
        padding: 8px 0;
        .el-col:nth-child(1) {
          text-align: right;
          padding-right: 8px; 
        }
        .el-col:nth-child(2) {
          color: $color-text-light-black;
        }
      }
    }
  }
  .add {
    display: block;
    position: fixed;
    right: 32px;
    bottom: 48px;
    background: $color-button-light-blue;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    .el-icon-plus {
      color: #fff;
    }
  }
}
</style>

