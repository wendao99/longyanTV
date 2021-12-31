<!--  -->
<template>
  <div class="comment">
    <div class="count">{{ totalCount }}&nbsp评论</div>
    <div class="sort-type">
      <span
        v-for="item in sortType"
        @click="sortClick(item)"
        :class="{ active: item.type === currentType }"
        >{{ item.name }}</span
      >
    </div>
    <div class="comment-list">
      <el-row v-for="item in comments" class="list-item">
        <el-col :span="3">
          <div class="user-face"><img :src="item.userFace" /></div>
        </el-col>
        <el-col :span="21" class="con">
          <div class="user-name">{{ item.userName }}</div>
          <div class="content">{{ item.content }}</div>
          <div class="info">
            <span>{{ item.timestr }}</span>
            <span><icon icon="#icon-dianzan" />{{ item.likedCount }}</span>
          </div>
          <reply-comment :parentId="item.commentId"  :vid="vid" v-if="item.floorComment !== null"/> 
        </el-col>
      </el-row>
    </div>
    <div @click="nextPage">下一页</div>
  </div>
</template>

<script>
import { videoComment,commentData } from "@/network/index.js";
import Icon from "@/components/common/icon/Icon";
import ReplyComment from './ReplyComment'
export default {
  name: "comment",
  props: {
    vid: {
      typeof: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      sortType: [
        { type: 2, name: "热度" },
        { type: 3, name: "最新" },
      ],
      currentType: 1,
      totalCount: 0,
      comments: [],
      page: 1,
    };
  },
  components: {
    Icon,
    ReplyComment
  },

  created() {
    this.videoComment(this.vid, 5, this.page, 20, this.currentType);
  },
  watch: {
    $route(to) {
      this.videoComment(to.params.vid, 5, this.page, 20, this.currentType); 
    }
  },
  computed: {
    cursor() {
      return this.comments[this.comments.length - 1].time;
    },
  },
  methods: {
    sortClick(item) {
      this.comments = [];
      this.currentType = item.type;
      this.videoComment(this.vid, 5, 1, 20, item.type);
    },
    nextPage() {
      let cursor = this.comments[this.comments.length - 1].time;
      this.videoComment(this.vid, 5, 2, 20, 2);
    },

    //网络请求
    videoComment(id, type, pageNo, pageSize, sortType, cursor) {
      videoComment(id, type, pageNo, pageSize, sortType, cursor).then((res) => {
        if (res.data.totalCount !== 0) {
          this.totalCount = res.data.totalCount;
          res.data.comments.map((item) => {
            this.comments.push(new commentData(item));
          });
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.comment {
  .count {
    padding: 20px 0;
  }
  .sort-type {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: solid 1px #ccc;
    span {
      margin-right: 20px;
      padding-bottom: 10px;
      &:hover {
        color: #ff461f;
        cursor: pointer;
      }
    }
    .active {
      color: #ff461f;
      border-bottom: #ff461f 1px solid;
    }
  }

  .comment-list {
    width: 100%;
    margin-top: 20px;
    .list-item {
      padding: 18px;
      .user-face {
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }
      .con {
        border-bottom: 1px #ccc solid;
        padding-bottom: 10px;
        .content {
          display: block;
          line-height: 20px;
          font-size: 14px;
          padding: 4px 0;
          color: #222;
        }
        .user-name {
          color: #6d757a;
          font-size: 12px;
          font-weight: bold;
          line-height: 18px;
        }
        .info {
          font-size: 12px;
          color: #99a2aa;
          padding: 5px 0;
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>