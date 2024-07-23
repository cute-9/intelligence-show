/*
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-03-18 09:45:40
 */
export default {
    namespaced: true,
    state: {
      userInfo: {},
    },
    mutations: {
      getUserInfo(state, val) {
        state.userInfo = val;
      },
    },
  }
  