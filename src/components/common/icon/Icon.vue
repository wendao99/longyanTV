<template>
  <div class="ccc">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="icon"></use>
    </svg>
  </div>
</template>
<script>

export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default() {
        return '#icon-gengduo'
      }
    }
  }
};
</script>
<style scoped>
.ccc {
  display: inline-block;
}
.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
