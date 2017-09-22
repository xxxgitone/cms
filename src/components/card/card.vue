<template>
  <div class="card">
    <div class="card-title">{{title}}</div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";
@import "../../common/scss/mixins.scss";

.card {
  .card-title {
    background: $color-text-dark-white;
    color: $color-text-light-black;
    padding: 16px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    @include boxShadow;
  }
  .card-body {
    border: 1px solid $color-text-dark-white;
    padding: 16px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
