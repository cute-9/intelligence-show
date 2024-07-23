<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-20 14:04:50
-->
<template>
  <div class="login">
    <div class="container container-center">
      <div class="header-title">
        <img src="../../assets/image/title.png" />
      </div>
      <!-- <p class="header-title">地面综合情报分析系统</p> -->
      <div class="form">
        <div class="form-container container-center">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-position="left"
            class="demo-form"
          >
            <el-form-item
              label=""
              prop="user_count"
              style="margin-bottom: 50px"
            >
              <el-input v-model="form.user_count" placeholder="请输入管理名">
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-user-solid"
                  style="color: #9FA6A0"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="user_passd">
              <el-input
                v-model="form.user_passd"
                show-password
                placeholder="输入密码"
              > 
                <i slot="prefix" class="el-input__icon el-icon-lock"   style="color: #9FA6A0"></i
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="forget-pass">
            <el-button type="text">忘记密码？</el-button>
          </div>
        </div>
      </div>
      <div class="login-btn"><el-button @click="login">登录</el-button></div>
      <!-- <div class="footer">
        <img src="../../assets/image/logo.png" />
        <div class="footer-text">上海久航电子有限公司</div>
      </div> -->
    </div>
  </div>
</template>
<script>
// import { ipc } from "@/utils/ipcRenderer";
// const ipcApiRoute = {
//   maxWindow: "controller.example.maxWindow",
// };
import { login } from "@/api/login";
export default {
  data() {
    return {
      form: {
        user_count: "",
        user_passd: "",
      },
      rules: {
        user_count: [
          { required: true, message: "请输入管理名", trigger: "blur" },
        ],
        user_passd: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      window.sessionStorage.setItem("userToken", "aaa");
      this.$router.push({ name: "fileManagement" });
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     const loading = this.$loading({
      //       lock: true,
      //       text: "登录中...",
      //       spinner: "el-icon-loading",
      //       background: "rgba(0, 0, 0, 0.5)",
      //     });
      //     login(this.form)
      //       .then((res) => {
      //         loading.close();
      //         const { code, data, message } = res;
      //         if (code == 1) {
      //           if (data.length != 0) {
      //             // this.$store.commit("menuState/getUserInfo", data[0]);
      //             // 没有token和退出接口，所以手动添加token，退出时，手动token赋值为空
      //             let userToken = JSON.stringify(data[0]);
      //             window.sessionStorage.setItem(
      //               "userToken",
      //               userToken.user_name
      //             );
      //             this.$store.commit("menuState/getUserInfo", data[0]);
      //             this.$router.push({ name: "taskManagement" });
      //           } else {
      //             this.$message.error("账户或密码错误!");
      //           }
      //         } else {
      //           this.$message.error(message);
      //         }
      //       })
      //       .catch(() => {
      //         loading.close();
      //       });
      //   } else {
      //     return false;
      //   }
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 588px;
  height: 668px;
  text-align: center;
  background-image: url(../../assets/image/login.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  align-items: center;
  .header-title {
    // font-family: STHeitiSC, STHeitiSC;
    // font-weight: 500;
    // font-size: 36px;
    // color: #ccd3e4;
    // text-align: center;
    // font-style: normal;
    // margin-top: 64px;
    // margin-bottom: 40px;
    width: 80%;
    min-width: 300px;
    height: 120px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      // height: 100%;
    }
    // background-image: url(../../assets/image/title.png);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
  }
  .form {
    width: 350px;
    height: calc(100% - 320px);
    // background-color: red;
    position: relative;
    .form-container {
      width: 100%;
      height: 170px;
      ::v-deep .el-input__inner {
        height: 60px !important;
        line-height: 60px !important;
        background: rgba(67, 68, 72, 0.23);
        border: 1px solid #353f53;
        color: #F1F7F2;
        font-size: 18px;
        padding-left: 50px;
      }
      .el-form-item__label {
        height: 60px !important;
        display: none !important;
      }
      .el-input__icon {
        line-height: 60px;
        font-size: 20px;
      }
      .el-input__inner::placeholder {
        color: #9FA6A0;
        font-size: 18px;
      }
      /* 谷歌 */
      .el-input__inner::-webkit-input-placeholder {
        color: #9FA6A0;
        font-size: 18px;
      }
      /* 火狐 */
      .el-input__inner:-moz-placeholder {
        color: #9FA6A0;
        font-size: 18px;
      }
      /*ie*/
      .el-input__inner:-ms-input-placeholder {
        font-size: 18px;
        color: #9FA6A0;
      }
    }
    .forget-pass {
      text-align: right;
      color: #70cf90;
      margin-top: -15px;
      .el-button {
        color: #70cf90;
      }
    }
  }
  .login-btn {
    .el-button {
      width: 350px;
      height: 60px;
      background-color: rgba(112, 207, 144, 0.15);
      border: 1px solid #70cf90 !important;
      font-family: STHeitiSC, STHeitiSC;
      font-weight: 500;
      font-size: 24px;
      color: #70cf90;
      font-style: normal;
    }

    /*按钮悬浮*/
    .el-button:hover {
      background-color: rgba(112, 207, 144, 0.5) !important;
      color: #70cf90;
      font-weight: 500;
      border-color: #70cf90 !important;
      border: 1px solid #70cf90 !important;
    }
    /*按钮点击*/
    .el-button:focus {
      background-color: rgba(112, 207, 144, 0.5) !important;
      color: #70cf90;
      font-weight: 500;
      border-color: #70cf90 !important;
      border: 1px solid #70cf90 !important;
    }
  }
}
.container-center {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.footer {
  height: 100px;
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: end;
  .footer-text {
    overflow-wrap: break-word;
    color: rgba(159, 166, 160, 1);
    font-size: 26px;
    letter-spacing: 0.75px;
    font-family: SourceHanSansCN-Regular;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    // line-height: 150px;
  }
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
