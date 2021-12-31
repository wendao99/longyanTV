<!--  -->
<template>
  <div>
    <player />
  </div>
</template>

<script>
import Player from "@/components/content/Player.vue";
import { videoGroup, recommend, videoUrl } from "@/network/index";
export default {
  name: "recommend",
  components: {
    Player,
  },
  data() {
    return {
      vids: [],
      vUrls: [],
      title: ''
    };
  },
  created() {
    this.recommend(0);
  },
  computed: {
    monitorOffset() {
      return this.$store.state.offset;
    },
  },
  watch: {
    monitorOffset() {
      console.log(this.$store.state.offset);
      this.recommend(this.$store.state.offset);
    },
    $route: {
      handler: function (val, oldVal) {
        console.log(val);
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    //网络请求
    recommend(offset) {
      recommend(offset).then(
        (res) => {
          console.log(res);
          for (const i of res.datas) {
            this.vids.push(i.data.vid);
            this.videoUrl(i.data.vid);
            this.title = i.data.title
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    videoUrl(id) {
    videoUrl(id).then(
      (res) => {
        if (res.urls.length !== 0) {
          this.$store.commit("videoUrl", { vUrl: res.urls[0].url });
          // this.vUrls.push(res.urls[0].url)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
  },
};
</script>
<style lang='scss' scoped>
</style>