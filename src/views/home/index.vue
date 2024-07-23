<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-20 17:50:21
-->
<template>
  <div class="container">
    <!-- 头部 -->
    <Navbar />
    <!-- main -->
    <div class="main">
      <!-- 侧边栏 -->
      <!-- <div class="left">
        
        <Sidebar />
      </div> -->
      <!-- <div class="right"> -->
      <!-- 内容  -->
      <router-view />
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.container {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background-image: url(../../assets/image/home-background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .main {
    width: calc(100% - 80px);
    display: flex;
    // padding: 60px 50px;
    // border: 1px solid #ccc;
    height: calc(100% - 90px);
    margin: 0 auto;
  }
  .left {
    width: 300px;
    height: 100%;
  }
  ::v-deep .el-table::before {
    height: 0px;
  }
  .right {
    padding: 20px 40px 0px 0px;
    width: calc(100% - 300px);
    height: 100%;
    position: relative;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: #000000;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #202c3e;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background: rgb(0, 0, 0);
  }
}
</style>
