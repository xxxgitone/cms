<template>
  <ul class="comments-list">
    <li class="comments-item" v-for="comment in comments" :key="comment._id">
      <img :src="comment.from.headimgurl" >
      <div class="comment-info">
        <span class="nickname">{{ comment.from.nickname }}</span>
        <span class="content">{{ comment.content}}</span>
        <span class="timeAgo">{{ comment.createAt | timeAgo }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.comments-list {
  .comments-item {
    margin-bottom: 16px;
    display: flex;
    img {
      width: 45px;
      height: 45px;
      margin: 0 24px 0 16px;
      border-radius: 50%;
    }
    .comment-info {
      display: flex;
      flex-direction: column;
      .nickname {
        color: $color-text-light-black;
      }
      .content {
        padding: 4px 16px 4px 0;
      }
      .timeAgo {
        font-size: $font-size-small;
      }
    }
  }
}
</style>
