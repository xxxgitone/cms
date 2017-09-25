<template>
  <div class="course">
    <el-row>
      分类
      <tags-list :data="tags"></tags-list>
      <search-boxs></search-boxs>
    </el-row>
    <course-list :data="courseInfo"></course-list>
    <span class="add" @click="handleAdd">
      <i class="el-icon-plus"></i>
    </span>
  </div>
</template>

<script>
import TagsList from 'components/tags-list/tags-list'
import CourseList from 'components/course-list/course-list'
import SearchBoxs from 'components/search-boxs/search-boxs'
import {getCourses} from 'api/course'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      courseInfo: [],
      tags: []
    }
  },
  created () {
    this._getCourse()
  },
  methods: {
    handleAdd () {
      this.$router.push('/admin/course/info/add')
    },
    _getCourse () {
      getCourses().then((res) => {
        if (res.code === OK_CODE) {
          this.tags = res.tags
          this.courseInfo = res.course
        }
      })
    }
  },
  components: {
    TagsList,
    CourseList,
    SearchBoxs
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.course {
  .el-row {
    display: flex;
    color: $color-text-light-black;
    // height: 25px;
    // line-height: 25px;
    align-items: center;
    margin-bottom: 16px;
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
