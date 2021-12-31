<!--  -->
<template>
  <div class="creator">
    <el-row :gutter="20">
      <el-col :span="5" class="face">
        <img :src="creator.avatarUrl" />
      </el-col>
      <el-col :span="19">
        <span>{{creator.nickname}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { videoDetail } from "@/network/index.js";
export default {
  props: {
    vid: {
      typeof: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      creator: {},
    };
  },
  created() {
    this.videoDetail(this.vid);
  },
  watch: {
    $route(to) {
      this.videoDetail(to.params.vid)
    }
  },  
  methods: {
    videoDetail(vid) {
      videoDetail(vid).then((res) => {
        this.creator = res.data.creator;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.creator {
  width: 100%;
  height: 66px;
  .face {
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
}
</style>