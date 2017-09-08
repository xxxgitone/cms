<template>
  <div class="layout">
    <div class="side-nav">
       <h1 class="title" :class="{hide: isCollapse}">
        <span class="title-text">{{"艺术学校(" + campus.substr(0, 2) + ")校区"}}</span>
      </h1> 
      <h1 class="title collapse-title" :class="{show: isCollapse}">
        <span class="title-text">艺</span>
      </h1>  
      <side-nav :isCollapse="isCollapse"></side-nav>
    </div>
    <div class="side-left">
      <div class="head-nav">
        <el-row>
          <el-col :span="1" class="collapse-icon">
            <i-svg :icon="iconName" @select="switchCollapse"></i-svg>
          </el-col>
          <el-col :span="22" class="nav-bar">
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
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      isCollapse: false,
      breadcrumbs: []
    }
  },
  created () {
    this._getBreadcrumb()
  },
  computed: {
    iconName () {
      return this.isCollapse ? 'unfold' : 'collapse'
    },
    ...mapGetters([
      'campus'
    ])
  },
  methods: {
    switchCollapse () {
      this.isCollapse = !this.isCollapse
    },
    _getBreadcrumb () {
      const matched = this.$route.matched.slice(1)
      matched.forEach(item => {
        this.breadcrumbs = item.name ? item.name : []
      })
    }
  },
  watch: {
    $route () {
      this._getBreadcrumb()
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
    }
    .nav-bar {
      display: flex;
      justify-content: flex-end;
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
