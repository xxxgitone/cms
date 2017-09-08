<template>
  <div class="login">
    <div class="login-box">
      <div class="logo-title">
        <img src="../../common/img/cms.png" width="50" height="50"/>
        <h1>文化艺术培训学校管理系统</h1>
      </div>
      <el-form 
        :model="loginForm" 
        label-width="60px" 
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item label="账户" prop="account">
          <el-input auto-complete="off" v-model="loginForm.account" placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.enter="submitForm" v-loading="loading" :disabled="disabled">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import NProgress from 'nprogress'

export default {
  data () {
    const validateAccount = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入账户名'))
      } else {
        cb()
      }
    }
    const validatePassword = (rule, value, cb) => {
      if (value.length < 6) {
        cb(new Error('密码不少于6位'))
      } else {
        cb()
      }
    }
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      },
      loading: false,
      disabled: false
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          NProgress.start()
          this.loading = true
          this.disabled = true
          const form = Object.assign(this.loginForm, {action: 'login'})
          this.LoginByAccount(form).then((res) => {
            NProgress.done()
            this.loading = false
            this.disabled = false
            this.$router.push('manage')
            this.$message({
              showClose: true,
              message: res,
              type: 'success'
            })
          }).catch((err) => {
            NProgress.done()
            this.loading = false
            this.disabled = false
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    ...mapActions([
      'LoginByAccount'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixins.scss";

.login {
  height: 100%;
  background: $color-bg-dark-d;
  @include flexCenter;
  .login-box {
    .logo-title {
      @include flexCenter;
      margin-bottom: 16px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
      h1 {
        font-size: $font-size-large-x;
        color: $color-text-silver;
      }
    }
    .el-form {
      background: $color-text-dark-white;
      padding: 32px 0 8px 0;
      border-radius: 8px;
      .el-form-item {
        width: 350px;
        margin-right: 24px;
      }
      .el-button {
        width: 260px;
      }
    }
  }
}
</style>
