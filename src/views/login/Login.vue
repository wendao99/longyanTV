<!-- 登录 -->
<template>
  <div>
    <iframe
      src="/WebGL-Fluid-Simulation-master/index.html"
      frameborder="0"
    ></iframe>
    <div class="login">
      <div class="container">
        <form>
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            class="item"
          ></el-input>
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            class="item"
          ></el-input>
        </form>

        <el-button
          type="primary"
          plain
          class="item"
          @click="loginBtn"
          :plain="true"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { cellphone} from "@/network/index.js";
import md5 from "js-md5";
import { setCookies,isAccountLoggedIn } from "@/utils/auth.js";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      phone: "",
      password: "",
      code: 0,
    };
  },
  mounted() {
    console.log(isAccountLoggedIn());
  },
  methods: {
    ...mapMutations(["updateData"]),
    loginBtn() {
      this.loginWithPhone(
        this.phone,
        "fakePassword",
        md5(this.password).toString()
      );
    },
    loginWithPhone(phone, password, md5_password) {
      cellphone(phone, password, md5_password).then(
        (res) => {
          if (res.code === 200) {
            setCookies(res.cookie);
            this.updateData({ key: "loginMode", value: "account" });
            this.$store.dispatch("fetchUserProfile").then(() => {
              this.$router.push("/home");
            });
          } else {
            this.$message("账号或者密码错误");
          }
        },
        (error) => {
          console.log(error);
          Promise.reject(error);
        }
      ).catch(error => {
        console.log(error);
      } );
    },
  },
};
</script>
<style lang='scss' scoped>
iframe {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 720px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  z-index: 10000;
  .item {
    margin-top: 20px;
  }
}
</style>