<!--  -->
<template>
  <el-container>
    <el-header class="header">
      <router-link :to="`/home`" >
        <div class="logo">
          <img src="@/assets/logo.png" alt="logo" />
          <h1>龙眼</h1>
        </div>
      </router-link>
      <search />
      <entry />
    </el-header>
    <el-main class="main" style="overflow: visible">
      <el-row :gutter="40">
        <el-col :span="16">
          <div>
            <player :vid="vid" />
            <comment :vid="vid" />
          </div>
        </el-col>
        <el-col :span="8">
          <creator :vid="vid" />
          <related :vid="vid" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Player from "./player/Player";
import Comment from "./comment/Comment";
import Creator from "./right/Creator";
import Related from "./right/Related";
import Search from "@/views/header/search/Search";
import Entry from "@/views/header/entry/Entry";
export default {
  name: "Detail",
  data() {
    return {
      vid: "",
    };
  },
  created() {
    this.vid = this.$route.params.vid;
  },
  watch: {
    $route(to) {
      this.vid = to.params.vid;
    },
  },
  components: {
    Player,
    Comment,
    Creator,
    Related,
    Search,
    Entry,
  },
};
</script>
<style lang='scss'>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  .logo {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 60px;
    text-align: center;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
    h1 {
      color: #ff7500;
      font-size: 30px;
      font-family: "STCaiyun";
      margin-left: 5px;
    }
  }
}
.main {
  display: flex;
  justify-content: center;
  width: 1098px;
  max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  .el-row {
    width: 100%;
    height: 100%;
  }
}
.router-link-active {
    text-decoration: none;
  }
  a{
    text-decoration: none;
    color: white;
  }
</style>