<!--  -->
<template>
  <div class="danmu" ref="danmu">
    <div ref="list">
      <div
        v-for="item in danmuList"
        :key="item.id"
        class="danmu-item"
        :ref="item.id"
        :id="item.id"
        :style="{animationPlayState: playState, left: playerWidth + 'px'}"
      >
        {{ item.danmu }}
      </div>
    </div>
  </div>
</template>

<script>
import {compare } from '@/utils/index.js'

export default {
  props: {
    danmuArr: {
      typeof: Array,
      default() {
        return [];
      },
    },
    currentTime: {
      typeof: String,
      default() {
        return "0:00";
      },
    },
    isPlay: {
      typeof: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      danmuList: [], //显示的弹幕
      playerWidth: 0, //播放器宽度
      playState: 'running', //弹幕播放
      seize: [{ data: {} }, { data: {} }, { data: {} }, { data: {} }, { data: {} }], //弹幕位置
    };
  },
  computed: {
    danmuMark() {
      return JSON.parse(JSON.stringify(this.danmuList));
    },
    speed() {
      return this.playerWidth / 10
    }
  },
  mounted() {
    this.playerWidth = this.$refs.danmu.clientWidth;
  },
  watch: {
    currentTime(newVal, oldVal) {
      let newList = this.danmuArr.filter((item) => {
        return item.time == newVal;
      });
      newList.map((item) => {
        this.pushDanmu(item);
      });
    },
    isPlay() {
      if(this.isPlay) {
        this.playState = 'running'
      }else {
        this.playState = 'paused'
      }
    },
    danmuArr() {
      this.pushDanmu(this.danmuArr[this.danmuArr.length - 1]);
    }
  },
  methods: {
    showClick() {
      this.pushDanmu(this.danmuArr[this.danmuList.length + 1]);
    },
    //添加弹幕到屏幕
    pushDanmu(danmu) {
      this.danmuList.push(danmu);
      setTimeout(() => {
        let element = document.querySelector("#" + danmu.id);
        if (!element) return;
        this.calcSeize(danmu, element);
        element.addEventListener("animationend", () => {
          this.danmuList.splice(this.danmuList.indexOf(danmu), 1);
        });
      }, 50);
    },
    //计算弹幕位置
    calcSeize(danmu, element) {
      let position = -1;
      let overlap = []
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          let temp = this.seize[i]['data'][j];
          if (temp) {
            let el = document.querySelector('#' + temp)
            if(el) {
              if(this.playerWidth - el.offsetWidth - el.offsetLeft >= 0 ) {
                position = j
              } else {
                overlap.push({'width': this.playerWidth - el.offsetWidth - el.offsetLeft, 'position': j}) 
                continue
              }
            }else position = j
          } else position = j
          if (position !== -1) {
            this.seize[i]['data'][position] = danmu.id;
            if(i > 0 && overlap.length === 4) {
              let data = overlap.sort(compare('width')).pop()
              element.style.top = 20 * data.position + 'px'
              let left = this.playerWidth + Math.abs(data.width)
              element.style.left = left + "px"
              let duration = (left + element.offsetWidth) / this.speed
              element.style.animationDuration = duration + 's' 
            } else {
              element.style.left = this.playerWidth +'px'
              element.style.top = 20 * position + 'px'
              let duration = this.playerWidth / this.speed
              element.style.animationDuration = duration + 's' 
            }
            break
          }
        }
        if(position !== -1) break 
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.danmu {
  position: absolute;
  width: 100%;
  height: 300px;
  overflow: hidden;
  button {
    position: absolute;
    top: 50px;
    z-index: 10000;
  }
  .danmu-item {
    position: absolute;
    display: inline-block;
    height: 20px;
    color: #fff;
    line-height: 1.25;
    user-select: none;
    white-space: pre;
    animation-name: danmuScroll;
    animation-timing-function: linear;
  }
}
@keyframes danmuScroll {
  0% {
    transform: translateX(10%);
  }
  100% {
    left: 0;
    transform: translateX(-100%);
  }
}
</style>