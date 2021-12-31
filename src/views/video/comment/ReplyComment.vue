<!--  -->
<template>
  <div class="reply" v-if="replyComments.length !== 0">
    <el-row v-if="!isMore">
      <el-col :span="2">
        <div class="user-face"><img :src="replyComments[0].userFace" /></div>
      </el-col>
      <el-col :span="22" class="con">
        <span class="user-name">{{ replyComments[0].userName }}</span>
        <span class="content">{{ replyComments[0].content }}</span>
        <div class="info">
          <span>{{ replyComments[0].timestr }}</span
          ><icon icon="#icon-dianzan" /><span>{{
            replyComments[0].likedCount
          }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row v-for="item in replyComments" v-else>
      <el-col :span="2">
        <div class="user-face"><img :src="item.userFace" /></div>
      </el-col>
      <el-col :span="22" class="con">
        <span class="user-name">{{ item.userName }}</span>
        <span
          v-if="item.beReplied[0].beRepliedCommentId !== parentId"
          class="replied"
          >回复 <span>@{{ item.beReplied[0].user.nickname }} </span>:
        </span>
        <span class="content">{{ item.content }}</span>
        <div class="info">
          <span>{{ item.timestr }}</span
          ><icon icon="#icon-dianzan" /><span>{{ item.likedCount }}</span>
        </div>
      </el-col>
    </el-row>
    <div v-if="totalCount !== replyComments.length && isMore" class="more">
      <span @click="toViewMore">查看更多</span>
      <span @click="isMore = false">收起</span>
    </div>
    <div
      class="more"
      v-if="totalCount !== 1"
      @click="moreClick"
      v-show="!isMore"
    >
      共{{ totalCount }}条回复 >
    </div>
  </div>
</template>

<script>
import { floorComment, replyCommentData } from "@/network/index.js";
import Icon from "@/components/common/icon/Icon";
export default {
  name: "ReplyComment",
  components: {
    Icon,
  },
  props: {
    parentId: {
      typeof: String,
      default() {
        return "";
      },
    },
    vid: {
      typeof: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      replyComments: [],
      totalCount: 0,
      isMore: false,
    };
  },
  created() {
    this.floorComment(this.parentId, this.vid, 5, 10);
  },
  methods: {
    moreClick() {
      this.isMore = true;
    },
    toViewMore() {
      let time = this.replyComments[this.replyComments.length - 1].time;
      console.log(time);
      this.floorComment(this.parentId, this.vid, 5, 10, time);
    },
    //网络请求
    floorComment(parentCommentId, id, type = 5, limit, time) {
      floorComment(parentCommentId, id, type, limit, time).then((res) => {
        if (res.data.totalCount > 0) {
          this.totalCount = res.data.totalCount;
        }

        res.data.comments.map((item) => {
          this.replyComments.push(new replyCommentData(item));
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.reply {
  .user-face {
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  .con {
    .user-name {
      color: #6d757a;
      font-size: 12px;
      font-weight: bold;
      line-height: 18px;
      margin-right: 20px;
    }
    .replied {
      line-height: 20px;
      font-size: 14px;
      padding: 4px 0;
      color: #222;
      span {
        color: blue;
      }
    }
    .content {
      line-height: 20px;
      font-size: 14px;
      padding: 4px 0;
      color: #222;
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
  .more {
    font-size: 12px;
    color: #00a1d6;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
  }
}
</style>