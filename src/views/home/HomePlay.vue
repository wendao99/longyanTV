<!--  -->
<template>
  <div class="player" > 
    <video-cpn :url="url" v-if="url.length !== ''" ></video-cpn>
  </div>
</template>

<script>
import VideoCpn from "@/components/content/VideoCpn";

export default {
  name: "HomeUrl",
  data() {
    return {
      url: "",
    };
  },
  computed: {
    monitorUrl() {
      return this.$store.state.homeUrl;
    },
  },
  watch: {
    monitorUrl() {
      this.url = this.$store.state.homeUrl;
    },
  },
  components: {
    VideoCpn,
  },
};
</script>
<style lang='scss' scoped>
.player {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 30px;
  background: black;
}
</style>