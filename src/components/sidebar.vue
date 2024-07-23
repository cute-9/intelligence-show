<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-22 09:42:56
-->
<template>
  <div class="left">
    <div v-for="(item, index) in leftImage" :key="item + index">
      <router-link :to="item.routerLink" v-if="item.isShow">
        <div class="left-title">
          {{ item.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    leftImage() {
      return [
        {
          title: "任务管理",
          routerLink: "/taskManagement",
          isShow: true,
        },
        {
          title: "用户管理",
          routerLink: "/userManagement",
          isShow:
            this.$store.state.menuState.userInfo.user_auth == 0 ? true : false,
        },
        {
          title: "我的主页",
          routerLink: "/myHome",
          isShow: true,
        },
        {
          title: "设备管理",
          routerLink: "/equipmentManagement",
          isShow: true,
        },
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.left {
  //   min-width: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  a {
    text-decoration: none;
  }
  .left-title {
    width: 190px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background-image: url(../assets/icon.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 30px;
    margin-top: 20px;
    color: #828faa;
  }
  .router-link-active {
    .left-title {
      width: 190px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      background-image: url(../assets/icon2.png);
      color: #07f0fd;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 30px;
      margin-top: 20px;
    }
  }
}
</style>
