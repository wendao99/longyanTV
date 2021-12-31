<!--  -->
<template>
  <div class="home">
    <b-scroll
      class="wrapper"
      :probe-type="3"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <div>
        <card :data="videoArr" @cardClick='cardClick' />
        <span class="load" v-if="loading">加载中</span>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import { videoAll, videoDetail, videoUrl } from "@/network/index";
import Card from "@/components/content/Card";
import BScroll from "@/components/content/scroll/BScroll";

export default {
  name: "home",
  components: {
    Card,
    BScroll,
  },
  data() {
    return {
      videoArr: [],
      offset: 0,
      loading: false,
    };
  },
  created() {
    this.videoAll(this.offset);
  },
  computed: {
    monitorVideoArr() {
      return this.videoArr;
    },
  },
  updated() {
    if(!this.isPlayer) {
      this.$refs.scroll.bs.refresh()
    }
  },
  methods: {

    cardClick(vid) {
      this.videoUrl(vid)
    },

    //加载更多
    async loadMore() {
      this.loading = true
      await this.requestData()
      this.$refs.scroll.bs.finishPullUp()
      this.$refs.scroll.bs.refresh()
      this.loading = false
    },
    async requestData() {
        try {
          const newData = await this.ajaxGet(/* url */)
          this.offset += newData
          this.videoAll(this.offset)
        } catch (err) {
          // handle err
          console.log(err)
        }
      },
      ajaxGet(/* url */) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(this.offset++)
          }, 1000)
        })
      },

    //防抖函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    //网络请求
    videoAll(offset) {
      videoAll(offset).then((res) => {
        console.log(res);
        for (const item of res.datas) {
          if (item.data.vid !== undefined) {
            this.videoDetail(item.data.vid);
          }
        }
      });
    },
    videoDetail(id) {
      videoDetail(id).then((res) => {
        this.videoArr.push({
          vid: res.data.vid,
          title: res.data.title,
          coverUrl: res.data.coverUrl,
        });
      });
    },
    videoUrl(id) {
      videoUrl(id).then(res => {
        if (res.urls.length !== 0) {
            this.$store.commit("videoUrl", { 
              vUrl: res.urls[0].url,
              home: 'home'
             });
          }
      })
    }
  },
};
</script>
<style lang='scss' scoped>
.home {
  height: 100%;
}
.wrapper {
  height: 100%;
  padding: 0 10px;
  overflow: hidden;
  .load {
    text-align: center;
    font-size: 20px;
  }
}
</style>