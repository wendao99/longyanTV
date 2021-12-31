<!--  -->
<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <asides></asides>
    </el-aside>
    <el-container>
      <el-header class="header"> 
        <search />
        <entry />
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Asides from "@/views/aside/Asides.vue";
import Recommend from '@/views/recommend/Recommend'
import Search from '@/views/header/search/Search'
import Entry from '@/views/header/entry/Entry'

export default {
  name: "Layout",
  data() {
    return {
      
    };
  },
  components: {
    Asides,
    Recommend,
    Search,
    Entry
  },


};
</script>
<style lang='scss' scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside {
  background: #F1F2F5;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: rgb(226, 226, 226) solid 1px;
  background: rgb(255, 255, 255);
  padding: 0 30px;
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
}

</style>