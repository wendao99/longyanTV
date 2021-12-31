<!-- 侧边栏 -->
<template>
  <div class="asides">
    <router-link :to="`/home`">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo">
      <h1>龙眼</h1>
    </div>
    </router-link>
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      background-color="#F1F2F5"
      :router="true"
      active-text-color="#ff7500"
    >
      <el-menu-item
        :index="item.to"
        v-for="(item, index) in asideList"
        :route="{path: item.to }"
        >{{ item.name }}</el-menu-item
      >
    </el-menu>
    <div class="backend-api"><span></span><a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank"	>API来源</a></div>
  </div>
</template>

<script>

export default {
  name: "Aside",
  data() {
    return {
      asideList: [
        {
          name: "首页",
          to: "/home",
        },
        {
          name: "推荐",
          to: "/recommend",
        },
      ],
      path: ''
    };
  },
  created() {
    this.path = this.$route.path
  },
};
</script>
<style lang='scss' scoped>
.asides {
  position: relative;
  height: 100%;
}
.logo {
  display: flex;
  justify-content: center;
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
    font-family: 'STCaiyun';
    margin-left: 5px;
  }
}
.el-menu-vertical-demo {
  text-align: center;
}
.router-link-active {
    text-decoration: none;
  }
a{
    text-decoration: none;
    color: white;
}
.backend-api {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  a {
    text-decoration: none;
    color: #00bfff;
  }
}
</style>