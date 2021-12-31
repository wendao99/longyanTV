<!-- 视频组件 -->
<template>
  <div class="videocpn">
    <video controls loop class="player" ref="video">
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  name: "VideoCpn",
  props: {
    url: String,
  },
  data() {
    return {
      urls: [],
      isUrl: false,
    };
  },
  computed: {
    isShow() {
      if(this.url.length > 10) {
        return true
      }
    }
  },
  updated() {
    this.$refs.video.load()
  },
};
</script>
<style lang='scss' scoped>
.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>