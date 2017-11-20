<template>
  <div class="layout">
    <div class="side-nav">
       <h1 class="title" :class="{hide: isCollapse}">
        <span class="title-text">文化艺术培训学院</span>
      </h1> 
      <h1 class="title collapse-title" :class="{show: isCollapse}">
        <img class="title-logo"src="../../common/img/cms.png">
      </h1>  
      <side-nav :isCollapse="isCollapse"></side-nav>
    </div>
    <div class="side-left">
      <div class="head-nav">
        <el-row>
          <el-col :span="1" class="collapse-icon">
            <i-svg :icon="iconName" @clicked="switchCollapse"></i-svg>
          </el-col>
          <el-col :span="4" class="current-campus">
            <span>当前校区：{{campus}}</span>
          </el-col>
          <el-col :span="18" class="nav-bar">
            <el-badge :value="tasks.length" :max="10" v-show="role === 'front'">
              <el-button size="small" @click="showTask">任务</el-button>
            </el-badge>
            <el-badge :value="commentsFeedback.length" :max="10">
              <el-button size="small" @click="showComment('feedback')">反馈</el-button>
            </el-badge>
            <el-badge :value="commentsAdv.length" :max="10">
              <el-button size="small" @click="showComment('advisory')">咨询</el-button>
            </el-badge>
            <head-nav></head-nav>
          </el-col>
          <el-col :span="1">
          </el-col>
        </el-row>
      </div> 
      <div class="main">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import SideNav from './sideNav'
import HeadNav from './headNav'
import AppFooter from './footer'
import Breadcrumb from 'components/breadcrumb/breadcrumb'
import {fetchCommentsByType} from 'api/comment'
import {OK_CODE} from 'api/config'
import {getTasks} from 'api/task'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      isCollapse: false,
      breadcrumbs: [],
      commentsAdv: [],
      commentsFeedback: [],
      tasks: []
    }
  },
  created () {
    this._getBreadcrumb()
    this._getComments()
    this._getTasks()
  },
  computed: {
    iconName () {
      return this.isCollapse ? 'unfold' : 'collapse'
    },
    ...mapGetters([
      'campus',
      'role'
    ])
  },
  methods: {
    switchCollapse () {
      this.isCollapse = !this.isCollapse
    },
    showComment (type) {
      this.$router.push(`/admin/comments?type=${type}`)
    },
    showTask () {
      this.$router.push('/admin/tasks')
    },
    _getBreadcrumb () {
      const matched = this.$route.matched.slice(1)
      matched.forEach(item => {
        this.breadcrumbs = item.name ? item.name : []
      })
    },
    _getComments () {
      const types = ['advisory', 'feedback']
      types.forEach(type => {
        fetchCommentsByType(type).then(res => {
          if (res.code === OK_CODE) {
            if (type === 'advisory') {
              this.commentsAdv = res.comments
            } else if (type === 'feedback') {
              this.commentsFeedback = res.comments
            }
          }
        })
      })
    },
    _getTasks () {
      const data = {
        campus: this.campus
      }
      getTasks(data).then(res => {
        if (res.code === OK_CODE) {
          this.tasks = res.tasks.filter(item => item.status !== 'fulfilled')
        }
      })
    }
  },
  watch: {
    $route () {
      this._getBreadcrumb()
      this._getComments()
      this._getTasks()
    }
  },
  components: {
    SideNav,
    HeadNav,
    AppFooter,
    Breadcrumb
  }
}
</script>

<style lang="scss" scopde>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixins.scss";

.layout {
  height: 100%;
  display: flex;
}
.side-nav {
  height: 100%;
  background: $color-bg-dark;
  .title {
    @include flexCenter;
    font-size: $font-size-large-x;
    color: $color-text-dark-white;
    height: 60px;
    width: 220px;
    transition: width .3s, transform .3s;
    .title-text {
      display: block;
      overflow: hidden;
      padding: 5px 8px;
      background: $color-bg-dark-d;
      word-wrap: none;
      border-radius: 5px;
      height: 42px;
      line-height: 35px;
    }
  }
  .hide {
    opacity: 0;
    width: 0;
    transform: translateX(-110%);
  }
  .title-logo {
    width: 35px;
    height: 35px;
  }
  .collapse-title {
    width: auto;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 15px;
    opacity: 0;
    transform: translateX(200%);
    transition: opacity .3s, transform .3s;
  }
  .show {
    transform: translateX(0);
    opacity: 1;
  }
}
.side-left {
  flex: 1;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head-nav {
    background: $color-bg-light;
    width: 100%;
    height: 60px;
    .collapse-icon {
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      transition: background .3s;
      &:hover {
        background: #C5DFF3;
      }
    }
    .current-campus {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: center;
    }
    .nav-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-badge {
        margin-right: 32px;
      }
      .avatar {
        width: 45px;
        height: 45px;
        img {
          max-height: 100%;
          width: 45px;
          border-radius: 50%;
        }
      }
    }
  }
  .main {
    flex: 1;
    .main-content {
      margin: 0 24px 24px 24px;
    }
  }
}
</style>
