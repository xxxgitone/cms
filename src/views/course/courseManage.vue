<template>
  <div class="course">
    <el-row>
      分类
      <tags-list></tags-list>
      <search-boxs></search-boxs>
    </el-row>
    <course-list></course-list>
  </div>
</template>

<script>
import TagsList from 'components/tags-list/tags-list'
import CourseList from 'components/course-list/course-list'
import SearchBoxs from 'components/search-boxs/search-boxs'

export default {
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
}
</style>
