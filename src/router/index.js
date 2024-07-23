/*
 * @desc:
 * @Author: Huang Qian
 * @Date: 2024-02-28 14:29:59
 */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  // 登录
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      activeMenu: "/login",
    },
  },
  // 主界面
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      activeMenu: "/home",
    },
    children: [
      // 文件管理
      {
        path: "/fileManagement",
        name: "fileManagement",
        component: () => import("@/views/file-management/index.vue"),
        meta: {
          activeMenu: "/fileManagement",
        },
      },
      // 用户管理
      {
        path: "/userManagement",
        name: "userManagement",
        component: () => import("@/views/user-management/index.vue"),
        meta: {
          activeMenu: "/userManagement",
        },
      },
      // 我的主页
      {
        path: "/myHome",
        name: "myHome",
        component: () => import("@/views/my-home/index.vue"),
        meta: {
          activeMenu: "/myHome",
        },
      },
      {
        path: "/homePage",
        name: "homePage",
        component: () => import("@/views/home-page/index.vue"),
        meta: {
          activeMenu: "/homePage",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
// 取消重复路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
router.beforeEach((to, from, next) => {
  //如果用户访问登录页，直接放行
  if (to.path === "/") return next();
  else {
    const tokenStr =window.sessionStorage.getItem("userToken");
    if (!tokenStr) {
      return next("/");
    } else {
      return next();
    }
  }
  // //从sessionStorage中获取到保存的token值
});
export default router;
