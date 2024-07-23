<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-21 14:59:06
-->
<template>
  <div class="navbar">
    <div class="title">
      <img src="../assets/image/title.png" />
    </div>
    <div class="right">
      <div class="right-show" v-for="(item, index) in showItem" :key="index">
        <img src="../assets/image/left_route.png" />
        <div class="show-item">
          <img class="battery" :src="item.image" />
          <span>{{ item.value }}</span>
        </div>
        <img src="../assets/image/right_route.png" />
      </div>
      <!-- <div class="right-container">
        <span class="right-name"
          >当前登陆人：{{ $store.state.menuState.userInfo.user_name }}</span
        >
        <i class="el-icon-s-custom"></i>
      </div> -->
      <div v-for="(item, index) in btn" :key="item + index">
        <router-link :to="item.routerLink" v-if="item.isActive">
          <div class="left-title">
            {{ item.title }}
          </div>
        </router-link>
      </div>
      <el-button type="danger" size="medium" @click="btnClick"
        >退出</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showItem: [
        {
          image: require("../assets/image/battery.png"),
          value: "100%",
        },
        {
          image: require("../assets/image/date.png"),
          value: "2024-7-11",
        },
        {
          image: require("../assets/image/time.png"),
          value: "15:12:12",
        },
      ],
    };
  },
  computed: {
    // 按钮
    btn() {
      return [
        {
          id: 3,
          title: "首页",
          isActive: true,
          routerLink: "/homePage",
        },
        {
          id: 2,
          isActive: true,
          title: "文件",
          routerLink: "/fileManagement",
        },
        {
          id: 1,
          title: "管理",
          isActive: true,
          routerLink: "/userManagement",
        },
        // {
        //   id: 43,
        //   title: "我的主页",
        //   isActive: true,
        //   routerLink: "/myHome",
        // },
      ];
    },
  },
  methods: {
    btnClick(data) {
      this.$confirm("确认退出当前登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.setItem("userToken", "");
          this.$router.push({ name: "login" });
        })
        .catch((e) => {});
    },
  },
};
</script>
<style lang="less" scoped>
.navbar {
  width: 100%;
  height: 70px;
  //   border-bottom: 1px solid #ccd3e4;
  // background-image: url(../assets/背景.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 300px;
    padding-left: 18px;
    img {
      width: 100%;
    }
  }
  .right {
    min-width: 300px;
    height: 100%;
    // background-image: url(../assets/header-backgroud.png);
    // border: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: auto;
    margin-right: 20px;
    .right-show {
      min-width: 48px;
      height: 34px;
      display: flex;
      padding-right:15px;
      img {
        height: 100%;
      }
      .show-item{
        display: flex;
        justify-content: center;
        align-items: center;
        color:#F1F7F2;
        .battery {
        min-width: 23px;
        height: 20px;
        padding-right:15px;
      }
      }
      
    }
    ::v-deep .el-button--danger {
      color: #a3a3a3;
      background-color: #232323;
      border-color: #363e40;
    }
    .el-button:hover {
      background-color: #232323 !important;
      color: #70cf90;
      font-weight: 500;
      border-color: #70cf90 !important;
      border: 1px solid #70cf90 !important;
    }
    .el-button:focus {
      background-color: #232323 !important;
      color: #70cf90;
      font-weight: 500;
      border-color: #70cf90 !important;
      border: 1px solid #70cf90 !important;
    }
    .left-title {
      min-width: 28px;
      height: 14px;
      text-align: center;
      line-height: 14px;
      border-radius: 4px;
      font-size: 14px;
      padding: 10px 20px;
      margin-right: 20px;
      color: #a3a3a3;
      background-color: #232323;
      border-color: #363e40;
    }
    .router-link-active {
      .left-title {
        min-width: 28px;
        height: 14px;
        text-align: center;
        line-height: 14px;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 14px;
        background-color: #232323 !important;
        color: #70cf90;
        font-weight: 500;
        border-color: #70cf90 !important;
        border: 1px solid #70cf90 !important;
      }
    }
    a {
      text-decoration: none;
    }
    .right-container {
      min-width: 200px;
      //   border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .right-name {
        font-size: 14px;
        color: #70cf90;
        padding-right: 20px;
        line-height: 45px;
      }
    }
  }
}
</style>
