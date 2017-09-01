<template>
  <div class="layout">
    <div class="side-nav">
       <h1 class="title" :class="{hide: isCollapse}">
        <span class="title-text">艺术学校(浦东)校区</span>
      </h1> 
      <h1 class="title collapse-title" v-show="isCollapse">
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
      <div class="main-content">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from './sideNav'
import HeadNav from './headNav'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    iconName () {
      return this.isCollapse ? 'unfold' : 'collapse'
    }
  },
  methods: {
    switchCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    SideNav,
    HeadNav
  }
}
</script>

<style lang="scss" scopde>
@import "../../common/scss/variable.scss";

.layout {
  height: 100%;
  display: flex;
}
.side-nav {
  height: 100%;
  background: $color-bg-dark;
  .title {
    display: flex;
    font-size: $font-size-large-x;
    color: $color-text-dark-white;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 220px;
    transition: width .3s;
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
  }
  .collapse-title {
    width: auto;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 15px;
  }
}
.side-left {
  flex: 1;
  overflow-y: auto;
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
  .main-content {
    min-height: 100%;
    .breadcrumb {
      margin: 16px;
    }
  }
}
</style>
