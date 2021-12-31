<!--  -->
<template>
  <div class="main-content">
    <slide-scroll v-if="urls.length > 0" ref="scroll">
      <div class="slide-page" v-for="(item, index) in urls">
        <video-cpn :url="urls[index]" v-if="index == pageY"></video-cpn>
      </div>
    </slide-scroll>
  </div>
</template>

<script>
import SlideScroll from "@/components/content/scroll/SlideScroll.vue";
import VideoCpn from "@/components/content/VideoCpn.vue";

export default {
  data() {
    return {
      urls: [],
      pageY: 0,
      isShow: false,
    };
  },
  components: {
    SlideScroll,
    VideoCpn,
  },
  created() {
    this.urls = this.$store.state.vUrls;
  },
  computed: {
    monitorPageY() {
      return this.$store.state.pageY;
    },
    monitorUrls() {
      return this.$store.state.vUrls;
    },
  },
  watch: {
    monitorPageY() {
      this.pageY = this.$store.state.pageY;
      if (this.pageY == this.urls.length - 1) {
        this.$store.commit("upOffset");
      }
    },
    monitorUrls() {
      this.urls = this.$store.state.vUrls;
    },
  },
  updated() {
    if (this.urls.length > 2) {
      this.$refs.scroll.slide.refresh();
    }
  },
};
</script>
<style lang='scss' scoped>
.main-content {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 30px;
  background: black;
  .slide-page {
    position: relative;
    display: inline-block;
    width: 100%;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

  }
}
</style>