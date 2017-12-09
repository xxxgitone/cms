<template>
  <div class="course-list">
    <el-card :body-style="{ padding: '0px' }" v-for="item in data" :key="item._id">
      <img :src="item.picUrl">
      <div class="course-info">
        <el-row class="course-info-top">
          <el-col :span="18" class="course-title">
            {{item.courseName}}
            <el-tag type="success">{{item.tag}}</el-tag>
            <el-tag type="warning">{{item.courseType | formatType}}</el-tag>            
          </el-col>
          <el-col :span="6">
            <i-svg icon="seeuser" :i-style="{'margin-right': '0'}"></i-svg>
            <span class="student-num">55</span>
          </el-col>
        </el-row>
        <el-row class="course-info-bottom">
          <el-col :span="18" class="course-campus">{{item.campus}}</el-col>
          <el-col :span="6">
            <span class="course-teacher">{{item.teacher}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="tool-mask">  
        <i-svg icon="edit" :i-style="{width: '45px', height: '22px'}" @clicked="edit(item)"></i-svg>
        <i-svg icon="eye" :i-style="{width: '45px', height: '22px'}" @clicked="checked(item)"></i-svg>
        <i-svg icon="delete" :i-style="{width: '45px', height: '22px'}" @clicked="deleted(item)"></i-svg>
      </div>
    </el-card>
  </div>
</template>

<script>
import ISvg from 'components/i-svg/i-svg'

export default {
  props: ['data'],
  methods: {
    edit (item) {
      this.$emit('edit', item)
    },
    checked (item) {
      this.$emit('checked', item)
    },
    deleted (item) {
      this.$emit('deleted', item)
    }
  },
  components: {
    ISvg
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixins.scss";
@import "../../common/scss/variable.scss";

.course-list {
  display: flex;
  flex-wrap: wrap;
  .el-card {
    width: 245px;
    height: 200px;
    margin-right: 24px;
    margin-bottom: 24px;
    position: relative;
    img {
      width: 100%;
      height: 140px;
      cursor: pointer;
      &:hover ~ .tool-mask {
        display: flex;
      }
    }
    .course-info {
      padding: 4px 8px 0 4px;
      .course-info-top {
        line-height: 20px;
        color: $color-text-light-black;
        .el-col:nth-child(2) {
          text-align: right;
        }
        .course-title {
          font-size: $font-size-medium-x;
        }
        .student-num {
          font-size: $font-size-small;
        }
      }
      .course-info-bottom {
        line-height: 20px;
        font-size: $font-size-medium;
        .course-campus {
          color: $color-text-silver;
        }
        .course-teacher {
          color: $color-text-silver;
        }
        .el-col:nth-child(2) {
          text-align: right;
        }
      }
    }
    .tool-mask {
      position: absolute;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      right: 0;
      bottom: 58px;
      left: 0;
      @include flexCenter;
      display: none;
      cursor: pointer;
      transition: all .3s;
      opacity: 0;
      &:hover {
        display: flex;
        opacity: 1;
      }
    }
  }
}
</style>
