<template>
  <div class="personal-info">
    <div class="user-avatar">
      <img :src="user.avatar">
      <el-upload>
        <el-button 
          size="mini" 
          type="primary">
          修改头像
        </el-button>
      </el-upload>
    </div>
    <el-row>
      <el-col :span="12">
        <span>账户名:</span>
        <span>姓名:</span>
        <span>出生日期:</span>
        <span>角色:</span>
        <span>电话号码:</span>
        <span>入职日期:</span>
        <span>校区:</span>
      </el-col>
      <el-col :span="12">
        <span>{{ user.account }}</span>
        <span>{{ user.userName }}</span>
        <span>{{ user.birthday | formatDate }}</span>
        <span>{{ user.role }}</span>
        <span>{{ user.phoneNumber }}</span>
        <span>{{ user.entryDate | formatDate}}</span>
        <span>{{ user.campus }}</span>         
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getUserByToken} from 'api/user'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this._getUserByToken()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    _getUserByToken () {
      getUserByToken().then(res => {
        if (res.code === OK_CODE) {
          this.user = res.user
          console.log(this.user)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixins.scss";
@import "../../common/scss/variable.scss";

.personal-info {
  @include flexCenter;
  background: $color-bg-dark-white;
  .user-avatar {
    margin-right: 25px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .el-row {
    width: 25%;
    .el-col {
      display: flex;
      flex-direction: column;
      span {
        padding: 4px 0;
      }
    }
  }
}
</style>
