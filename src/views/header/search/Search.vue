<!--  -->
<template>
  <div class="search">
    <el-input
      v-model="input"
      placeholder="搜索视频"
      @keyup.enter.native="handleSearch"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script>
import { search } from "@/network/index";
export default {
  data() {
    return {
      input: "",
    };
  },
  computed: {
    monitorSearchList() {
      return this.$store.state.searchList;
    },
  },
  methods: {
    handleSearch() {
        this.$store.commit("clearSearchList");
        this.search(this.input);
        if(this.$route.path !== '/search') {
          this.$router.push('/search')
        }
    },

    search(keywords, limit = 20, offset = 0, type = 1014) {
      search(keywords, limit, offset, type).then((res) => {
        this.$store.commit('videoCount', {searchCount: res.result.videoCount })
        for (let item of res.result.videos) {
          this.$store.commit("getSearchList", {
            vid: item.vid,
            title: item.title,
            coverUrl: item.coverUrl,
          });
        }
      });
    },
  },
};
</script>
<style lang='scss'>
.search {
  display: flex;
  width: 25rem;
  .el-input__inner {
    border-radius: 4px 0 0 4px;
  }
  .el-button {
    border-radius: 0 4px 4px 0;
  }
  .el-button--primary {
    background-color: #ff7500;
    border-color: #ff7500;
}
}

</style>