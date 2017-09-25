<template>
  <ul class="tags">
    <li class="current">全部</li>
    <li v-for="(item, index) in data" :key="index">{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable.scss";

.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 16px;
  color: $color-text-silver;
  font-size: $font-size-medium;
  display: flex;
  li {
    cursor: pointer;
    padding: 2px 4px;
    margin-right: 8px;
    border-radius: 4px;
    &:hover {
      color: $color-bg-blue;
    }
    &.current {
      background: $color-bg-blue;
      color: white;
    }
  }
}
</style>
