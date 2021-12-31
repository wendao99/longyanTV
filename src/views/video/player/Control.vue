<!--  -->
<template>
  <div class="control" ref="control">
    <div class="control-bar">
      <div class="content">
        <div class="progress" @mousedown="setProgress" ref="progress">
          <div class="buffered" :style="{ width: buffered }"></div>
          <div class="percentage" :style="{ width: percentage }"></div>
        </div>
        <el-row class="control-bottom">
          <el-col :span="7">
            <div>
              <div class="play-btn" @click="play">
                <icon icon="#icon-bofanganniu" v-if="!isPlay" class="icon" />
                <icon icon="#icon-zantinganniu" v-if="isPlay" class="icon" />
              </div>
              <span>
                {{ currentTime }}
              </span>
              <span> /{{ durationms }} </span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="center">
              <el-input
                size="mini"
                v-model="danmu"
                placeholder="发个弹幕见证下~"
                @keyup.enter.native="danmuSend"
              ></el-input>
              <el-button size="mini" @click="danmuSend"
                ><span>发送</span></el-button
              >
            </div>
          </el-col>
          <el-col :span="7">
            <div class="right">
              <div @click="full">
                <icon icon="#icon-quanping" v-if="!isFull" class="icon" />
                <icon icon="#icon-quxiaoquanping" v-if="isFull" class="icon" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="screen" @click="play"></div>
    <danmu :danmu-arr="danmuArr" :current-time="currentTime" v-if="danmuArr.length !== 0" :is-play="isPlay" />
    <video
      width="100%"
      height="100%"
      :src="url"
      ref="video"
      @timeupdate="timeUpDate"
      @progress="bufferProgress"
    ></video>
  </div>
</template>

<script>
import Danmu from './Danmu.vue'
import Icon from "@/components/common/icon/Icon";
import { formatTime } from "@/utils/filters.js";
import { full, exitFullscreen, isFullscreenEnabled } from "@/utils/player.js";
export default {
  props: {
    url: String,
    default() {
      return "";
    },
    video: {
      typeof: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      danmu: "", //弹幕
      danmuArr: [], //弹幕集合
      isPlay: false, //播放
      isFull: false, //全屏
      currentTime: "0:00", //当前播放时间
      percentage: "0%", //播放时长百分比
      buffered: "0%", //缓冲时长百分比
      progressWidth: 0, //进度条宽度
    };
  },
  components: {
    Icon,
    Danmu
  },
  computed: {
    durationms() {
      return formatTime(this.video.durationms);
    },
  },
  created() {
    if(localStorage.getItem("danmu") !== null) {
      this.danmuArr = JSON.parse(localStorage.getItem("danmu"))
    }
  },
  mounted() {
    this.progressWidth = this.$refs.progress.clientWidth
  },
  methods: {
    //播放时间
    timeUpDate(event) {
      if (event.target.currentTime !== 0) {
        this.currentTime = formatTime(
          Math.floor(event.target.currentTime * 1000)
        );
        this.percentage = `${
          ((event.target.currentTime * 1000) / this.video.durationms) * 100
        }%`;
      }
    },
    //缓冲时间
    bufferProgress(event) {
      if (event.target.buffered.length != 0) {
        this.buffered = `${
          ((event.target.buffered.end(0) * 1000) / this.video.durationms) * 100
        }%`;
      }
    },
    //全屏
    full() {
      this.isFull = !this.isFull;
      if (this.isFull && isFullscreenEnabled()) {
        full(this.$refs.control);
      } else {
        exitFullscreen();
      }
    },
    //播放
    play() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    //发送弹幕
    danmuSend() {
      if (typeof Storage !== "undefined") {
        let danmuArr = [];
        let danmuStr = localStorage.getItem("danmu")
        danmuStr === null? danmuArr = [] : danmuArr = JSON.parse(danmuStr);
        danmuArr.push({ time: this.currentTime, danmu: this.danmu ,id: 'i' + danmuArr.length});
        this.danmuArr = danmuArr
        danmuStr = JSON.stringify(danmuArr)
        localStorage.setItem("danmu", danmuStr);
        this.danmu = ''
      } else {
        console.log('抱歉！您的浏览器不支持 Web Storage ...');
      }
    },
    // 设置播放进度
    setProgress(e) {
      let offsetX = e.offsetX
      let currentProgress = offsetX / this.progressWidth
      let totalSecond = this.video.durationms / 1000
      this.percentage = `${currentProgress * 100}%`;
      this.$refs.video.currentTime = currentProgress * totalSecond
      if(!this.isPlay) this.play()
    }
  },
};
</script>
<style lang='scss'>
.control {
  position: relative;
  width: 100%;
  height: 500px;
  background: black;
  .screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 42px;
    z-index: 3000;
    &:hover {
      cursor: pointer;
    }
  }
  .control-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 42px;
    color: #fff;
    
    .content {
      position: relative;
      margin: 0 18px;
      .progress {
        position: absolute;
        width: 100%;
        height: 2px;
        background: #ccc;
        z-index: 1500;
        &:hover {
          height: 3px;
          cursor: pointer;
        }
        .buffered {
          position: absolute;
          height: 100%;
          background-color: #999;
        }
        .percentage {
          position: absolute;
          height: 100%;
          background-color: #ff7500;
        }
      }
      .control-bottom {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #fff;
        z-index: 1000;
        .icon {
          font-size: 24px;
        }
        .play-btn {
          display: inline;
          width: 44px;
          &:hover {
            cursor: pointer;
          }
        }
        .right {
          float: right;
        }
        .center {
          display: flex;
          align-items: center;
          width: 100%;
          font-size: 12px;
          .el-input__inner {
            border: none;
            border-radius: 4px 0 0 4px;
            background: #333;
          }
          .el-button {
            border: none;
            border-radius: 0 4px 4px 0;
            background: #ff7500;
          }
        }
      }
    }
  }
}
</style>