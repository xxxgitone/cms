<template>
  <div class="comments-list">
    <ul>
      <li v-for="comment in comments" :key="comment._id" class="comment-item">
        <img :src="comment.from.headimgurl">
        <span>{{comment.from.nickname}}</span>
        <span v-show="type === 'advisory'">咨询课程</span>
        <span v-show="type === 'feedback'">反馈课程</span>
        <span>{{comment.course.courseName}}</span>
        <span style="font-size: 12px;color:red;">{{comment.course.courseType | formatType}}</span>
        <span>：</span>
        <span>{{comment.content}}</span>
        <el-button type="text" @click="checkComment(comment)">查看</el-button>
      </li>
      <span v-show="comments.length === 0">暂无记录</span>
    </ul>
  </div>
</template>

<script>
import {fetchCommentsByType} from 'api/comment'
import {OK_CODE} from 'api/config'

export default {
  data () {
    return {
      comments: [],
      type: ''
    }
  },
  created () {
    this._getComments()
  },
  methods: {
    checkComment (comment) {
      const courseId = comment.course._id
      this.$router.push(`/admin/course/${courseId}?from=check`)
    },
    _getComments () {
      this.type = this.$route.query.type
      fetchCommentsByType(this.type).then(res => {
        if (res.code === OK_CODE) {
          this.comments = res.comments
        }
      })
    }
  },
  watch: {
    $route () {
      this._getComments()
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././../common/scss/variable.scss";

.comments-list {
  width: 100%;
  background: $color-bg-dark-white;
  overflow: hidden;
  ul {
    width: 60%;
    margin: 20px auto;
    .comment-item {
      padding: 6px;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        color: $color-text-light-black;
      }
      .el-button {
        margin-left: 16px;
      }
    }
  }
}
</style>
