<template>
  <ul class="tags">
    <li class="current">美术</li>
    <li>美术</li>
    <li>中国舞</li>
    <li>武术</li>
    <li>钢琴</li>
  </ul>
</template>

<script>
export default {

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
    padding: 0 4px;
    margin-right: 8px;
    border-radius: 4px;
    &:hover {
      color: #13CE66;
    }
    &.current {
      background: $color-bg-blue;
      color: white;
    }
  }
}
</style>
