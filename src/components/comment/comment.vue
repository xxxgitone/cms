<template>
  <ul class="comments-list">
    <li class="comments-item" v-for="(comment, index) in comments" :key="comment._id">
      <div class="comment-wrapper">
        <img :src="comment.from.headimgurl" >
        <div class="comment-info">
          <span class="nickname">{{ comment.from.nickname }}</span>
          <span class="content">{{ comment.content}}</span>
          <span>
            <span class="timeAgo">{{ comment.createAt | timeAgo }}</span>
            <span class="reply" @click="toggleReply(index)">回复</span>
          </span>
        </div>
      </div>
      <transition name="reply">
        <div class="reply-box" v-show="index === currentIndex">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textareaVal">
          </el-input>
          <el-button :plain="true" type="danger" size="small" @click="toggleReply(index)">取消</el-button>
          <el-button type="info" size="small" @click="submit(comment)">提交</el-button>
        </div>
      </transition>
      <ul class="comments-list sub-list" v-show="comment.reply.length > 0">
        <template>
          <li class="comments-item" v-for="reply in comment.reply" :key="reply._id">
            <div class="comment-wrapper">
              <img src="../../common/img/jerry.jpeg" >
              <div class="comment-info">
                <span class="nickname">{{ reply.from.userName }}
                  <span>[{{ reply.from.role | formatRole }}]</span>
                </span>
                <span class="content">{{ reply.content}}</span>
                <span class="timeAgo">{{ reply.createAt | timeAgo }}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
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
  },
  data () {
    return {
      textareaVal: '',
      currentIndex: -1
    }
  },
  methods: {
    toggleReply (index) {
      if (this.currentIndex === index) {
        this.currentIndex = -1
      } else {
        this.currentIndex = index
        this.textareaVal = ''
      }
    },
    submit (comment) {
      this.$emit('submit', comment, this.textareaVal)
      this.currentIndex = -1
      this.textareaVal = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.comments-list {
  .comments-item {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    .comment-wrapper {
      display: flex;
      margin-bottom: 8px;
    }
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
        font-size: $font-size-medium;
        color: $color-text-light-black;
        span {
          font-size: $font-size-small-s;
          color: red;
        }
      }
      .content {
        padding: 4px 16px 4px 0;
      }
      .timeAgo {
        font-size: $font-size-small;
      }
      .reply {
        font-size: $font-size-small;
        cursor: pointer;
        &:hover {
          color: $color-button-light-blue;
        }
      }
    }
    .reply-box {
      margin: 0 0 16px 80px;
      .el-textarea {
        width: 70%;
        margin-right: 8px;
      }
    }
  }
  .sub-list {
    margin-left: 60px;
    border-bottom: 1px solid #eeeeee;
    li {
      margin-bottom: 8px;
    }
  }
}
.reply-enter-active, .reply-leave-active {
  transition: opacity 0.3s;
}
.reply-enter, .reply-leave-to {
  opacity: 0;
}
</style>
