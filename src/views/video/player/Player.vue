<!--  -->
<template>
  <div>
    <div class="header-info">
      <div class="title">
        <span>{{ video.title }}</span>
      </div>
      <div class="data">
        <span>{{ playCount }} 播放</span
        ><span>{{ publishTime }}</span>
      </div>
    </div>
    <div class="player">
      <control :url="url" :video="video" />
    </div>
    <toolbar :video="video" />
    <div class="info">
      <div class="desc">{{ video.description }}</div>
      <div class="tag">
        <ul>
          <li v-for="item in video.videoGroup">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { videoDetail, videoUrl, videoDetailData } from "@/network/index.js";
import { formatCount, formatDate, formatTime } from "@/utils/filters.js";
import Control from "./Control.vue";
import Toolbar from "./Toolbar.vue";
export default {
  data() {
    return {
      video: {},
      url: "",
    };
  },
  props: {
    vid: {
      typeof: String,
      default() {
        return "";
      },
    },
  },
  components: {
    Control,
    Toolbar,
  },
  created() {
    this.videoDetail(this.vid);
    this.videoUrl(this.vid);
  },
  watch: {
    $route(to) {
      console.log(to);
      this.videoDetail(to.params.vid);
      this.videoUrl(to.params.vid);
    }
  },
  computed: {
    playCount() {
      return formatCount(this.video.playCount);
    },
    publishTime() {
      return `${formatDate(this.video.publishTime)}  ${formatTime(
        this.video.publishTime * 1000
      )}`;
    },
  },
  methods: {
    videoDetail(vid) {
      videoDetail(vid).then((res) => {
        this.video = new videoDetailData(res.data);
      });
    },
    videoUrl(vid) {
      videoUrl(vid).then((res) => {
        this.url = res.urls[0].url;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.header-info {
  width: 100%;
  height: 66px;
  .title {
    font-size: 18px;
    font-weight: 550;
    color: #212121;
    line-height: 26px;
    padding: 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .data {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
    color: #999;
    span {
      padding-right: 10px;
    }
  }
}
.player {
  
}
.info {
  font-size: 12px;
  color: #212121;
  line-height: 18px;
  padding: 18px 0;
  border-bottom: #ccc solid 1px;
  .desc {
    margin-bottom: 16px;
  }
  .tag {
    ul {
      display: flex;
      li {
        position: relative;
        height: 22px;
        line-height: 22px;
        transition: all 0.3s;
        font-size: 12px;
        background: #f6f7f8;
        border: 1px solid transparent;
        border-radius: 100px;
        margin: 0 10px 8px 0;
        padding: 0 12px;
        &:hover {
          cursor: pointer;
          border: 1px solid #ff761f;
        }
      }
    }
  }
}
</style>