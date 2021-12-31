<!--  -->
<template>
  <div class="toolbar">
    <div class="item">
      <icon icon="#icon-dianzan1" class="icon" /><span>{{
        video.praisedCount
      }}</span>
    </div>
    <div class="item">
      <icon icon="#icon-shoucang1" class="icon" /><span>{{
        video.subscribeCount
      }}</span>
    </div>
    <div class="item">
      <icon icon="#icon-share-fill" class="icon" /><span>{{
        video.shareCount
      }}</span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/common/icon/Icon";
export default {
  props: {
    video: {
      typeof: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  components: {
    Icon,
  },
};
</script>
<style lang='scss' scoped>
.toolbar {
  display: flex;
  padding: 20px 0;
  border-bottom: #ccc 1px solid;
  color: #757575;
  .item {
    width: 92px;
    display: flex;
    align-items: center;
    margin-right: 8px;
    .icon {
      font-size: 24px;
    }
  }
}
</style>