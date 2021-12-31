<!--  -->
<template>
  <div v-if="recentVideo.total > 0">
    <div v-for="item in recentVideo.list.slice(0, 10)" class="recent-list" @click="listClick(item.resourceId)">
      <div class="left"><img :src="item.data.coverUrl" alt="封面" /></div>
      <div class="right">
        <div class="title">{{ item.data.title }}</div>
        <div class="creator" v-if="item.data.creator !== undefined">
          {{ item.data.creator.nickname }}
        </div>
        <div class="play-time">{{ item.playTime | publishTime }}</div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/filters.js";
export default {
  props: {
    recentVideo: {
      typeof: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    listClick(value) {
      this.$message({
          showClose: true,
          message: '发生错误，未能跳转',
          type: 'error'
        });
    }
  },
  filters: {
    publishTime(value) {
      if(!value)  return ''
      return `${formatDate(value)}`;
    },
  }
};
</script>
<style lang='scss' scoped>
.recent-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #e3e5e7;
  }
  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding-left: 5px;
    .title {
      flex: 2;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .creator {
      flex: 1;
      font-weight: 400;
      color: #999;
    }
    .play-time {
      flex: 1;
      font-weight: 400;
      color: #999;
    }
  }
}
</style>