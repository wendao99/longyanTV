<!--  -->
<template>
  <div class="related">
    <span>相关视频推荐</span>
    <ul>
      <li v-for="item in related" class="item" @click="itemClick(item.vid)">
        <el-row :gutter="10">
          <el-col :span="12"
            ><div class="cover"><img :src="item.coverUrl" /></div
          ></el-col>
          <el-col :span="12" class="info">
            <span class="title">{{ item.title }}</span>
            <div class="name"><span>{{ item.creator[0].userName }}</span></div>
            <div class="count">
              <span>{{ playCount(item) }}</span>
            </div>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { relatedVideo } from "@/network/index.js";
import { formatCount } from "@/utils/filters.js";
export default {
  name: "Related",
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
      related: [],
    };
  },
  created() {
    this.relatedVideo(this.vid);
  },
  watch: {
    $route(to) {
      this.relatedVideo(to.params.vid);
    }
  },
  computed: {},
  methods: {
    itemClick(vid) {
      this.$router.push(`/video/${vid}`)
    },

    playCount(item) {
      return `${formatCount(item.playTime)} 播放`;
    },
    relatedVideo(vid) {
      relatedVideo(vid).then((res) => {
        this.related = res.data;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.related {
  .item {
    margin: 8px 0;
    .cover {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      height: 36px;
      .title {
        display: block;
        font-size: 14px;
        height: 36px;
        line-height: 18px;
        margin-bottom: 6px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .count {
        display: inline-block;
        height: 16px;
        width: 100%;
        color: #999;
        font-size: 12px;
      }
      .name {
        display: inline-block;
        height: 16px;
        width: 100%;
        color: #999;
        font-size: 12px;
      }
    }
    :hover {
      cursor: pointer;
    }
  }
}
</style>