<template>
  <svg class="icon" aria-hidden="true" @click="clicked" :style="iStyle">
      <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    iStyle: {
      type: Object
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    }
  },
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>

<style>
.icon {
  width: 24px; 
  height: 14px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 5px;
  font-size: 14px;
}
</style>
