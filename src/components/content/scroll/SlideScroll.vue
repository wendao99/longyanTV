<!--纵向轮播  -->
<template>
  <div class="slide-vertical" >
    <div class="vertical-wrapper">
      <div class="slide-vertical-wrapper" ref="slide">
        <div class="slide-vertical-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(Slide);
BScroll.use(MouseWheel)

export default {
  name: "SlideYScroll",
  data() {
    return {
      currentPageIndex: 0,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.slide.destroy();
  },
  methods: {
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: false,
        scrollY: true,
        slide: {
          loop: false,
          autoplay: false,
          threshold: 100,
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        mouseWheel: true
      });
      this.slide.on("scrollEnd", this._onScrollEnd);
      this.slide.on('slidePageChanged', (page) => {
        this.$store.commit('pageY', {pageY: page.pageY})
      });
    },
  },
  _onScrollEnd() {
    let pageIndex = this.slide.getCurrentPage().pageY;
    this.currentPageIndex = pageIndex;
  },
};
</script>
<style lang='scss' scoped>
.slide-vertical {
  height: 100%;
  &.view {
    padding: 0;
    height: 100%;
  }
  .vertical-wrapper {
    position: relative;
    height: 100%;
    font-size: 0;
  }
  .slide-vertical-wrapper {
    height: 100%;
    overflow: hidden;
  }
}
</style>