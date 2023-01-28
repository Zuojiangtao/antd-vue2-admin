<template>
  <i class="svg-icon">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="xlinkHref"></use>
    </svg>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconId: {
      type: String,
      require: true,
    },
  },
  computed: {
    xlinkHref() {
      return `#${this.iconId}`
    },
  },
}
</script>

<style lang="less" scoped>
.svg-icon {
  position: relative;
  height: auto;
}
</style>
