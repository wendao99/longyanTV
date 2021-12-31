<!--  -->
<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in data" :key="index" class="col" :xs="20" :sm="12" :md="8" :lg="6" >  
        <router-link :to="`/video/${item.vid}`">
        <el-card :body-style="{ padding: '0px' }" shadow='hover' @click.native="cardClick(item.vid)" >
          <img
            :src="item.coverUrl"
            class="image"
          />
          <div style="padding: 14px" class="title">
            <span>{{item.title}}</span>
          </div>
        </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    cardClick(index) {
      this.$emit('cardClick', index)
    }
  },

};
</script>
<style lang='scss' scoped>
.col {
  margin-bottom: 20px;
  height: 14.375rem;
  cursor: pointer;
}
.image {
  width: 100%;
  height: 10.9375rem;
  display: block;
}
.title {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.router-link-active {
    text-decoration: none;
  }
  a{
    text-decoration: none;
    color: white;
  }
</style>