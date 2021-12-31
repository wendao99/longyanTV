<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
import Pullup from "@better-scroll/pull-up";
import MouseWheel from '@better-scroll/mouse-wheel'


BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);
BScroll.use(Pullup);
BScroll.use(MouseWheel)

export default {
  name: "BScroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    isScrollX: {
      type: Boolean,
      default() {
        return false;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        ObserveDOM: true,
        observeImage: true,
        probeType: this.probeType,
        scrollX: this.isScrollX,
        click: true,
        pullUpLoad: this.pullUpLoad,
        bindToWrapper: true,
        mouseWheel: true
      });
      // this.bs.on("scrollStart", () => {
      //   console.log("scrollStart-");
      // });
      this.bs.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
      this.bs.on("scrollEnd", () => {
        this.$emit("scrollEnd");
      });
      if (this.pullUpLoad) {
        this.bs.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
      this.bs.finishPullUp();
    },
  },
};
</script>
<style scoped>
</style>