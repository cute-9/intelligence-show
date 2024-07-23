<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-02-28 14:29:58
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import { ipc } from "@/utils/ipcRenderer";
// const ipcApiRoute = {
//   nativeTheme: "controller.example.changeTheme",
// };
export default {
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.commit(
        "menuState/getUserInfo",
        JSON.parse(sessionStorage.getItem("store"))
      );
      sessionStorage.removeItem("store");
    }

    //2、在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "store",
        JSON.stringify(this.$store.state.menuState.userInfo)
      );
    });
  },
  methods: {},
};
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #000;
  background-image: url(./assets/image/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
}
/* @media (prefers-color-scheme: dark) {
  body {
    background: #000;
    background-image: url(./assets/backgroud.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: rgb(12, 13, 53);
    color: rgb(255, 255, 255);
  }
} */
</style>
