<!--  -->
<template>
  <div class="searchList">
    <card :data="this.$store.state.searchList" @cardClick="cardClick" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="this.$store.state.searchCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import Card from "@/components/content/Card";
import { videoUrl } from "@/network/index";

export default {
  data() {
    return {
      videoArr: [],
    };
  },
  components: {
    Card,
  },
  created() {
    this.videoArr = this.$store.state.searchList;
  },
  computed: {
    monitorSearchList() {
      return this.$store.state.searchList;
    },
  },
  methods: {
    cardClick(vid) {
      this.videoUrl(vid);
    },
    videoUrl(id) {
      videoUrl(id).then((res) => {
        if (res.urls.length !== 0) {
          this.$store.commit("videoUrl", {
            vUrl: res.urls[0].url,
            home: "home",
          });
        }
      });
    },
  },
};
</script>
<style lang='scss'>
.el-pagination {
  text-align: center;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  min-width: 40px;
}
.el-pagination button,
.el-pagination span:not([class*="suffix"]),
.el-pager li {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}
</style>