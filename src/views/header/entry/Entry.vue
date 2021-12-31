<!--  -->
<template>
  <div class="entry">
    <div class="list user">
      <div
        :class="{ 'active-avatar': isAvatar }"
        ref="avatar"
        v-if="isLogin"
        @mouseenter="isAvatar = true"
        @mouseleave="isAvatar = false"
      >
        <img :src="user.avatarUrl" alt="avatar" />
        <transition name="fade">
          <div class="user-info" v-if="isAvatar">
            <div class="user-name">
              <span>{{ userDetail.profile.nickname }}</span>
            </div>
            <div class="user-level-gender">
              <span
                ><icon icon="#icon-dengji" class="icon-level" />{{
                  userDetail.level
                }}</span
              >
              <span
                v-if="userDetail.profile.gender === 1"
                style="color: DodgerBlue"
                ><icon icon="#icon-nansheng" />
              </span>
              <span v-if="userDetail.profile.gender === 2" style="color: pink"
                ><icon icon="#icon-nvsheng" />
              </span>
            </div>
            <div class="user-signature">{{ userDetail.profile.signature }}</div>
            <div class="user-statistics">
              <div class="item">
                <span>{{ userDetail.profile.eventCount }}</span>
                <span>动态</span>
              </div>
              <div class="item">
                <span>{{ userDetail.profile.follows }}</span> <span>关注</span>
              </div>
              <div class="item">
                <span>{{ userDetail.profile.followeds }}</span>
                <span>粉丝</span>
              </div>
            </div>
            <div class="user-nav">
              <ul>
                <li>个人主页</li>
                <li>VIP会员</li>
                <li>个人设置</li>
              </ul>
            </div>
            <div class="user-exit">
              <span>退出登录</span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div
      class="list plays"
      @mouseenter="isplays = true"
      @mouseleave="isplays = false"
    >
      <icon icon="#icon-lishijilu" class="icon" />
      <span>历史</span>
      <div class="recent" v-if="isplays">
        <recent-video
          :recentVideo="recentVideo"
          class="recent-video"
          
        />
      </div>
    </div>
    <el-button @click="loginClick" v-if="!isLogin">登录</el-button>
  </div>
</template>

<script>
import Icon from "@/components/common/icon/Icon";
import RecentVideo from "./RecentVideo.vue";
import { isAccountLoggedIn } from "@/utils/auth.js";
import { userDetail, recordRecentVideo } from "@/network/index.js";

export default {
  name: "Entry",
  components: {
    Icon,
    RecentVideo,
  },
  data() {
    return {
      isLogin: false,
      isAvatar: false,
      isplays: false,
      user: {},
      userDetail: {},
      recentVideo: {},
    };
  },
  created() {
    this.isLogin = isAccountLoggedIn();
    this.user = this.$store.state.data.user;
    if (this.isLogin) {
      this.fetchUserDetail(this.user.userId);
      this.recordRecentVideo();
    }
  },
  methods: {
    loginClick() {
      this.$router.push("/login");
    },
    fetchUserDetail(uid) {
      userDetail(uid).then((res) => {
        this.userDetail = res;
      });
    },
    recordRecentVideo(limit) {
      recordRecentVideo(limit).then((res) => {
        console.log(res);
        this.recentVideo = res.data;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.entry {
  display: flex;
  align-items: center;
  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 60px;
    height: 60px;
  }
  .user {
    position: relative;
    cursor: pointer;
    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .active-avatar {
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 80px;
      transition: all 2s;
      z-index: 1001;
      img {
        position: relative;
        left: -20px;
        top: 20px;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 1002;
      }
    }
    .user-info {
      position: absolute;
      top: 65px;
      left: -90px;
      width: 200px;
      background: white;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      padding: 10px;
      z-index: 1000;
      .user-name {
        text-align: center;
        font-size: 18px;
        margin-top: 34px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .user-level-gender {
        font-size: 12px;
        text-align: center;
        margin-top: 5px;
        span:nth-child(1) {
          color: #ff7500;
          padding: 2px 5px 0 5px;
          border: #ff7500 solid 1px;
          border-radius: 10px;
          margin-right: 5px;
        }
      }
      .user-signature {
        color: #999;
        font-size: 12px;
        text-align: center;
        margin-top: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .user-statistics {
        display: flex;
        justify-content: center;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          margin: 10px 0;
          span:nth-child(1) {
            font-size: 18px;
          }
          span:nth-child(2) {
            color: rgb(102, 102, 102);
            font-size: 12px;
          }
        }
      }
      .user-nav {
        margin: 10px;
        font-size: 14px;
        ul {
          li {
            padding: 10px;
            &:hover {
              cursor: pointer;
              background-color: #e3e5e7;
              border-radius: 10px;
            }
          }
        }
      }
      .user-exit {
        border-top: #ccc solid 2px;
        font-size: 14px;
        margin: 0 10px;
        padding-top: 10px;
        span {
          display: block;
          padding: 10px;
          &:hover {
            cursor: pointer;
            background-color: #e3e5e7;
            border-radius: 10px;
          }
        }
      }
    }
  }
  .plays {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    .icon {
      font-size: 18px;
    }
    .recent {
      position: absolute;
      top: 60px;
      left: -140px; 
      z-index: 1000;
      .recent-video {
        position: relative;
        top: 5px;
        width: 200px;
        height: 400px;
        padding: 10px;
        border-radius: 5px;
        background-color: white;
        overflow-x: hidden;
        overflow-y: scroll;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        z-index: 1000;
        &::-webkit-scrollbar {
          //滚动条的宽度
          width: 5px;
          height: 5px;
        }
        &::-webkit-scrollbar-thumb {
          //滚动条的设置
          background-color: #dddddd;
          background-clip: padding-box;
          min-height: 28px;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: #ff7500;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>